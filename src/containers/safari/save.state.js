/*global safari*/
import { takeLatest, put } from 'redux-saga/effects'

import { SAVE_TO_POCKET_REQUEST } from './actions'
import { SAVE_TO_POCKET_SUCCESS } from './actions'
import { SAVE_TO_POCKET_FAILURE } from './actions'
import { SAVE_TO_POCKET_UPDATE } from './actions'
import { SAVE_TO_POCKET_COMPLETE } from './actions'
import { ARCHIVE_ITEM } from './actions'
import { ARCHIVE_ITEM_REQUEST } from './actions'
import { REMOVE_ITEM } from './actions'
import { REMOVE_ITEM_REQUEST } from './actions'
import { ARCHIVE_ITEM_SUCCESS } from './actions'
import { ARCHIVE_ITEM_FAILURE } from './actions'
import { REMOVE_ITEM_SUCCESS } from './actions'
import { REMOVE_ITEM_FAILURE } from './actions'
import { USER_LOG_OUT_SUCCESS } from './actions'
import { OPEN_POCKET } from './actions'

// INITIAL STATE
const initialState = {
  status: 'inactive',
  type: 'page',
  item_id: false
}

// ACTIONS
export const saveActions = {
  archiveItem: payload => ({ type: ARCHIVE_ITEM, payload }),
  removeItem: payload => ({ type: REMOVE_ITEM, payload }),
  completeSave: () => ({ type: SAVE_TO_POCKET_COMPLETE })
}

// REDUCER
export const saveReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TO_POCKET_REQUEST: {
      return { ...state, status: 'saving' }
    }

    case SAVE_TO_POCKET_FAILURE: {
      return { ...state, status: 'error', item_id: false }
    }

    case SAVE_TO_POCKET_UPDATE: {
      return { ...state, ...action.payload }
    }

    case SAVE_TO_POCKET_COMPLETE: {
      return { ...state, status: 'inactive' }
    }

    case ARCHIVE_ITEM_REQUEST: {
      return { ...state, status: 'archiving' }
    }

    case ARCHIVE_ITEM_SUCCESS: {
      return { ...state, status: 'archived' }
    }

    case ARCHIVE_ITEM_FAILURE: {
      return { ...state, status: 'error' }
    }

    case REMOVE_ITEM_REQUEST: {
      return { ...state, status: 'removing' }
    }

    case REMOVE_ITEM_SUCCESS: {
      return { ...state, status: 'removed' }
    }

    case REMOVE_ITEM_FAILURE: {
      return { ...state, status: 'error' }
    }

    case USER_LOG_OUT_SUCCESS: {
      return { ...state, status: 'inactive', item_id: false }
    }

    case OPEN_POCKET: {
      return { ...state, status: 'inactive', item_id: false }
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const saveSagas = [
  takeLatest(SAVE_TO_POCKET_SUCCESS, saveToPocketSuccess),
  takeLatest(ARCHIVE_ITEM, archiveItem),
  takeLatest(REMOVE_ITEM, removeItem)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* saveToPocketSuccess(action) {
  // Move this to a saga
  const { item_id } = action.payload
  // const { action_results } = response
  // const result = action_results[0]
  const payload = { status: 'saved', item_id }

  yield put({ type: SAVE_TO_POCKET_UPDATE, payload })
}

function* archiveItem(action) {
  const { payload } = action
  safari.extension.dispatchMessage(ARCHIVE_ITEM_REQUEST, payload)
  yield put({ type: ARCHIVE_ITEM_REQUEST, payload })
}

function* removeItem(action) {
  const { payload } = action
  safari.extension.dispatchMessage(REMOVE_ITEM_REQUEST, payload)
  yield put({ type: REMOVE_ITEM_REQUEST, payload })
}
