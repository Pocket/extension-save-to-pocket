import { SAVE_TO_POCKET_REQUEST } from './actions'
import { SAVE_TO_POCKET_SUCCESS } from './actions'
import { SAVE_TO_POCKET_FAILURE } from './actions'
import { ARCHIVE_ITEM } from './actions'
import { REMOVE_ITEM } from './actions'
import { ARCHIVE_ITEM_SUCCESS } from './actions'
import { ARCHIVE_ITEM_FAILURE } from './actions'
import { REMOVE_ITEM_SUCCESS } from './actions'
import { REMOVE_ITEM_FAILURE } from './actions'

import { USER_LOG_OUT_SUCCESS } from './actions'

// INITIAL STATE
const initialState = {
  status: 'inactive',
  type: 'page'
}

// ACTIONS
export const saveActions = {
  archiveItem: payload => ({ type: ARCHIVE_ITEM, payload }),
  removeItem: payload => ({ type: REMOVE_ITEM, payload })
}

// REDUCER
export const saveReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TO_POCKET_REQUEST: {
      return { ...state, status: 'saving' }
    }

    case SAVE_TO_POCKET_SUCCESS: {
      return { ...state, status: 'saved' }
    }

    case SAVE_TO_POCKET_FAILURE: {
      return { ...state, status: 'error' }
    }

    case ARCHIVE_ITEM: {
      return { ...state, status: 'archiving' }
    }

    case ARCHIVE_ITEM_SUCCESS: {
      return { ...state, status: 'archived' }
    }

    case ARCHIVE_ITEM_FAILURE: {
      return { ...state, status: 'error' }
    }

    case REMOVE_ITEM: {
      return { ...state, status: 'removing' }
    }

    case REMOVE_ITEM_SUCCESS: {
      return { ...state, status: 'removed' }
    }

    case REMOVE_ITEM_FAILURE: {
      return { ...state, status: 'error' }
    }

    case USER_LOG_OUT_SUCCESS: {
      return { ...state, status: 'inactive' }
    }

    default: {
      return state
    }
  }
}
