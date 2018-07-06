import { put, takeLatest, select, call } from 'redux-saga/effects'
import { getSetting, setSettings } from 'Common/interface'
import { syncStateAndSettings } from 'Common/helpers'
import { getGuid, fetchStoredTags, getFeatures } from 'Common/api'

/* INITIAL STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialState = {
  on_save_recommendations: 1,
  sites_hackernews: 1,
  sites_reddit: 1,
  sites_twitter: 1
}

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const SETUP = 'SETUP'
const TOGGLE_RECOMMENDATIONS = 'TOGGLE_RECOMMENDATIONS'
const TOGGLE_SHORTCUT = 'TOGGLE_SHORTCUT'
const TOGGLE_SITE = 'TOGGLE_SITE'

export const setupActions = {
  setupExtension: () => ({ type: SETUP }),
  toggleRecommendations: () => ({ type: TOGGLE_RECOMMENDATIONS }),
  toggleKeyboardShortcut: () => ({ type: TOGGLE_SHORTCUT }),
  toggleSite: sitename => ({ type: TOGGLE_SITE, sitename })
}

/* REDUCERS :: STATE SHAPE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const setupReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUP_EXTENSION_COMPLETE':
      const { settings } = action.payload
      return { ...state, ...settings }

    case 'SET_RECOMMENDATIONS': {
      return {
        ...state,
        on_save_recommendations: action.active
      }
    }

    case 'SET_SITES': {
      return {
        ...state,
        ...action.sites
      }
    }

    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const setupSagas = [
  takeLatest(SETUP, initSetup),
  takeLatest(TOGGLE_RECOMMENDATIONS, toggleRecommendations),
  takeLatest(TOGGLE_SITE, toggleSite)
]

/* SAGAS :: SELECTORS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const getSetup = state => {
  return state.setup
}

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* initSetup() {
  const base = {
    base_api_version: 'v3/',
    base_URL: 'https://getpocket.com/',
    base_installed: 1
  }

  const settings = syncStateAndSettings(initialState)
  const data = yield getGuid()

  setSettings({ guid: data.guid, ...base, ...settings })
  yield put({ type: 'SETUP_EXTENSION_COMPLETE', payload: { settings } })
}

function* toggleRecommendations() {
  const setup = yield select(getSetup)
  const active = setup.on_save_recommendations

  setSettings({ on_save_recommendations: active ? 0 : 1 })
  yield put({ type: 'SET_RECOMMENDATIONS', active: !active })
}

function* toggleSite(action) {
  const sitename = action.sitename
  const setup = yield select(getSetup)
  const active = setup[sitename]
  const settingsObject = { [sitename]: active ? 0 : 1 }

  setSettings(settingsObject)
  yield put({ type: 'SET_SITES', sites: { [sitename]: !active } })
}

export function* serverSync(action) {
  const syncDate = getSetting('base_syncDate') || 0
  const today = new Date().toLocaleDateString()

  if (syncDate === today)
    return yield {
      features: JSON.parse(getSetting('features_stored')),
      storedTags: JSON.parse(getSetting('tags_stored'))
    }

  const featureResponse = yield call(getFeatures)
  const storedTagsResponse = yield call(fetchStoredTags)

  const features = featureResponse.response.features
  const storedTags = storedTagsResponse.tags || []

  const payload = {
    base_syncDate: today,
    features_stored: JSON.stringify(features),
    tags_stored: JSON.stringify(storedTags)
  }

  setSettings(payload)
  return yield payload
}
