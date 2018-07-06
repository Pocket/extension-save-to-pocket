// // ACTIONS
// export const recommendationActions = {
//   saveRecommendation: data => ({ type: 'REQUEST_SAVE_REC_TO_POCKET', data }),
//   openRecommendation: data => ({ type: 'OPEN_RECOMMENDATION', data }),
//   spocImpression: data => ({ type: 'SPOC_IMPRESSION', data }),
//   spocView: data => ({ type: 'SPOC_VIEWED', data }),
//   spocClick: data => ({ type: 'SPOC_CLICKED', data }),
//   spocRemove: (tabId, id) => ({ type: 'SPOC_REMOVE', tabId, id })
// }

// function buildFeed(feed, source_id) {
//   return feed.map(rec => {
//     const itemObject = {
//       id: parseInt(rec.item.item_id, 10),
//       sort_id: rec.sort_id,
//       source_id: source_id,
//       date: Date.now(),
//       has_image: rec.item.has_image,
//       title: rec.item.title,
//       resolved_url: rec.item.resolved_url,
//       display_url: rec.item.resolved_url,
//       url: rec.item.given_url || rec.item.resolved_url,
//       excerpt: rec.item.excerpt,
//       image: getBestImage(rec.item),
//       status: 'idle'
//     }

//     if (rec.impression_info) {
//       itemObject.isSpoc = true
//       itemObject.sponsor = rec.post.profile.name
//       itemObject.avatar = rec.post.profile.avatar_url
//       itemObject.has_image = true
//       itemObject.image = rec.impression_info.display.image.src
//       itemObject.impression_id = rec.impression_info.impression_id
//       itemObject.feed_item_id = rec.feed_item_id
//       itemObject.post_id = rec.post.post_id
//       itemObject.display_url = rec.impression_info.display.domain
//     }

//     return itemObject
//   })
// }

// function setFeedItemStatus(feed, id, status) {
//   return feed.map(rec => {
//     if (parseInt(rec.id, 10) !== parseInt(id, 10)) return rec
//     rec.status = status
//     return rec
//   })
// }

// function removeFeedItem(feed, id) {
//   return feed.filter(rec => {
//     return rec.id !== id
//   })
// }

// // REDUCERS
// export const recommendations = (state = {}, action) => {
//   switch (action.type) {
//     case 'RECOMMENDATIONS_SUCCESS_CACHED': {
//       return state
//     }

//     case 'REQUEST_SAVE_TO_POCKET': {
//       return {
//         ...state,
//         [action.tabId]: undefined
//       }
//     }

//     case 'RECOMMENDATIONS_SUCCESS': {
//       return {
//         ...state,
//         [action.tabId]: {
//           feed: buildFeed(action.data.feed, action.source_id),
//           reason: action.data.reason
//         }
//       }
//     }

//     case 'REQUEST_SAVE_REC_TO_POCKET': {
//       const tabId = action.data.tabId
//       const feed = state[tabId].feed
//       const id = action.data.item_id
//       return {
//         ...state,
//         [tabId]: {
//           ...state[tabId],
//           feed: setFeedItemStatus(feed, id, 'saving')
//         }
//       }
//     }

//     case 'TAB_CLOSED': {
//       const filteredState = state
//       delete filteredState[action.tabId]
//       return filteredState
//     }

//     case 'SAVE_RECOMMENDATION_SUCCESS': {
//       const feed = state[action.tabId].feed
//       const id = action.id
//       return {
//         ...state,
//         [action.tabId]: {
//           ...state[action.tabId],
//           feed: setFeedItemStatus(feed, id, 'saved')
//         }
//       }
//     }

//     case 'SAVE_RECOMMENDATION_TIMEOUT':
//     case 'SAVE_RECOMMENDATION_FAILURE': {
//       const feed = state[action.tabId].feed
//       const id = action.id
//       console.error('Recommendation Failed to Save', action.status)
//       return {
//         ...state,
//         [action.tabId]: {
//           ...state[action.tabId],
//           feed: setFeedItemStatus(feed, id, 'error')
//         }
//       }
//     }

//     case 'SPOC_REMOVE': {
//       const feed = state[action.tabId].feed
//       const id = action.id
//       return {
//         ...state,
//         [action.tabId]: {
//           ...state[action.tabId],
//           feed: removeFeedItem(feed, id)
//         }
//       }
//     }

//     default: {
//       return state
//     }
//   }
// }

// // SAGAS
// export function* wRecommendations() {
//   yield takeEvery('RECOMMENDATIONS_REQUEST', getRecommendations)
// }
// export function* wSaveRecommendation() {
//   yield takeEvery('REQUEST_SAVE_REC_TO_POCKET', saveRecommendation)
// }

// export function* wOpenRecommendation() {
//   yield takeEvery('OPEN_RECOMMENDATION', openRecommendation)
// }

// function* getRecommendations(action) {
//   try {
//     const { data } = yield race({
//       data: call(API.getRecommendations, action.resolvedId),
//       timeout: delay(5000)
//     })

//     if (data) {
//       yield put({
//         type: 'RECOMMENDATIONS_SUCCESS',
//         data,
//         source_id: action.resolvedId,
//         tabId: action.saveObject.tabId
//       })
//     } else {
//       yield put({ type: 'RECOMMENDATIONS_FAILURE', error: 'timeout' })
//     }
//   } catch (error) {
//     yield put({ type: 'RECOMMENDATIONS_FAILURE', error })
//   }
// }

// function* saveRecommendation(action) {
//   const { authToken } = yield race({
//     authToken: call(requireAuthorization),
//     timeout: call(delay, 10000)
//   })

//   if (authToken) {
//     const data = yield call(
//       API.saveRecToPocket,
//       {
//         title: action.data.title,
//         url: action.data.url,
//         item_id: action.data.item_id,
//         source_id: action.data.source_id,
//         position: action.data.position
//       },
//       authToken
//     )

//     if (data && data.status === 'ok') {
//       yield put({
//         type: 'SAVE_RECOMMENDATION_SUCCESS',
//         data,
//         tabId: action.data.tabId,
//         id: action.data.item_id
//       })
//     } else {
//       yield put({
//         type: 'SAVE_RECOMMENDATION_FAILURE',
//         status: 'not ok',
//         tabId: action.data.tabId,
//         id: action.data.item_id
//       })
//     }
//   } else {
//     yield put({
//       type: 'SAVE_RECOMMENDATION_TIMEOUT',
//       status: 'timeout',
//       tabId: action.data.tabId,
//       id: action.data.item_id
//     })
//   }
// }

// function* openRecommendation(action) {
//   const { authToken } = yield race({
//     authToken: call(requireAuthorization),
//     timeout: call(delay, 10000)
//   })

//   if (authToken) {
//     yield call(
//       API.openRecommendation,
//       {
//         title: action.data.title,
//         url: action.data.url,
//         item_id: action.data.item_id,
//         source_id: action.data.source_id,
//         position: action.data.position
//       },
//       authToken
//     )
//   }
// }

// // SPOC SAGAS
// export function* wSpocImpression() {
//   yield takeEvery('SPOC_IMPRESSION', spocImpression)
// }

// export function* wSpocView() {
//   yield takeEvery('SPOC_VIEWED', spocViewed)
// }

// export function* wSpocClick() {
//   yield takeEvery('SPOC_CLICKED', spocClicked)
// }

// function* spocImpression(action) {
//   const { authToken } = yield race({
//     authToken: call(requireAuthorization),
//     timeout: call(delay, 10000)
//   })

//   if (authToken) {
//     const context = {
//       ...action.data.context,
//       action: 'sp_impression_loaded'
//     }
//     yield call(API.sendSpocAnalytics, authToken, [context])
//   }
// }

// function* spocViewed(action) {
//   const { authToken } = yield race({
//     authToken: call(requireAuthorization),
//     timeout: call(delay, 10000)
//   })

//   if (authToken) {
//     const context = {
//       ...action.data.context,
//       action: 'sp_impression_viewed'
//     }
//     yield call(API.sendSpocAnalytics, authToken, [context])
//   }
// }

// function* spocClicked(action) {
//   const { authToken } = yield race({
//     authToken: call(requireAuthorization),
//     timeout: call(delay, 10000)
//   })

//   if (authToken) {
//     const context = {
//       ...action.data.context,
//       action: 'sp_impression_clicked'
//     }
//     yield call(API.sendSpocAnalytics, authToken, [context])
//   }
// }
