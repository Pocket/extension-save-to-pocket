import { takeLatest, call } from 'redux-saga/effects'
import { requireAuthorization } from '../auth/_auth'
import { saveToPocket } from '../../common/api'

// SAGAS
export function* wSaveTweet() {
  yield takeLatest('SAVE_TWEET_TO_POCKET', saveTweetRequest)
}

function getTweetId(link) {
  try {
    return link.match(/\/([A-z0-9]*)$/)[1]
  } catch (e) {
    return link
  }
}

function* saveTweetRequest(saveObject) {
  const { permaLink, elementId } = saveObject.request
  const authToken = yield call(requireAuthorization)

  const url = `https://twitter.com${permaLink}`
  const tweet_id = getTweetId(permaLink)
  const data = saveToPocket({ url, elementId, additionalParams: { tweet_id } }, authToken)

  data.then(results => {
    saveObject.sendResponse(results)
  })
}
