import { takeEvery, put } from 'redux-saga/effects'
import { getBestImage } from 'common/helpers'

import { GET_RECS_REQUEST } from 'actions'
import { GET_RECS_SUCCESS } from 'actions'
import { GET_RECS_FAILURE } from 'actions'

import { SAVE_REC } from 'actions'
import { SAVE_REC_REQUEST } from 'actions'
import { SAVE_REC_SUCCESS } from 'actions'
import { SAVE_REC_FAILURE } from 'actions'

import { OPEN_REC } from 'actions'

// INITIAL STATE
const initialState = {
  showRecs: false,
  feed: [],
  reason: ''
}

// ACTIONS
export const recActions = {
  saveRecommendation: payload => ({ type: SAVE_REC, payload }),
  openRecommendation: payload => ({ type: OPEN_REC, payload })
}

// REDUCER
export const recReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECS_REQUEST: {
      return { ...state, showRecs: true }
    }

    case GET_RECS_SUCCESS: {
      const { recommendations, reason } = action.payload
      return {
        ...state,
        feed: buildFeed(recommendations, action.source_id),
        reason
      }
    }

    case GET_RECS_FAILURE: {
      console.log(action.payload)
      return state
    }

    case SAVE_REC_REQUEST: {
      const { item_id } = action.payload
      const feed = setFeedItemStatus(state.feed, item_id, 'saving')
      return { ...state, feed }
    }

    case SAVE_REC_SUCCESS: {
      const { item_id } = action.payload
      const feed = setFeedItemStatus(state.feed, item_id, 'saved')
      return { ...state, feed }
    }

    case SAVE_REC_FAILURE: {
      const { item_id } = action.payload
      const feed = setFeedItemStatus(state.feed, item_id, 'idle')
      return { ...state, feed }
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recSagas = [takeEvery(SAVE_REC, saveRec)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* saveRec(action) {
  const { payload } = action
  yield put({ type: SAVE_REC_REQUEST, payload })
}

function buildFeed(feed, source_id) {
  return feed.map(rec => {
    const itemObject = {
      id: parseInt(rec.item.item_id, 10),
      sort_id: rec.sort_id,
      source_id: source_id,
      date: Date.now(),
      has_image: Boolean(rec.item.has_image),
      title: rec.item.title,
      resolved_url: rec.item.resolved_url,
      display_url: rec.item.resolved_url,
      url: rec.item.given_url || rec.item.resolved_url,
      excerpt: rec.item.excerpt,
      image: getBestImage(rec.item),
      status: 'idle'
    }

    if (rec.impression_info) {
      itemObject.isSpoc = true
      itemObject.sponsor = rec.post.profile.name
      itemObject.avatar = rec.post.profile.avatar_url
      itemObject.has_image = true
      itemObject.image = rec.impression_info.display.image.src
      itemObject.impression_id = rec.impression_info.impression_id
      itemObject.feed_item_id = rec.feed_item_id
      itemObject.post_id = rec.post.post_id
      itemObject.display_url = rec.impression_info.display.domain
    }

    return itemObject
  })
}

function setFeedItemStatus(feed, id, status) {
  return feed.map(rec => {
    if (parseInt(rec.id, 10) !== parseInt(id, 10)) return rec
    rec.status = status
    return rec
  })
}
