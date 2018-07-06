import { delay } from 'redux-saga'
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import { select } from 'redux-saga/effects'

import { getSetting } from 'Common/interface'
import { getBool } from 'Common/utilities'
import { getSuggestedTags, syncItemTags, getItem } from 'Common/api'

/* CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const TAG_SUGGESTION_REQUEST = 'TAG_SUGGESTION_REQUEST'
const TAG_SUGGESTION_SUCCESS = 'TAG_SUGGESTION_SUCCESS'
const TAG_SERVER_SUCCESS = 'TAG_SERVER_SUCCESS'
const ADD_TAG = 'ADD_TAG'
const REMOVE_TAG = 'REMOVE_TAG'
const SET_TAGS = 'SET_TAGS'

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
      const { tabId, suggestions } = action.payload
      const tagState = state[tabId]
      return {
        ...state,
        [tabId]: { ...tagState, suggestions }
      }
    }

    case TAG_SERVER_SUCCESS: {
      const { tabId, tags } = action.payload
      const tagState = state[tabId]
      return {
        ...state,
        [tabId]: { ...tagState, tags }
      }
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
  takeEvery('SAVE_TO_POCKET_SUCCESS', getTagsFromServer),
  takeLatest([ADD_TAG, REMOVE_TAG, SET_TAGS], syncTags)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTags = state => state.tags[state.tab].tags

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tagSuggestionRequest(action) {
  const isPremium = yield getBool(getSetting('account_premium'))
  if (!isPremium) return

  try {
    const { tabId } = action.payload
    const data = yield call(getSuggestedTags, action.payload)
    if (!data) throw new Error('Tag Suggestion Request Failed')

    const { response = {} } = data[0]
    const { suggested_tags = [] } = response
    const suggestions = suggested_tags.map(suggestion => suggestion.tag)

    yield put({ type: TAG_SUGGESTION_SUCCESS, payload: { tabId, suggestions } })
  } catch (error) {
    console.error(action.type, error)
  }
}

function* getTagsFromServer(action) {
  try {
    const { itemDetails, saveObject } = action.payload
    const { tabId } = saveObject
    const { item_id } = itemDetails

    const data = yield call(getItem, { tabId, item_id })
    if (!data || (data && !data.response)) throw new Error('Get item failed')

    const tagsResponse = data.response.tags || []
    const tags = Object.keys(tagsResponse).filter(tag => tag !== '1')
    yield put({ type: TAG_SERVER_SUCCESS, payload: { tabId, tags } })
  } catch (error) {
    console.error(action.type, error)
  }
}

function* syncTags(action) {
  // TODO: Add visual indicator for transparency
  yield call(delay, 1500)

  try {
    const { tabId, item_id } = action.payload
    const tags = yield select(getTags)
    const data = yield call(syncItemTags, { tabId, item_id, tags })
    if (!data) throw new Error('Tag Suggestion Request Failed')
  } catch (error) {
    console.error(action.type, error)
  }
}
