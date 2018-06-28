import { put, takeLatest, select, call } from 'redux-saga/effects'
import { getSetting, setSettings, removeSettings } from 'Common/interface'
import { getBool, mergeDedupe } from 'Common/utilities'
import { getGuid, fetchStoredTags } from 'Common/api'

/* INITIAL STATE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const initialState = {
  base_api_version: 'v3/',
  base_URL: 'https://getpocket.com/',
  base_installed: 1,
  on_save_recommendations: 1,
  sites_facebook: 1,
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
export const setup = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUP_EXTENSION_COMPLETE':
      return { ...state, guid: action.guid }

    case 'HYDRATED_STATE': {
      return { ...state, ...action.hydrated }
    }
    case 'HYDRATED_TAGS': {
      return { ...state, tags_stored: action.tags_stored }
    }

    case 'USER_LOGGED_OUT': {
      const accountKeys = action.accountKeys
      return Object.keys(state).reduce((accumulator, key) => {
        if (accountKeys.indexOf(key) < 0) accumulator[key] = state[key]
        return accumulator
      }, {})
    }
    case 'USER_LOGGED_IN': {
      return {
        ...state,
        ...action.accountObject
      }
    }

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

    case 'UPDATE_STORED_TAGS': {
      return {
        ...state,
        tags_stored: [...action.tags]
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
  const data = yield getGuid()
  setSettings({ ...initialState, id_guid: data.guid })
  yield put({ type: 'SETUP_EXTENSION_COMPLETE', guid: data.guid })
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
