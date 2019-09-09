import { delay } from 'redux-saga'
import {
  put,
  call,
  take,
  takeLatest,
  takeEvery,
  select,
  race
} from 'redux-saga/effects'
import { updateToolbarIcon, setSettings, getSetting } from 'common/interface'
import { saveToPocket, archiveItem, removeItem, getFeatures } from 'common/api'
import { requireAuthorization } from '../auth/_auth'
import { getCurrentLanguageCode } from 'common/helpers'

// INITIAL STATE
const initialState = {}

// ACTIONS
export const saveActions = {
  savePageToPocket: data => ({ type: 'SAVE_PAGE_TO_POCKET', data }),
  saveUrlToPocket: data => ({ type: 'SAVE_URL_TO_POCKET', data }),
  removeItem: data => ({ type: 'REMOVE_ITEM_FROM_POCKET', data }),
  archiveItem: data => ({ type: 'ARCHIVE_ITEM_ON_POCKET', data }),
  closeSavePanel: data => ({ type: 'CLOSE_SAVE_PANEL', data }),
  cancelCloseSavePanel: () => ({ type: 'CANCEL_CLOSE_SAVE_PANEL' })
}

// REDUCER
function buildSaveData(item) {
  return {
    id: item.item_id,
    url: item.resolved_url || item.normal_url,
    given_url: item.given_url,
    title: item.title
  }
}

export const saves = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_TO_POCKET_SUCCESS': {
      return {
        ...state,
        [action.tabId]: buildSaveData(action.data.response)
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

// SAGAS
export function* wCloseSavePanel() {
  yield takeLatest('CLOSE_SAVE_PANEL', closePanelRequest)
}
export function* wSavePage() {
  yield takeEvery('SAVE_PAGE_TO_POCKET', saveRequest)
}
export function* wSaveUrl() {
  yield takeLatest('SAVE_URL_TO_POCKET', saveRequest)
}
export function* wArchiveItem() {
  yield takeLatest('ARCHIVE_ITEM_ON_POCKET', archiveItemRequest)
}
export function* wRemoveItem() {
  yield takeLatest('REMOVE_ITEM_FROM_POCKET', removeItemRequest)
}

const getCurrentItem = state => {
  const activeTabId = state.active
  const activeTab = state.tabs[activeTabId]

  return {
    item: state.saves[activeTabId],
    tabId: activeTabId,
    save_type: activeTab.type
  }
}

const getCurrentSetup = state => {
  return state.setup
}

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

function* checkFeatures() {
  const fetchedSince = getSetting('features_fetched_timestamp') || 0
  const today = new Date().toLocaleDateString()
  if (fetchedSince === today) return JSON.parse(getSetting('features_stored'))

  const authToken = yield call(requireAuthorization)
  const data = yield call(getFeatures, authToken)

  if (data && data.response) {
    const features = data.response.features
    setSettings({
      features_stored: JSON.stringify(features),
      features_fetched_timestamp: today
    })

    return features
  }
  return {}
}

function getSurvey(features) {
  return features && features.show_survey ? features.show_survey : false
}

function* saveRequest(action) {
  yield put({ type: 'CANCEL_CLOSE_SAVE_PANEL' })
  yield put({ type: 'SURVEY_RESET' })

  const saveType =
    action.data.info && action.data.info.linkUrl ? 'link' : 'page'
  const tabId = action.data.tab.id
  yield put({ type: 'REQUEST_SAVE_TO_POCKET', saveType, tabId })

  const setup = yield select(getCurrentSetup)
  const saveObject = buildSaveObject(action, setup)
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

  // Check features
  const features = yield checkFeatures()

  // Show Survey?
  const survey = getSurvey(features)

  // Trigger further actions to run after a succesful save
  const setup = yield select(getCurrentSetup)
  const shouldRequestRecs = setup.on_save_recommendations
  const shouldRequestTags = setup.account_premium

  if (survey && getCurrentLanguageCode() === 'en') {
    yield put({ type: 'SURVEY_REQUEST', survey, resolvedId })
  }

  // Do we need on save recommendations?
  if (
    !survey &&
    shouldRequestRecs &&
    resolvedId &&
    getCurrentLanguageCode() === 'en'
  ) {
    yield call(delay, 650)
    yield put({ type: 'RECOMMENDATIONS_REQUEST', saveObject, resolvedId })
  }

  // Should we get tags?
  if (shouldRequestTags)
    yield put({ type: 'SUGGESTED_TAGS_REQUEST', saveObject })
}

function* archiveItemRequest() {
  const current = yield select(getCurrentItem)
  const setup = yield select(getCurrentSetup)
  const cxt_premium_status = setup.account_premium

  yield put({ type: 'ITEM_ARCHIVE_REQUEST', tabId: current.tabId })

  const authToken = yield call(requireAuthorization)
  try {
    const data = yield call(archiveItem, authToken, current.item.id, {
      cxt_premium_status,
      cxt_view: 'ext_popover',
      cxt_ui: 'toolbar'
    })
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
  const setup = yield select(getCurrentSetup)
  const cxt_premium_status = setup.account_premium
  yield put({ type: 'ITEM_REMOVE_REQUEST', tabId: current.tabId })
  yield put({ type: 'SURVEY_HIDE' })

  const authToken = yield call(requireAuthorization)
  try {
    const data = yield call(removeItem, authToken, current.item.id, {
      cxt_premium_status,
      cxt_view: 'ext_popover',
      cxt_ui: 'toolbar'
    })
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

// Utilities
function buildSaveObject(action, setup) {
  const cxt_premium_status = setup.account_premium
  switch (action.data.from) {
    case 'browserAction': {
      const tab = action.data.tab
      const tabId = tab.id

      const url = tab.url
      const title = tab.title
      const saveType = 'page'
      const actionInfo = { cxt_ui: 'toolbar', cxt_premium_status }
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
      const actionInfo = { cxt_ui, cxt_premium_status }
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
