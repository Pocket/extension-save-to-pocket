import { delay } from 'redux-saga'
import { put, call, race } from 'redux-saga/effects'
import { take, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { updateToolbarIcon } from 'Common/interface'
import { saveToPocket, archiveItem, removeItem } from 'Common/api'
import { authRequired } from 'Containers/Auth/auth.state'
import { tabActions } from 'Containers/Background/tab.state'
import { filterAllowedFields } from 'Common/utilities'
import { ITEM_DETAILS } from 'Common/constants'

/* CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const REQUEST_SAVE = 'REQUEST_SAVE'
const REQUEST_ARCHIVE = 'REQUEST_ARCHIVE'
const REQUEST_REMOVE = 'REQUEST_REMOVE'
const START_IDLE_TIMER = 'START_IDLE_TIMER'
const CANCEL_IDLE_TIMER = 'CANCEL_IDLE_TIMER'
const SET_SAVE_IDLE = 'SET_SAVE_IDLE'

const SAVE_ITEM_TO_POCKET = 'SAVE_ITEM_TO_POCKET'
const SAVE_TO_POCKET_SUCCESS = 'SAVE_TO_POCKET_SUCCESS'
const SAVE_TO_POCKET_FAILURE = 'SAVE_TO_POCKET_FAILURE'
const REMOVE_ITEM_FROM_POCKET = 'REMOVE_ITEM_FROM_POCKET'
const ARCHIVE_ITEM_ON_POCKET = 'ARCHIVE_ITEM_ON_POCKET'

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
      return updateStatus(state, action, 'error')

    case SAVE_TO_POCKET_SUCCESS: {
      const { response, saveObject } = action.payload
      const { tabId, saveType } = saveObject
      const itemDetails = filterAllowedFields(response, ITEM_DETAILS)
      return {
        ...state,
        [tabId]: { status: 'saved', saveType, ...itemDetails }
      }
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

    yield put({ type: SAVE_TO_POCKET_SUCCESS, payload: { tabId, ...data } })

    yield saveSuccess(data)
  } catch (error) {
    yield put({ type: SAVE_TO_POCKET_FAILURE, payload: { tabId } })

    console.error(action.type, error)
  }
}

function* saveSuccess(data) {
  const { saveObject } = data
  const { tabId, showSavedIcon } = saveObject

  updateToolbarIcon(tabId, showSavedIcon)
  yield put({ type: START_IDLE_TIMER, payload: { tabId, timeout: 8000 } })
}

// Archiving
function* archiveItemRequest() {}

// Removing
function* removeItemRequest() {}

// Idle Timer
function* startIdleTimer(action) {
  const timeout = 1500
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
