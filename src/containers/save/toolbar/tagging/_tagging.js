import { delay } from 'redux-saga'
import { put, call, takeLatest, select } from 'redux-saga/effects'
import * as API from '../../../../common/api/'
import { setSettings } from '../../../../common/interface'

// ACTIONS
export const taggingActions = {
  getTags: () => {
    return { type: 'TAG_REQUEST' }
  },
  activateTag: data => {
    return { type: 'TAG_ACTIVATE', data }
  },
  deactivateTag: data => {
    return { type: 'TAG_DEACTIVATE', data }
  },
  addTag: tag => {
    return { type: 'TAG_ADD', tag }
  },
  deactivateTags: data => {
    return { type: 'TAGS_DEACTIVATE', data }
  },
  removeTag: data => {
    return { type: 'TAG_REMOVE', data }
  },
  removeTags: data => {
    return { type: 'TAGS_REMOVE', data }
  }
}

function checkDuplicate(list, tagValue) {
  return list.filter(tag => tag.name === tagValue).length
}

// REDUCERS
export const tags = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_TO_POCKET_SUCCESS': {
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          used: [],
          marked: []
        }
      }
    }

    case 'TAB_CLOSED': {
      const filteredState = state
      delete filteredState[action.tabId]
      return filteredState
    }

    case 'SUGGESTED_TAGS_SUCCESS': {
      const suggestedTags = action.tags
      return {
        ...state,
        [action.tabId]: {
          ...state[action.tabId],
          suggested: suggestedTags
        }
      }
    }

    case 'TAG_ADD': {
      const tagValue = action.tag.value
      const tabId = action.tag.tabId
      const usedTags = state[tabId].used

      // Don't add duplicate entries
      if (checkDuplicate(usedTags, tagValue)) return state

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          used: [...usedTags, tagValue]
        }
      }
    }

    case 'TAG_REMOVE': {
      const tabId = action.data.tabId
      const tag = action.data.tag
      const activeTab = state[tabId]
      const usedTags = activeTab ? activeTab.used : []

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          used: usedTags.filter(item => item !== tag)
        }
      }
    }

    case 'TAG_ACTIVATE': {
      const tabId = action.data.tabId
      const currentTags = state[tabId].used
      const tagIndex = currentTags.indexOf(action.data.tag)
      const markedTags = state[tabId].marked

      const tagPosition = tagIndex < 0 ? currentTags.length - 1 : tagIndex

      const markedTag = currentTags.slice(tagPosition, tagPosition + 1)[0]
      if (markedTags.includes(markedTag)) return state

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          marked: [...markedTags, markedTag]
        }
      }
    }

    case 'TAG_DEACTIVATE': {
      const tabId = action.data.tabId
      const tag = action.data.tag
      const markedTags = state[tabId].marked.filter(item => item !== tag)

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          marked: markedTags
        }
      }
    }

    case 'TAGS_DEACTIVATE': {
      const tabId = action.data.tabId
      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          marked: []
        }
      }
    }

    case 'TAGS_REMOVE': {
      const tabId = action.data.tabId
      const currentTags = state[tabId].used
      const markedTags = state[tabId].marked

      if (!markedTags.length) return state

      const filteredTags = currentTags.filter(tag => {
        return !markedTags.includes(tag)
      })

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          used: filteredTags,
          marked: []
        }
      }
    }

    default: {
      return state
    }
  }
}

// SAGAS
export function* wSuggestedTags() {
  yield takeLatest('SUGGESTED_TAGS_REQUEST', tagSuggestions)
}
export function* wTagChanges() {
  yield takeLatest(['TAG_ADD', 'TAG_REMOVE', 'TAGS_REMOVE'], tagChanges)
}

const getUsedTags = state => {
  const activeTabId = state.active
  const activeTab = state.tabs[activeTabId]

  if (!activeTab) return false
  if (!state.saves[activeTabId] || !state.tags[activeTabId]) return false

  return {
    url: state.saves[activeTabId].given_url,
    id: state.saves[activeTabId].id,
    tags: state.tags[activeTabId].used,
    tabId: activeTabId
  }
}

const getStoredTags = state => {
  return state.setup.tags_stored || []
}

function* tagSuggestions(action) {
  try {
    const tagData = yield call(
      API.getOnSaveTags,
      action.saveObject,
      action.resolved_id
    )
    const tags = tagData[0].response.suggested_tags.map(item => item.tag)
    const tabId = tagData[0].saveObject.tabId
    yield put({
      type: 'SUGGESTED_TAGS_SUCCESS',
      tags,
      tabId: tabId
    })
  } catch (error) {
    yield put({ type: 'SUGGESTED_TAGS_FAILURE', error })
  }
}

function* tagChanges() {
  const tagInfo = yield select(getUsedTags)
  yield delay(2000)

  if (!tagInfo) return yield put({ type: 'TAG_SYNC_FAILED' })

  const tags = [...tagInfo.tags]
  const storedTags = yield select(getStoredTags)
  const tagsToStore = [...tags, ...storedTags].filter(
    (elem, pos, arr) => arr.indexOf(elem) === pos
  )
  setSettings({ tags_stored: JSON.stringify(tagsToStore) })
  yield put({
    type: 'UPDATE_STORED_TAGS',
    tags: tagsToStore,
    tabId: tagInfo.tabId
  })

  yield call(API.syncItemTags, tagInfo.id, tagInfo.tags)
}
