import { takeLatest } from 'redux-saga/effects'
import { getBestImage } from 'common/helpers'

import { GET_RECS_SUCCESS } from 'actions'
import { GET_RECS_FAILURE } from 'actions'

import { SAVE_REC_REQUEST } from 'actions'
import { SAVE_REC_SUCCESS } from 'actions'
import { SAVE_REC_FAILURE } from 'actions'

import { OPEN_REC } from 'actions'

// INITIAL STATE
const initialState = {
  feed: [],
  reason: ''
}

// ACTIONS
export const recActions = {
  saveRec: payload => ({ type: SAVE_REC_REQUEST, payload }),
  openRec: payload => ({ type: OPEN_REC, payload })
}

// REDUCER
export const recReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECS_SUCCESS: {
      const { feed, reason } = action.payload.response
      return {
        ...state,
        feed: buildFeed(feed, action.source_id),
        reason
      }
    }

    case GET_RECS_FAILURE: {
      console.log(action.payload)
      return state
    }

    case SAVE_REC_SUCCESS: {
      console.log(action.payload)
      return state
    }

    case SAVE_REC_FAILURE: {
      console.log(action.payload)
      return state
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const recSagas = [takeLatest(SAVE_REC_REQUEST, saveRecRequest)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* saveRecRequest(action) {}

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
