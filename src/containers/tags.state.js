import { delay } from 'redux-saga/effects'
import { takeLatest, select, put } from 'redux-saga/effects'
import { checkDuplicate } from 'common/helpers'
import { SAVE_TO_POCKET_REQUEST } from 'actions'
import { SUGGESTED_TAGS_REQUEST } from 'actions'
import { SUGGESTED_TAGS_SUCCESS } from 'actions'
import { SUGGESTED_TAGS_FAILURE } from 'actions'
import { TAG_ACTIVATE } from 'actions'
import { TAG_DEACTIVATE } from 'actions'
import { TAGS_DEACTIVATE } from 'actions'
import { TAG_ADD } from 'actions'
import { TAG_REMOVE } from 'actions'
import { TAGS_REMOVE } from 'actions'
import { TAGS_SYNC } from 'actions'
import { TAG_SYNC_REQUEST } from 'actions'
import { TAG_SYNC_SUCCESS } from 'actions'
import { TAG_SYNC_FAILURE } from 'actions'
import { UPDATE_STORED_TAGS } from 'actions'

// INITIAL STATE
const initialState = {
  tags_stored: [],
  suggested: [],
  saved: [],
  used: [],
  marked: []
}

// ACTIONS
export const addTag = (tag) => ({ type: TAG_ADD, tag })
export const activateTag = (payload) => ({ type: TAG_ACTIVATE, payload })
export const deactivateTag = (payload) => ({ type: TAG_DEACTIVATE, payload })
export const deactivateTags = (payload) => ({ type: TAGS_DEACTIVATE, payload })
export const removeTag = (payload) => ({ type: TAG_REMOVE, payload })
export const removeTags = (payload) => ({ type: TAGS_REMOVE, payload })

// REDUCER
export const tagsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTED_TAGS_FAILURE: {
      return { ...state, suggested: false }
    }

    case SAVE_TO_POCKET_REQUEST: {
      return initialState
    }

    case SUGGESTED_TAGS_SUCCESS: {
      const { suggested_tags = [] } = action.payload.response
      return { ...state, suggested: suggested_tags.map(tag => tag.tag) }
    }

    case SUGGESTED_TAGS_REQUEST: {
      // TODO: Provide feedback to user
      return { ...state }
    }

    case TAG_ADD: {
      const { value } = action.tag
      const { used } = state
      if (checkDuplicate(used, value)) return state
      return { ...state, used: [...used, value] }
    }

    case TAG_REMOVE: {
      const { used } = state
      const { tag } = action.payload
      const usedDraft = used.filter(item => item !== tag)
      return { ...state, used: usedDraft }
    }

    case TAGS_REMOVE: {
      const { used, marked } = state
      if (!marked.length) return state
      const usedDraft = used.filter(tag => !marked.includes(tag))
      return { ...state, used: usedDraft, marked: [] }
    }

    case TAG_ACTIVATE: {
      const { tag } = action.payload
      const marked = tagActivate(state, tag)
      return { ...state, marked }
    }

    case TAG_DEACTIVATE: {
      const { tag } = action.payload
      const marked = tabDeactivate(state, tag)
      return { ...state, marked }
    }

    case TAGS_DEACTIVATE: {
      return { ...state, marked: [] }
    }

    case TAG_SYNC_REQUEST: {
      return state
    }

    case TAG_SYNC_SUCCESS:
    case TAG_SYNC_FAILURE: {
      return state
    }

    case UPDATE_STORED_TAGS: {
      const { tags } = action.payload.response
      return { ...state, tags_stored: tags }
    }

    default: {
      return state
    }
  }
}

/* REDUCER :: OPERATORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function tagActivate(state, tag) {
  const { marked, used } = state

  // No Tag has been passed in so us the last used tag
  const tagValue = tag ? tag : used[used.length - 1]

  const isMarked = checkDuplicate(marked, tagValue) > 0
  return isMarked ? marked : [...marked, tagValue]
}

function tabDeactivate(state, tag) {
  const { marked } = state
  return marked.filter(item => item !== tag)
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const tagsSagas = [
  takeLatest([TAG_ADD, TAG_REMOVE, TAGS_REMOVE], tagChanges)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getTaggingState = state => {
  const { suggested, used } = state.tags

  return {
    item_id: state.saves.item_id,
    used,
    suggested
  }
}

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tagChanges() {
  yield delay(1000)
  const taggingState = yield select(getTaggingState)
  const { used, suggested = [], item_id } = taggingState
  const usedSuggested = used.filter(usedTag => suggested.includes(usedTag))
  const payload = {
    item_id,
    tags: used,
    suggestedCount: suggested.length,
    usedSuggestedCount: usedSuggested.length
  }
  if (used.length) {
    yield put({ type: TAGS_SYNC, payload })
  }
}
