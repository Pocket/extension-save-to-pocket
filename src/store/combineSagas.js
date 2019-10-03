import { all, takeLatest } from 'redux-saga/effects'
import { openPocket } from 'common/helpers'
import { openOptions } from 'common/interface'

import { wSetup } from 'containers/webkit/background/_setup'
import { wHydrate } from 'containers/webkit/background/_setup'
import { wToggleRecs } from 'containers/webkit/background/_setup'
import { wToggleSite } from 'containers/webkit/background/_setup'
import { wUserLoggedIn } from 'containers/webkit/background/_setup'

import { wTabChanges } from 'containers/webkit/background/_tabs'

import { wSaveTweet } from 'containers/webkit/background/_sites'

import { wAuthCodeRecieved } from 'containers/webkit/auth/_auth'
import { wLogout } from 'containers/webkit/auth/_auth'

import { wCloseSavePanel } from 'containers/webkit/save/_save'
import { wSavePage } from 'containers/webkit/save/_save'
import { wSaveUrl } from 'containers/webkit/save/_save'
import { wRemoveItem } from 'containers/webkit/save/_save'
import { wArchiveItem } from 'containers/webkit/save/_save'

import { wTagChanges } from 'containers/webkit/save/toolbar/tagging/_tagging'
import { wSuggestedTags } from 'containers/webkit/save/toolbar/tagging/_tagging'

import { wRecommendations } from 'containers/webkit/save/recommendations/_recommendations'
import { wSaveRecommendation } from 'containers/webkit/save/recommendations/_recommendations'
import { wOpenRecommendation } from 'containers/webkit/save/recommendations/_recommendations'

import { wSpocImpression } from 'containers/webkit/save/recommendations/_recommendations'
import { wSpocView } from 'containers/webkit/save/recommendations/_recommendations'
import { wSpocClick } from 'containers/webkit/save/recommendations/_recommendations'

import { wSurvey } from 'containers/webkit/save/survey/_survey'
import {
  wSurveyResponse,
  wSurveyCancel
} from 'containers/webkit/save/survey/_survey'

export function* wOpenPocket() {
  yield takeLatest('OPEN_POCKET', openPocket)
}
export function* wOpenOptions() {
  yield takeLatest('OPEN_OPTIONS', openOptions)
}

export default function* rootSaga() {
  yield all([
    wSetup(),
    wHydrate(),
    wToggleRecs(),
    wToggleSite(),
    wSaveTweet(),
    wUserLoggedIn(),

    wTabChanges(),

    wOpenPocket(),
    wOpenOptions(),

    wAuthCodeRecieved(),
    wLogout(),

    wCloseSavePanel(),
    wSavePage(),
    wSaveUrl(),
    wRemoveItem(),
    wArchiveItem(),

    wTagChanges(),
    wSuggestedTags(),

    wRecommendations(),
    wSaveRecommendation(),
    wOpenRecommendation(),
    wSpocImpression(),
    wSpocView(),
    wSpocClick(),

    wSurvey(),
    wSurveyResponse(),
    wSurveyCancel()
  ])
}
