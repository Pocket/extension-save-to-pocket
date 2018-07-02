import { delay } from 'redux-saga'
import { takeEvery, select, put } from 'redux-saga/effects'
import { sendMessageToTab } from 'Common/interface'

/* INITIAL STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialState = 0

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const ACTIVE_TAB_CHANGED = 'ACTIVE_TAB_CHANGED'
const ACTIVE_TAB_UPDATED = 'ACTIVE_TAB_UPDATED'
const ACTIVE_WINDOW_CHANGED = 'ACTIVE_WINDOW_CHANGED'
const TAB_REMOVED = 'TAB_REMOVED'
const TAB_REPLACED = 'TAB_REPLACED'
const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB'
const UNLOAD_FRAME = 'UNLOAD_FRAME'

export const tabActions = {
  activeTabChanged: payload => ({ type: ACTIVE_TAB_CHANGED, payload }),
  activeTabUpdated: payload => ({ type: ACTIVE_TAB_UPDATED, payload }),
  activeWindowChanged: payload => ({ type: ACTIVE_WINDOW_CHANGED, payload }),
  tabRemoved: payload => ({ type: TAB_REMOVED, payload }),
  tabReplaced: payload => ({ type: TAB_REPLACED, payload }),
  unloadFrame: payload => ({ type: UNLOAD_FRAME, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const tabReducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_TAB: {
      return action.payload.tabId
    }
    default:
      return state
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const tabSagas = [
  takeEvery([ACTIVE_TAB_CHANGED, ACTIVE_WINDOW_CHANGED], tabChanged),
  takeEvery(UNLOAD_FRAME, unloadFrame)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getActiveTabId = state => state.tab

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tabChanged(action) {
  const activeTabId = yield select(getActiveTabId)
  const { tabId } = action.payload
  yield unloadFrame({ payload: { tabId: activeTabId, wait: 0 } })
  yield put({ type: 'UPDATE_ACTIVE_TAB', payload: { tabId } })
}

function* unloadFrame(action) {
  const { tabId, wait } = action.payload
  yield delay(wait)
  sendMessageToTab(tabId, { type: 'frameUnload' })
}
