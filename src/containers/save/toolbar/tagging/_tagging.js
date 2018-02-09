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
    return list.used.filter(tag => tag.name === tagValue).length
}

// REDUCERS
export const tags = (state = {}, action) => {
    switch (action.type) {
        case 'SAVE_TO_POCKET_SUCCESS': {
            const usedTags = state[action.saveHash]
                ? [...state[action.saveHash].used]
                : []

            return {
                ...state,
                [action.saveHash]: {
                    ...state[action.saveHash],
                    used: usedTags,
                    marked: []
                }
            }
        }

        case 'SUGGESTED_TAGS_SUCCESS': {
            const suggestedTags = action.tags
            const saveHash = action.saveHash
            const tags = state[saveHash]
            return {
                ...state,
                [saveHash]: {
                    ...tags,
                    suggested: suggestedTags
                }
            }
        }

        case 'TAG_ADD': {
            const saveHash = action.tag.saveHash
            const tagValue = action.tag.value
            const tags = state[saveHash]

            // Don't add duplicate entries
            if (checkDuplicate(tags, tagValue)) return state

            return {
                ...state,
                [saveHash]: {
                    ...tags,
                    used: [...tags.used, tagValue]
                }
            }
        }

        case 'TAG_REMOVE': {
            const saveHash = action.data.saveHash
            const tag = action.data.tag
            const usedTags = state[saveHash].used.filter(item => item !== tag)

            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    used: usedTags
                }
            }
        }

        case 'TAG_ACTIVATE': {
            const saveHash = action.data.saveHash
            const currentTags = state[saveHash].used
            const tagIndex = currentTags.indexOf(action.data.tag)
            const markedTags = state[saveHash].marked

            const tagPosition = tagIndex < 0 ? currentTags.length - 1 : tagIndex

            const markedTag = currentTags.slice(tagPosition, tagPosition + 1)[0]
            if (markedTags.includes(markedTag)) return state

            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    marked: [...markedTags, markedTag]
                }
            }
        }

        case 'TAG_DEACTIVATE': {
            const saveHash = action.data.saveHash
            const tag = action.data.tag
            const markedTags = state[saveHash].marked.filter(
                item => item !== tag
            )

            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    marked: markedTags
                }
            }
        }

        case 'TAGS_DEACTIVATE': {
            const saveHash = action.data.saveHash
            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    marked: []
                }
            }
        }

        case 'TAGS_REMOVE': {
            const saveHash = action.data.saveHash
            const currentTags = state[saveHash].used
            const markedTags = state[saveHash].marked

            if (!markedTags.length) return state

            const filteredTags = currentTags.filter(tag => {
                return !markedTags.includes(tag)
            })

            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
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

    const activeHash = activeTab.hash

    return {
        url: state.saves[activeHash].url,
        tags: state.tags[activeHash].used
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
        const saveHash = tagData[0].saveObject.saveHash

        yield put({ type: 'SUGGESTED_TAGS_SUCCESS', tags, saveHash })
    } catch (error) {
        yield put({ type: 'SUGGESTED_TAGS_FAILURE', error })
    }
}

function* tagChanges() {
    yield delay(2000)
    const tagInfo = yield select(getUsedTags)

    if (!tagInfo) return yield put({ type: 'TAG_SYNC_FAILED' })

    const tags = [...tagInfo.tags]
    const storedTags = yield select(getStoredTags)
    const tagsToStore = [...tags, ...storedTags].filter(
        (elem, pos, arr) => arr.indexOf(elem) === pos
    )
    setSettings({ tags_stored: JSON.stringify(tagsToStore) })
    yield put({ type: 'UPDATE_STORED_TAGS', tags: tagsToStore })

    yield call(API.syncItemTags, tagInfo.url, tagInfo.tags)
}
