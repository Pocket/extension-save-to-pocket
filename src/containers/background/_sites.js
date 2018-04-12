import { takeLatest, call } from 'redux-saga/effects'
import { requireAuthorization } from '../auth/_auth'
import { saveToPocket } from '../../common/api'

// SAGAS
export function* wSaveTweet() {
  yield takeLatest('SAVE_TWEET_TO_POCKET', saveTweetRequest)
}

function* saveTweetRequest(saveObject) {
  const { permaLink, elementId } = saveObject.request
  const authToken = yield call(requireAuthorization)

  const url = `https://twitter.com${permaLink}`
  const data = saveToPocket({ url, elementId }, authToken)

  data.then(results => {
    saveObject.sendResponse(results)
  })
}
