import { takeEvery, select, put } from 'redux-saga/effects'
import { sendMessageToTab } from 'Common/interface'

/* INITIAL STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialState = 0

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// const SET_TAB_ACTIVE = 'SET_TAB_ACTIVE'
const ACTIVE_TAB_CHANGED = 'ACTIVE_TAB_CHANGED'
const ACTIVE_TAB_UPDATED = 'ACTIVE_TAB_UPDATED'
const ACTIVE_WINDOW_CHANGED = 'ACTIVE_WINDOW_CHANGED'
const TAB_REMOVED = 'TAB_REMOVED'
const TAB_REPLACED = 'TAB_REPLACED'
const UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB'

export const activeTabActions = {
  activeTabChanged: payload => ({ type: ACTIVE_TAB_CHANGED, payload }),
  activeTabUpdated: payload => ({ type: ACTIVE_TAB_UPDATED, payload }),
  activeWindowChanged: payload => ({ type: ACTIVE_WINDOW_CHANGED, payload }),
  tabRemoved: payload => ({ type: TAB_REMOVED, payload }),
  tabReplaced: payload => ({ type: TAB_REPLACED, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const activeTabReducers = (state = initialState, action) => {
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
export const activeTabSagas = [
  takeEvery([ACTIVE_TAB_CHANGED, ACTIVE_WINDOW_CHANGED], tabChanged)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getActiveTabId = state => state.activeTabId

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tabChanged(action) {
  const activeTabId = yield select(getActiveTabId)
  const { tabId } = action.payload
  sendMessageToTab(activeTabId, { type: 'frameUnload' })
  yield put({ type: 'UPDATE_ACTIVE_TAB', payload: { tabId } })
}
