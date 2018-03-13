import { all, takeLatest } from 'redux-saga/effects'
import { openPocket } from '../common/helpers'
import { openOptions } from '../common/interface'

import { wSetup } from '../containers/background/_setup'
import { wHydrate } from '../containers/background/_setup'
import { wToggleRecs } from '../containers/background/_setup'
import { wToggleSite } from '../containers/background/_setup'
import { wUserLoggedIn } from '../containers/background/_setup'

import { wTabChanges } from '../containers/background/_tabs'

import { wSaveTweet } from '../containers/background/_sites'

import { wAuthCodeRecieved } from '../containers/auth/_auth'
import { wLogout } from '../containers/auth/_auth'

import { wCloseSavePanel } from '../containers/save/_save'
import { wSavePage } from '../containers/save/_save'
import { wSaveUrl } from '../containers/save/_save'
import { wRemoveItem } from '../containers/save/_save'
import { wArchiveItem } from '../containers/save/_save'

import { wTagChanges } from '../containers/save/toolbar/tagging/_tagging'
import { wSuggestedTags } from '../containers/save/toolbar/tagging/_tagging'

import { wRecommendations } from '../containers/save/recommendations/_recommendations'
import { wSaveRecommendation } from '../containers/save/recommendations/_recommendations'
import { wOpenRecommendation } from '../containers/save/recommendations/_recommendations'

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
        wOpenRecommendation()
    ])
}
