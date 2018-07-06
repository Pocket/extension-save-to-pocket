import { delay } from 'redux-saga'
import { put, call, race, all } from 'redux-saga/effects'
import { take, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { getRecommendations, saveRecToPocket } from 'Common/api'
import { filterAllowedFields } from 'Common/utilities'
import { REC_DETAILS } from 'Common/constants'

/* CONSTANTS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const GET_RECS = 'GET_RECS'
const GET_RECS_REQUEST = 'GET_RECS_REQUEST'
const GET_RECS_SUCCESS = 'GET_RECS_SUCCESS'
const GET_RECS_FAILURE = 'GET_RECS_FAILURE'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recommendationActions = {
  getRecommendations: payload => ({ type: GET_RECS, payload })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recommendationReducers = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_ITEM_TO_POCKET': {
      return updateStatus(state, action, 'loading')
    }

    case GET_RECS_SUCCESS: {
      const { tabId, recs } = action.payload
      return {
        ...state,
        [tabId]: { status: 'loaded', recs }
      }
    }

    default: {
      return state
    }
  }
}

function updateStatus(state, action, status) {
  const { payload } = action
  const { tabId } = payload
  const recs = state[tabId]

  return { ...state, [tabId]: { ...recs, status } }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recommendationSagas = [takeEvery(GET_RECS, recRequest)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */

function* recRequest(action) {
  const { tabId } = action.payload
  yield put({ type: GET_RECS_REQUEST, payload: { tabId } })

  try {
    const data = yield call(getRecommendations, { ...action.payload, count: 3 })
    if (!data) throw new Error('Get Recommendations failed')

    const recs = data.feed.map(feedItem => {
      const { feed_item_id, item, sort_id } = feedItem
      const rec = filterAllowedFields(item, REC_DETAILS)
      return { feed_item_id, sort_id, ...rec }
    })

    yield put({ type: GET_RECS_SUCCESS, payload: { tabId, recs } })
  } catch (error) {
    yield put({ type: GET_RECS_FAILURE, payload: { tabId } })
    console.error(action.type, error)
  }
}
