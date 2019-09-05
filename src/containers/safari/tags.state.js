/*global safari*/
import { delay } from 'redux-saga'
import { takeLatest, select } from 'redux-saga/effects'
import { checkDuplicate } from 'common/helpers'
import { SUGGESTED_TAGS_REQUEST } from './actions'
import { SUGGESTED_TAGS_SUCCESS } from './actions'
import { SUGGESTED_TAGS_FAILURE } from './actions'
import { TAG_ACTIVATE } from './actions'
import { TAG_DEACTIVATE } from './actions'
import { TAGS_DEACTIVATE } from './actions'
import { TAG_ADD } from './actions'
import { TAG_REMOVE } from './actions'
import { TAGS_REMOVE } from './actions'
import { TAGS_SYNC } from './actions'

// INITIAL STATE
const initialState = {
  suggested: [],
  saved: [],
  used: [],
  marked: []
}

// ACTIONS
export const tagActions = {
  addTag: tag => ({ type: TAG_ADD, tag }),
  activateTag: payload => ({ type: TAG_ACTIVATE, payload }),
  deactivateTag: payload => ({ type: TAG_DEACTIVATE, payload }),
  deactivateTags: payload => ({ type: TAGS_DEACTIVATE, payload }),
  removeTag: payload => ({ type: TAG_REMOVE, payload }),
  removeTags: payload => ({ type: TAGS_REMOVE, payload })
}

// REDUCER
export const tagsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SUGGESTED_TAGS_FAILURE: {
      return { ...state, suggested: false }
    }

    case SUGGESTED_TAGS_SUCCESS: {
      const { response } = action.payload
      const { suggested_tags } = response
      const suggested = suggested_tags.map(tag => tag.tag)
      return { ...state, suggested }
    }

    case SUGGESTED_TAGS_REQUEST: {
      const suggested = []
      return { ...state, suggested }
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
const getTaggingPayload = state => {
  return {
    item_id: state.saves.item_id,
    tags: state.tags.used
  }
}

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* tagChanges() {
  const payload = yield select(getTaggingPayload)
  yield delay(500)

  safari.extension.dispatchMessage(TAGS_SYNC, JSON.stringify(payload))
}
