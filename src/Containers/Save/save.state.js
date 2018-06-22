import { delay } from 'redux-saga'
import { put, call, select, race } from 'redux-saga/effects'
import { take, takeLatest, takeEvery } from 'redux-saga/effects'
import { updateToolbarIcon } from 'Common/interface'
import { saveToPocket, archiveItem, removeItem } from 'Common/api'
import { getCurrentLanguageCode } from 'Common/helpers'
import { requireAuthorization } from 'Containers/Auth/auth.state'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const SAVE_PAGE_TO_POCKET = 'SAVE_PAGE_TO_POCKET'
const SAVE_URL_TO_POCKET = 'SAVE_URL_TO_POCKET'
const REMOVE_ITEM_FROM_POCKET = 'REMOVE_ITEM_FROM_POCKET'
const ARCHIVE_ITEM_ON_POCKET = 'ARCHIVE_ITEM_ON_POCKET'
const CLOSE_SAVE_PANEL = 'CLOSE_SAVE_PANEL'
const CANCEL_CLOSE_SAVE_PANEL = 'CANCEL_CLOSE_SAVE_PANEL'

export const saveActions = {
  savePageToPocket: data => ({ type: SAVE_PAGE_TO_POCKET, data }),
  saveUrlToPocket: data => ({ type: SAVE_URL_TO_POCKET, data }),
  removeItem: data => ({ type: REMOVE_ITEM_FROM_POCKET, data }),
  archiveItem: data => ({ type: ARCHIVE_ITEM_ON_POCKET, data }),
  closeSavePanel: data => ({ type: CLOSE_SAVE_PANEL, data }),
  cancelCloseSavePanel: () => ({ type: CANCEL_CLOSE_SAVE_PANEL })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_TO_POCKET_SUCCESS': {
      const { tabId, data } = action
      const { response } = data
      return {
        ...state,
        [tabId]: {
          id: response.item_id,
          url: response.resolved_url || response.normal_url,
          given_url: response.given_url,
          title: response.title
        }
      }
    }

    case 'TAB_CLOSED': {
      const filteredState = state
      delete filteredState[action.tabId]
      return filteredState
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveSagas = [
  takeLatest(CLOSE_SAVE_PANEL, closePanelRequest),
  takeEvery(SAVE_PAGE_TO_POCKET, saveRequest),
  takeLatest(SAVE_URL_TO_POCKET, saveRequest),
  takeLatest(ARCHIVE_ITEM_ON_POCKET, archiveItemRequest),
  takeLatest(REMOVE_ITEM_FROM_POCKET, removeItemRequest)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getCurrentItem = state => {
  const activeTabId = state.active
  const activeTab = state.tabs[activeTabId]

  return {
    item: state.saves[activeTabId],
    tabId: activeTabId,
    save_type: activeTab.type
  }
}

const getCurrentSetup = state => state.setup

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* closePanelRequest(action) {
  const { tabId, timeout = 1500 } = action.data

  yield race({
    task: call(closePanel, tabId, timeout),
    cancel: take('CANCEL_CLOSE_SAVE_PANEL')
  })
}

function* closePanel(tabId, timeout) {
  yield call(delay, timeout)
  yield put({ type: 'SET_TAB_STATUS', tabId, status: 'idle', shown: false })
}

function* saveRequest(action) {
  yield put({ type: 'CANCEL_CLOSE_SAVE_PANEL' })

  const saveType =
    action.data.info && action.data.info.linkUrl ? 'link' : 'page'
  const tabId = action.data.tab.id
  yield put({ type: 'REQUEST_SAVE_TO_POCKET', saveType, tabId })

  const saveObject = buildSaveObject(action)
  const saveHash = saveObject.saveHash
  const authToken = yield call(requireAuthorization)

  const data = yield call(saveToPocket, saveObject, authToken)

  if (data) {
    yield put({
      type: 'SAVE_TO_POCKET_SUCCESS',
      tabId,
      saveHash,
      data,
      inception: Date.now()
    })
    yield saveSuccess(saveObject, data.response.resolved_id)
  } else {
    yield put({ type: 'SAVE_TO_POCKET_FAILURE', tabId, saveHash })
  }

  // Start the closeout timer after panel resolution
  yield put({ type: 'CLOSE_SAVE_PANEL', data: { tabId, timeout: 8000 } })
}

function* saveSuccess(saveObject, resolvedId) {
  // Update Toolbar icon after a successful save
  const tabId = saveObject.tabId
  const showSavedIcon = saveObject.showSavedIcon

  updateToolbarIcon(tabId, showSavedIcon)

  // Trigger further actions to run after a succesful save
  const setup = yield select(getCurrentSetup)
  const shouldRequestRecs = setup.on_save_recommendations
  const shouldRequestTags = setup.account_premium

  // Do we need on save recommendations?
  if (shouldRequestRecs && resolvedId && getCurrentLanguageCode() === 'en') {
    yield call(delay, 650)
    yield put({ type: 'RECOMMENDATIONS_REQUEST', saveObject, resolvedId })
  }

  // Should we get tags?
  if (shouldRequestTags)
    yield put({ type: 'SUGGESTED_TAGS_REQUEST', saveObject })
}

function* archiveItemRequest() {
  const current = yield select(getCurrentItem)
  yield put({ type: 'ITEM_ARCHIVE_REQUEST', tabId: current.tabId })

  const authToken = yield call(requireAuthorization)
  try {
    const data = yield call(archiveItem, authToken, current.item.id)
    yield archiveSuccess(data, current)
  } catch (error) {
    yield put({ type: 'ITEM_ARCHIVE_ERROR', error, current })
  }

  // Start the closeout timer after panel resolution
  yield put({
    type: 'CLOSE_SAVE_PANEL',
    data: { tabId: current.tabId, timeout: 4000 }
  })
}

function* archiveSuccess(data, current) {
  if (data.response !== true) return
  if (current.save_type === 'page') updateToolbarIcon(current.tabId, false)
  yield put({ type: 'ITEM_ARCHIVED', tabId: current.tabId })
}

function* removeItemRequest() {
  const current = yield select(getCurrentItem)
  yield put({ type: 'ITEM_REMOVE_REQUEST', tabId: current.tabId })

  const authToken = yield call(requireAuthorization)
  try {
    const data = yield call(removeItem, authToken, current.item.id)
    yield removeSuccess(data, current)
  } catch (error) {
    yield put({ type: 'ITEM_REMOVE_ERROR', error, current })
  }

  // Start the closeout timer after panel resolution
  yield put({
    type: 'CLOSE_SAVE_PANEL',
    data: { tabId: current.tabId, timeout: 4000 }
  })
}

function* removeSuccess(data, current) {
  if (data.response !== true) return
  if (current.save_type === 'page') updateToolbarIcon(current.tabId, false)
  yield put({ type: 'ITEM_REMOVED', tabId: current.tabId })
}

/* UTTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function buildSaveObject(action) {
  switch (action.data.from) {
    case 'browserAction': {
      const tab = action.data.tab
      const tabId = tab.id

      const url = tab.url
      const title = tab.title
      const saveType = 'page'
      const actionInfo = { cxt_ui: 'toolbar' }
      const showSavedIcon = true

      return {
        tabId,
        url,
        title,
        saveType,
        actionInfo,
        showSavedIcon
      }
    }
    case 'context': {
      const tab = action.data.tab
      const info = action.data.info
      const savedLink = info && info.linkUrl
      const tabId = tab.id

      const url = savedLink ? info.linkUrl : tab.url
      const title = savedLink ? info.selectionText || info.linkUrl : tab.title
      const cxt_ui = savedLink ? 'right_click_link' : 'right_click_page'
      const saveType = savedLink ? 'link' : 'page'
      const actionInfo = { cxt_ui, cxt_url: tab.url }
      const showSavedIcon = savedLink ? 0 : 1

      return {
        tabId,
        url,
        title,
        saveType,
        actionInfo,
        showSavedIcon
      }
    }
    default:
      return
  }
}
