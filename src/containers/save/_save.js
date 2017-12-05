import md5 from 'blueimp-md5'
import { put, call, takeLatest, select } from 'redux-saga/effects'
import { updateToolbarIcon } from '../../common/interface'
import { saveToPocket, archiveItem, removeItem } from '../../common/api'
import { requireAuthorization } from '../auth/_auth'

// INITIAL STATE
const initialState = {}

// ACTIONS
export const saveActions = {
    savePageToPocket: data => ({ type: 'SAVE_PAGE_TO_POCKET', data }),
    saveUrlToPocket: data => ({ type: 'SAVE_URL_TO_POCKET', data }),
    removeItem: data => ({ type: 'REMOVE_ITEM_FROM_POCKET', data }),
    archiveItem: data => ({ type: 'ARCHIVE_ITEM_ON_POCKET', data })
}

// REDUCER
function buildSaveData(item) {
    return {
        id: item.resolved_id,
        url: item.resolved_url,
        title: item.title
    }
}

export const saves = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_TO_POCKET_SUCCESS': {
            return {
                ...state,
                [action.saveHash]: buildSaveData(action.data.response)
            }
        }

        case 'ARCHIVE_ITEM_SUCCESS': {
            return state
        }

        default: {
            return state
        }
    }
}

// SAGAS
export function* wSavePage() {
    yield takeLatest('SAVE_PAGE_TO_POCKET', saveRequest)
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
    const activeHash = activeTab.hash

    return {
        item: state.saves[activeHash],
        itemId: state.saves[activeHash].item_id,
        tabId: activeTabId,
        save_type: activeTab.type
    }
}

const getCurrentSetup = state => {
    return state.setup
}

function* saveRequest(action) {
    const saveType =
        action.data.info && action.data.info.linkUrl ? 'link' : 'page'
    const tabId = action.data.tab.id
    yield put({ type: 'REQUEST_SAVE_TO_POCKET', saveType, tabId })

    const saveObject = buildSaveObject(action)
    const saveHash = saveObject.saveHash
    const authToken = yield call(requireAuthorization)

    const data = yield call(saveToPocket, saveObject, authToken)

    if (data) {
        yield put({ type: 'SAVE_TO_POCKET_SUCCESS', tabId, saveHash, data })
        yield saveSuccess(saveObject, data.response.resolved_id)
    } else {
        yield put({ type: 'SAVE_TO_POCKET_FAILURE', tabId, saveHash })
    }
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
    if (shouldRequestRecs && resolvedId)
        yield put({ type: 'RECOMMENDATIONS_REQUEST', saveObject, resolvedId })

    // Should we get tags?
    if (shouldRequestTags)
        yield put({ type: 'SUGGESTED_TAGS_REQUEST', saveObject })
}

function* archiveItemRequest() {
    const current = yield select(getCurrentItem)
    yield put({ type: 'ITEM_ARCHIVE_REQUEST', tabId: current.tabId })

    const authToken = yield call(requireAuthorization)
    try {
        const data = yield call(archiveItem, authToken, current.itemId)
        yield archiveSuccess(data, current)
    } catch (error) {
        yield put({ type: 'ITEM_ARCHIVE_ERROR', error, current })
    }
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
        const data = yield call(removeItem, authToken, current.itemId)
        yield removeSuccess(data, current)
    } catch (error) {
        yield put({ type: 'ITEM_REMOVE_ERROR', error, current })
    }
}

function* removeSuccess(data, current) {
    if (data.response !== true) return
    if (current.save_type === 'page') updateToolbarIcon(current.tabId, false)
    yield put({ type: 'ITEM_REMOVED', tabId: current.tabId })
}

// Utilities
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
            const saveHash = md5(tab.url)

            return {
                tabId,
                url,
                title,
                saveType,
                actionInfo,
                showSavedIcon,
                saveHash
            }
        }
        case 'context': {
            const tab = action.data.tab
            const info = action.data.info
            const savedLink = info && info.linkUrl
            const tabId = tab.id

            const url = savedLink ? info.linkUrl : tab.url
            const title = savedLink
                ? info.selectionText || info.linkUrl
                : tab.title
            const cxt_ui = savedLink ? 'right_click_link' : 'right_click_page'
            const saveType = savedLink ? 'link' : 'page'
            const actionInfo = { cxt_ui, cxt_url: tab.url }
            const showSavedIcon = savedLink ? 0 : 1
            const saveHash = md5(tab.url)

            return {
                tabId,
                url,
                title,
                saveType,
                actionInfo,
                showSavedIcon,
                saveHash
            }
        }
        default:
            return
    }
}
