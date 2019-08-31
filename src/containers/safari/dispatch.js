/*global safari*/
import { store } from './store'

import { SAVE_TO_POCKET_REQUEST } from './actions'
import { SAVE_TO_POCKET_SUCCESS } from './actions'
import { SAVE_TO_POCKET_FAILURE } from './actions'
import { ARCHIVE_ITEM_SUCCESS } from './actions'
import { ARCHIVE_ITEM_FAILURE } from './actions'
import { REMOVE_ITEM_SUCCESS } from './actions'
import { REMOVE_ITEM_FAILURE } from './actions'
import { TAGS_ADDED_SUCCESS } from './actions'
import { TAGS_ADDED_FAILURE } from './actions'
import { SUGGESTED_TAGS_SUCCESS } from './actions'
import { SUGGESTED_TAGS_FAILURE } from './actions'
import { USER_LOG_IN_SUCCESS } from './actions'
import { USER_LOG_IN_FAILURE } from './actions'
import { USER_LOG_OUT_SUCCESS } from './actions'
import { USER_LOG_OUT_FAILURE } from './actions'

/* Add Safari Listeners
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const dispatchInit = () => {
  safari.self.addEventListener('message', handleMessage)
}

/* Handle incoming messages
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function handleMessage(event) {
  const { message, name = 'Unknown Action' } = event || {}
  console.log(event)

  switch (name) {
    case SAVE_TO_POCKET_REQUEST: {
      store.dispatch({ type: SAVE_TO_POCKET_REQUEST })
      return
    }

    case SAVE_TO_POCKET_SUCCESS: {
      store.dispatch({ type: SAVE_TO_POCKET_SUCCESS, payload: message })
      return
    }

    case SAVE_TO_POCKET_FAILURE: {
      store.dispatch({ type: SAVE_TO_POCKET_FAILURE })
      return
    }

    case ARCHIVE_ITEM_SUCCESS: {
      store.dispatch({ type: ARCHIVE_ITEM_SUCCESS })
      return
    }

    case ARCHIVE_ITEM_FAILURE: {
      store.dispatch({ type: ARCHIVE_ITEM_FAILURE })
      return
    }

    case REMOVE_ITEM_SUCCESS: {
      store.dispatch({ type: REMOVE_ITEM_SUCCESS, payload: message })
      return
    }

    case REMOVE_ITEM_FAILURE: {
      store.dispatch({ type: REMOVE_ITEM_FAILURE, payload: message })
      return
    }

    case TAGS_ADDED_SUCCESS: {
      store.dispatch({ type: TAGS_ADDED_SUCCESS, payload: message })
      return
    }

    case TAGS_ADDED_FAILURE: {
      store.dispatch({ type: TAGS_ADDED_FAILURE, payload: message })
      return
    }

    case SUGGESTED_TAGS_SUCCESS: {
      store.dispatch({ type: SUGGESTED_TAGS_SUCCESS, payload: message })
      return
    }

    case SUGGESTED_TAGS_FAILURE: {
      store.dispatch({ type: SUGGESTED_TAGS_FAILURE, payload: message })
      return
    }

    case USER_LOG_IN_SUCCESS: {
      store.dispatch({ type: USER_LOG_IN_SUCCESS, payload: message })
      return
    }

    case USER_LOG_IN_FAILURE: {
      store.dispatch({ type: USER_LOG_IN_FAILURE, payload: message })
      return
    }

    case USER_LOG_OUT_SUCCESS: {
      store.dispatch({ type: USER_LOG_OUT_SUCCESS })
      return
    }

    case USER_LOG_OUT_FAILURE: {
      store.dispatch({ type: USER_LOG_OUT_FAILURE, payload: message })
      return
    }

    default: {
      console.groupCollapsed(name)
      console.log(message)
      console.groupEnd(name)
      break
    }
  }
}
