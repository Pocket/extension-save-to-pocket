// import { delay } from 'redux-saga'
import { put, takeLatest, takeEvery } from 'redux-saga/effects'
import { getSetting } from 'Common/interface'
import { getBool } from 'Common/utilities'
/* CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const TAG_SUGGESTION_REQUEST = 'TAG_SUGGESTION_REQUEST'
const TAG_SUGGESTION_SUCCESS = 'TAG_SUGGESTION_SUCCESS'
const ADD_TAG = 'ADD_TAG'
const REMOVE_TAG = 'REMOVE_TAG'
const SET_TAGS = 'SET_TAGS'
const SYNC_TAGS = 'SYNC_TAGS'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const taggingActions = {
  getTagSuggestions: payload => ({ type: TAG_SUGGESTION_REQUEST, payload }),
  addTag: payload => ({ type: ADD_TAG, payload }),
  removeTag: payload => ({ type: REMOVE_TAG, payload }),
  setTags: payload => ({ type: SET_TAGS, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const taggingReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_ITEM_TO_POCKET': {
      const { tabId } = action.payload
      return {
        ...state,
        [tabId]: { tags: [], suggestions: [] }
      }
    }

    case TAG_SUGGESTION_SUCCESS: {
      return state
    }

    case ADD_TAG: {
      const { tabId, tag } = action.payload
      const tagState = state[tabId]
      return {
        ...state,
        [tabId]: { ...tagState, tags: [...tagState.tags, tag] }
      }
    }

    case REMOVE_TAG: {
      const { tabId, tag } = action.payload
      console.log({ tabId, tag })
      const tagState = state[tabId]
      return {
        ...state,
        [tabId]: {
          ...tagState,
          tags: [...tagState.tags.filter(current => current !== tag)]
        }
      }
    }

    case SET_TAGS: {
      const { tabId, tags } = action.payload
      const tagState = state[tabId]
      return {
        ...state,
        [tabId]: { ...tagState, tags }
      }
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const taggingSagas = [
  takeLatest(TAG_SUGGESTION_REQUEST, tagSuggestionRequest),
  takeEvery([ADD_TAG, REMOVE_TAG, SET_TAGS], syncTags)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tagSuggestionRequest(action) {
  // const isPremium = yield getBool(getSetting('account_premium'))
  // const payload = {}
  // yield console.log(action.payload, isPremium)
  // yield put({ type: TAG_SUGGESTION_SUCCESS, payload })
}

function* syncTags(action) {
  yield console.log(action)
  // Throttle calls to the server.
}
