import { delay } from 'redux-saga'
import { put, call, takeLatest, race, select } from 'redux-saga/effects'
import * as API from '../../../common/api'
import { getBestImage } from '../../../common/helpers'
import { requireAuthorization } from '../../auth/_auth'

// ACTIONS
export const recommendationActions = {
    saveRecommendation: data => ({ type: 'REQUEST_SAVE_REC_TO_POCKET', data })
}

function buildFeed(feed) {
    return feed.map(rec => {
        return {
            id: rec.item.item_id,
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

        case 'RECOMMENDATIONS_SUCCESS': {
            return {
                ...state,
                [action.saveHash]: {
                    feed: buildFeed(action.data.feed),
                    reason: action.data.reason
                }
            }
        }

        case 'REQUEST_SAVE_REC_TO_POCKET': {
            const saveHash = action.data.hash
            const feed = state[saveHash].feed
            const id = action.data.id
            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    feed: setFeedItemStatus(feed, id, 'saving')
                }
            }
        }

        case 'SAVE_RECOMMENDATION_SUCCESS': {
            const saveHash = action.hash
            const feed = state[saveHash].feed
            const id = action.id
            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
                    feed: setFeedItemStatus(feed, id, 'saved')
                }
            }
        }

        case 'SAVE_RECOMMENDATION_FAILURE': {
            const saveHash = action.hash
            const feed = state[saveHash].feed
            const id = action.id
            return {
                ...state,
                [saveHash]: {
                    ...state[saveHash],
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
    yield takeLatest('RECOMMENDATIONS_REQUEST', getRecommendations)
}
export function* wSaveRecommendation() {
    yield takeLatest('REQUEST_SAVE_REC_TO_POCKET', saveRecommendation)
}

const getCurrentRecs = state => {
    const hash = state.tabs[state.active].hash
    return state.recommendations[hash]
}

function* getRecommendations(action) {
    const current = yield select(getCurrentRecs)
    if (current) return //yield put({type: 'RECOMMENDATIONS_SUCCESS_CACHED'})

    try {
        const data = yield call(API.getRecommendations, action.resolvedId)
        yield put({
            type: 'RECOMMENDATIONS_SUCCESS',
            data,
            saveHash: action.saveObject.saveHash
        })
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
            API.saveToPocket,
            {
                url: action.data.url,
                title: action.data.title
            },
            authToken
        )

        yield data && data.status === 'ok'
            ? yield put({
                  type: 'SAVE_RECOMMENDATION_SUCCESS',
                  data,
                  hash: action.data.hash,
                  id: action.data.id
              })
            : yield put({
                  type: 'SAVE_RECOMMENDATION_FAILURE',
                  status: 'not ok',
                  hash: action.data.hash,
                  id: action.data.id
              })
    } else {
        yield put({
            type: 'SAVE_RECOMMENDATION_FAILURE',
            status: 'timeout',
            hash: action.data.hash,
            id: action.data.id
        })
    }
}
