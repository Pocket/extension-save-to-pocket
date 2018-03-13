import { delay } from 'redux-saga'
import { put, call, takeEvery, race } from 'redux-saga/effects'
import * as API from '../../../common/api'
import { getBestImage } from '../../../common/helpers'
import { requireAuthorization } from '../../auth/_auth'

// ACTIONS
export const recommendationActions = {
    saveRecommendation: data => ({ type: 'REQUEST_SAVE_REC_TO_POCKET', data }),
    openRecommendation: data => ({ type: 'OPEN_RECOMMENDATION', data })
}

function buildFeed(feed, source_id) {
    return feed.map(rec => {
        return {
            id: rec.item.item_id,
            sort_id: rec.sort_id,
            source_id: source_id,
            date: Date.now(),
            has_image: rec.item.has_image,
            title: rec.item.title,
            url: rec.item.resolved_url,
            excerpt: rec.item.excerpt,
            image: getBestImage(rec.item),
            status: 'idle'
        }
    })
}

function setFeedItemStatus(feed, id, status) {
    return feed.map(rec => {
        if (rec.id !== id) return rec
        rec.status = status
        return rec
    })
}

// REDUCERS
export const recommendations = (state = {}, action) => {
    switch (action.type) {
        case 'RECOMMENDATIONS_SUCCESS_CACHED': {
            return state
        }

        case 'REQUEST_SAVE_TO_POCKET': {
            return {
                ...state,
                [action.tabId]: undefined
            }
        }

        case 'RECOMMENDATIONS_SUCCESS': {
            return {
                ...state,
                [action.tabId]: {
                    feed: buildFeed(action.data.feed, action.source_id),
                    reason: action.data.reason
                }
            }
        }

        case 'REQUEST_SAVE_REC_TO_POCKET': {
            const tabId = action.data.tabId
            const feed = state[tabId].feed
            const id = action.data.id
            return {
                ...state,
                [tabId]: {
                    ...state[tabId],
                    feed: setFeedItemStatus(feed, id, 'saving')
                }
            }
        }

        case 'TAB_CLOSED': {
            const filteredState = state
            delete filteredState[action.tabId]
            return filteredState
        }

        case 'SAVE_RECOMMENDATION_SUCCESS': {
            const feed = state[action.tabId].feed
            const id = action.id
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    feed: setFeedItemStatus(feed, id, 'saved')
                }
            }
        }

        case 'SAVE_RECOMMENDATION_FAILURE': {
            const feed = state[action.tabId].feed
            const id = action.id
            return {
                ...state,
                [action.tabId]: {
                    ...state[action.tabId],
                    feed: setFeedItemStatus(feed, id, 'error')
                }
            }
        }

        default: {
            return state
        }
    }
}

// SAGAS
export function* wRecommendations() {
    yield takeEvery('RECOMMENDATIONS_REQUEST', getRecommendations)
}
export function* wSaveRecommendation() {
    yield takeEvery('REQUEST_SAVE_REC_TO_POCKET', saveRecommendation)
}

export function* wOpenRecommendation() {
    yield takeEvery('OPEN_RECOMMENDATION', openRecommendation)
}

function* getRecommendations(action) {
    try {
        const { data } = yield race({
            data: call(API.getRecommendations, action.resolvedId),
            timeout: delay(5000)
        })

        if (data) {
            yield put({
                type: 'RECOMMENDATIONS_SUCCESS',
                data,
                source_id: action.resolvedId,
                tabId: action.saveObject.tabId
            })
        } else {
            yield put({ type: 'RECOMMENDATIONS_FAILURE', error: 'timeout' })
        }
    } catch (error) {
        yield put({ type: 'RECOMMENDATIONS_FAILURE', error })
    }
}

function* saveRecommendation(action) {
    const { authToken } = yield race({
        authToken: call(requireAuthorization),
        timeout: call(delay, 10000)
    })

    if (authToken) {
        const data = yield call(
            API.saveRecToPocket,
            {
                title: action.data.title,
                url: action.data.url,
                item_id: action.data.item_id,
                source_id: action.data.source_id,
                position: action.data.position
            },
            authToken
        )

        yield data && data.status === 'ok'
            ? yield put({
                  type: 'SAVE_RECOMMENDATION_SUCCESS',
                  data,
                  tabId: action.data.tabId,
                  id: action.data.id
              })
            : yield put({
                  type: 'SAVE_RECOMMENDATION_FAILURE',
                  status: 'not ok',
                  tabId: action.data.tabId,
                  id: action.data.id
              })
    } else {
        yield put({
            type: 'SAVE_RECOMMENDATION_FAILURE',
            status: 'timeout',
            tabId: action.data.tabId,
            id: action.data.id
        })
    }
}

function* openRecommendation(action) {
    const { authToken } = yield race({
        authToken: call(requireAuthorization),
        timeout: call(delay, 10000)
    })

    if (authToken) {
        yield call(
            API.openRecommendation,
            {
                title: action.data.title,
                url: action.data.url,
                item_id: action.data.item_id,
                source_id: action.data.source_id,
                position: action.data.position
            },
            authToken
        )
    }
}
