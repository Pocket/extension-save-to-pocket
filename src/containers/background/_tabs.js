import { put, takeEvery, select } from 'redux-saga/effects'
import { sendMessageToTab } from '../../Common/interface'

// ACTIONS
export const tabsActions = {
  frameLoaded: tabId => ({
    type: 'FRAME_LOADED',
    tabId
  }),
  setTabStatus: (tabId, status, shown) => ({
    type: 'SET_TAB_STATUS',
    tabId,
    status,
    shown
  }),
  setDropDownStatus: (tabId, status) => ({
    type: 'SET_DROPDOWN_STATUS',
    tabId,
    status
  })
}

// REDUCERS
export const active = (state = 0, action) => {
  switch (action.type) {
    case 'REQUEST_SAVE_TO_POCKET': {
      return action.tabId
    }
    case 'SET_TAB_ACTIVE': {
      return action.tabId
    }
    default:
      return state
  }
}

export const tabs = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TAB_IDLE': {
      return setTabsIdle(state, action)
    }

    case 'ACTIVE_TAB_UPDATED': {
      return setTabsUpdate(state, action)
    }
    case 'TAB_REPLACED': {
      return setTabSwap(state, action)
    }

    case 'FRAME_LOADED': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          frame: 'loaded'
        }
      }
    }

    case 'SET_TAB_STATUS': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: action.status,
          shown: action.shown
        }
      }
    }

    case 'SET_DROPDOWN_STATUS': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          dropDownActive: action.status
        }
      }
    }

    case 'TAB_CLOSED': {
      const filteredState = state
      delete filteredState[action.tabId]
      return filteredState
    }

    case 'REQUEST_SAVE_TO_POCKET': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          type: action.saveType,
          status: 'saving',
          dropDownActive: false
        }
      }
    }

    case 'SAVE_TO_POCKET_SUCCESS': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'saved',
          hash: action.saveHash,
          inception: action.inception
        }
      }
    }

    case 'SAVE_TO_POCKET_FAILURE': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'error'
        }
      }
    }

    case 'ITEM_REMOVE_REQUEST': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'removing'
        }
      }
    }

    case 'ITEM_REMOVED': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'removed'
        }
      }
    }

    case 'ITEM_ARCHIVE_REQUEST': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'archiving'
        }
      }
    }

    case 'ITEM_ARCHIVED': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          status: 'archived'
        }
      }
    }

    default:
      return state
  }
}

// Reducer Utilities
function setTabSwap(state, action) {
  const newState = {
    ...state,
    [action.addedTab]: {
      ...[action.removedTab]
    }
  }

  delete newState[action.removedTab]
  return newState
}

function setTabsUpdate(state, action) {
  if (!state[action.tabId]) return state
  return {
    ...state,
    [action.tabId]: {
      frame: action.frame,
      status: 'idle',
      shown: false,
      dropDownActive: false
    }
  }
}

function setTabsIdle(state, action) {
  if (!state[action.active]) return state
  return {
    ...state,
    [action.active]: {
      ...state[action.active],
      status: 'idle',
      shown: false,
      dropDownActive: false
    }
  }
}

// SAGAS
export function* wTabChanges() {
  yield takeEvery(['ACTIVE_TAB_CHANGED', 'ACTIVE_WINDOW_CHANGED'], tabChanges)
}

const getActive = state => {
  return state.active
}

function* tabChanges(action) {
  const active = yield select(getActive)

  yield put({ type: 'CANCEL_CLOSE_SAVE_PANEL' })
  sendMessageToTab(active, { type: 'frameUnload' })
  yield put({ type: 'TAB_CLOSED', tabId: active })

  yield put({ type: 'SET_TAB_ACTIVE', tabId: action.tabInfo.tabId })
}
