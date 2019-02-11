import { delay } from 'redux-saga'
import { put, call, race, all } from 'redux-saga/effects'
import { take, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { updateToolbarIcon } from 'Common/interface'
import { saveToPocket, archiveItem, removeItem } from 'Common/api'
import { authRequired } from 'Containers/Auth/auth.state'
import { tabActions } from 'Containers/Background/tab.state'
import { filterAllowedFields } from 'Common/utilities'
import { ITEM_DETAILS } from 'Common/constants'
import { taggingActions } from 'Containers/Save/Toolbar/Tagging/tagging.state'
import { surveyActions } from 'Containers/Save/Survey/survey.state'
import { recommendationActions } from 'Containers/Save/Recommendations/recs.state'
import { serverSync } from 'Containers/Background/setup.state'

/* CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const REQUEST_SAVE = 'REQUEST_SAVE'
const REQUEST_ARCHIVE = 'REQUEST_ARCHIVE'
const REQUEST_REMOVE = 'REQUEST_REMOVE'
const START_IDLE_TIMER = 'START_IDLE_TIMER'
const CANCEL_IDLE_TIMER = 'CANCEL_IDLE_TIMER'
const SET_SAVE_IDLE = 'SET_SAVE_IDLE'
const CLEAR_SAVE_DATA = 'CLEAR_SAVE_DATA'

const SAVE_ITEM_TO_POCKET = 'SAVE_ITEM_TO_POCKET'
const SAVE_TO_POCKET_SUCCESS = 'SAVE_TO_POCKET_SUCCESS'
const SAVE_TO_POCKET_FAILURE = 'SAVE_TO_POCKET_FAILURE'

const ARCHIVE_ITEM_ON_POCKET = 'ARCHIVE_ITEM_ON_POCKET'
const ARCHIVE_ITEM_FAILURE = 'ARCHIVE_ITEM_FAILURE'
const ARCHIVE_ITEM_SUCCESS = 'ARCHIVE_ITEM_SUCCESS'

const REMOVE_ITEM_FROM_POCKET = 'REMOVE_ITEM_FROM_POCKET'
const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE'
const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveActions = {
  saveItemToPocket: payload => ({ type: SAVE_ITEM_TO_POCKET, payload }),
  removeItem: payload => ({ type: REMOVE_ITEM_FROM_POCKET, payload }),
  archiveItem: payload => ({ type: ARCHIVE_ITEM_ON_POCKET, payload }),
  startIdleTimer: () => ({ type: START_IDLE_TIMER }),
  cancelIdleTimer: () => ({ type: CANCEL_IDLE_TIMER })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveReducers = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SAVE:
      return updateStatus(state, action, 'saving')

    case REQUEST_ARCHIVE:
      return updateStatus(state, action, 'archiving')

    case REQUEST_REMOVE:
      return updateStatus(state, action, 'removing')

    case SET_SAVE_IDLE:
      return updateStatus(state, action, 'idle')

    case SAVE_TO_POCKET_FAILURE:
    case ARCHIVE_ITEM_FAILURE:
    case REMOVE_ITEM_FAILURE:
      return updateStatus(state, action, 'error')

    case SAVE_TO_POCKET_SUCCESS: {
      const { itemDetails, saveObject } = action.payload
      const { tabId, saveType } = saveObject
      return {
        ...state,
        [tabId]: { status: 'saved', saveType, ...itemDetails }
      }
    }

    case ARCHIVE_ITEM_SUCCESS: {
      return updateStatus(state, action, 'archived')
    }

    case REMOVE_ITEM_SUCCESS: {
      return updateStatus(state, action, 'removed')
    }

    case CLEAR_SAVE_DATA: {
      const newState = { ...state }
      delete newState[action.payload.tabId]
      return newState
    }

    default: {
      return state
    }
  }
}

function updateStatus(state, action, status) {
  const { payload } = action
  const { tabId } = payload
  const save = state[tabId]

  return { ...state, [tabId]: { ...save, status } }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveSagas = [
  takeEvery(SAVE_ITEM_TO_POCKET, saveRequest),
  takeLatest(ARCHIVE_ITEM_ON_POCKET, archiveItemRequest),
  takeLatest(REMOVE_ITEM_FROM_POCKET, removeItemRequest),
  takeLatest(START_IDLE_TIMER, startIdleTimer)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getActiveTabId = state => state.tab

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// Saving
function* saveRequest(action) {
  const { tabId, title, saveType, url, cxt_ui, ctx_url } = action.payload

  yield put({ type: CANCEL_IDLE_TIMER })
  yield put({ type: REQUEST_SAVE, payload: { tabId } })

  try {
    const authToken = yield call(authRequired, action)

    const saveDetails = { tabId, url, title, saveType }
    const actionInfo = { cxt_ui, ctx_url }
    const showSavedIcon = ctx_url ? 0 : 1
    const saveObject = { ...saveDetails, actionInfo, showSavedIcon }

    const data = yield call(saveToPocket, saveObject, authToken)
    if (!data) throw new Error('Save response failed')

    const itemDetails = filterAllowedFields(data.response, ITEM_DETAILS)

    yield put({
      type: SAVE_TO_POCKET_SUCCESS,
      payload: { tabId, saveObject, itemDetails }
    })

    yield saveSuccess(data)
  } catch (error) {
    yield put({ type: SAVE_TO_POCKET_FAILURE, payload: { tabId } })

    console.error(action.type, error)
  }
}

function* saveSuccess(data) {
  const {
    saveObject: { tabId, showSavedIcon },
    response: { item_id, resolved_url, resolved_id }
  } = data
  const payload = { tabId, item_id, resolved_url, resolved_id }

  yield call(updateToolbarIcon, tabId, showSavedIcon)

  // * Get server data (storedTags, features) once a day
  const { features } = yield call(serverSync)

  yield all([
    put(taggingActions.getTagSuggestions(payload)),
    put(surveyActions.getSurvey({ ...payload, features })),
    put(recommendationActions.getRecommendations({ ...payload, features }))
  ])

  yield put({ type: START_IDLE_TIMER, payload: { tabId, timeout: 8000 } })
}

// Archiving
function* archiveItemRequest(action) {
  const { tabId, item_id } = action.payload
  yield put({ type: REQUEST_ARCHIVE, payload: { tabId } })

  try {
    const data = yield call(archiveItem, item_id)
    if (!data) throw new Error('Archive item failed')
    yield put({ type: ARCHIVE_ITEM_SUCCESS, payload: { tabId } })
    yield call(startIdleTimer, {}, 1200)
  } catch (error) {
    yield put({ type: ARCHIVE_ITEM_FAILURE, payload: { tabId } })
    console.error(action.type, error)
  }
}

// Removing
function* removeItemRequest(action) {
  const { tabId, item_id } = action.payload
  yield put({ type: REQUEST_REMOVE, payload: { tabId } })

  try {
    const data = yield call(removeItem, item_id)
    if (!data) throw new Error('Remove item failed')
    yield put({ type: REMOVE_ITEM_SUCCESS, payload: { tabId } })
    yield call(startIdleTimer, {}, 600)
  } catch (error) {
    yield put({ type: REMOVE_ITEM_FAILURE, payload: { tabId } })
    console.error(action.type, error)
  }
}

// Idle Timer
// TODO: Account for user entering the area before animation is complete
function* startIdleTimer(action, timeout = 3000) {
  const tabId = yield select(getActiveTabId)
  yield race({
    task: call(idleTimer, tabId, timeout),
    cancel: take(CANCEL_IDLE_TIMER)
  })
}

function* idleTimer(tabId, timeout) {
  const payload = { tabId, wait: 350 }
  yield call(delay, timeout)
  yield put({ type: SET_SAVE_IDLE, payload })
  yield put(tabActions.unloadFrame(payload))
}
