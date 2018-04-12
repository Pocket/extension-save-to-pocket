import { put, takeLatest, select, call } from 'redux-saga/effects'
import { getSetting, setSettings, removeSettings } from '../../common/interface'
import { getBool, mergeDedupe } from '../../common/utilities'
import { getGuid, fetchStoredTags } from '../../common/api'

// INITIAL STATE
const initialState = {
  base_api_version: 'v3/',
  base_loglevel: 'DEFAULT',
  base_URL: 'https://getpocket.com/',

  base_installed: 1,

  on_save_recommendations: 1,

  sites_facebook: 1,
  sites_hackernews: 1,
  sites_reddit: 1,
  sites_twitter: 1
}

// ACTIONS
export const setupActions = {
  setupExtension: () => ({ type: 'SETUP' }),
  toggleRecommendations: () => ({ type: 'TOGGLE_RECOMMENDATIONS' }),
  toggleKeyboardShortcut: () => ({ type: 'TOGGLE_SHORTCUT' }),
  toggleSite: sitename => ({ type: 'TOGGLE_SITE', sitename })
}

// REDUCERS
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

// SAGAS
export function* wSetup() {
  yield takeLatest('SETUP', initSetup)
}
export function* wHydrate() {
  yield takeLatest('HYDRATE_STATE', hydrateState)
}
export function* wToggleRecs() {
  yield takeLatest('TOGGLE_RECOMMENDATIONS', toggleRecommendations)
}
export function* wToggleSite() {
  yield takeLatest('TOGGLE_SITE', toggleSite)
}
export function* wUserLoggedIn() {
  yield takeLatest('USER_LOGGED_IN', hydrateTags)
}

const getSetup = state => {
  return state.setup
}

function* initSetup() {
  const data = yield getGuid()

  setSettings({ ...initialState, id_guid: data.guid })

  yield put({ type: 'SETUP_EXTENSION_COMPLETE', guid: data.guid })
}

function* hydrateState() {
  // Consolidate tags: Remove this in 3.0.1.0
  const tags = JSON.parse(getSetting('tags')) || []
  const storedTags = JSON.parse(getSetting('tags_stored')) || []
  const tags_stored = mergeDedupe([...tags, ...storedTags])

  if (tags.length) {
    setSettings({ tags_stored: JSON.stringify(tags_stored) })
    removeSettings(['tags'])
  }

  const hydrated = {
    oauth_token: getSetting('oauth_token'),
    account_username: getSetting('account_username'),
    account_birth: getSetting('account_birth'),
    account_email: getSetting('account_email'),
    account_name_first: getSetting('account_name_first'),
    account_name_last: getSetting('account_name_last'),
    account_avatar: getSetting('account_avatar'),
    account_premium: getBool(getSetting('account_premium')),
    on_save_recommendations: getBool(getSetting('on_save_recommendations')),
    sites_facebook: getBool(getSetting('sites_facebook')),
    sites_hackernews: getBool(getSetting('sites_hackernews')),
    sites_reddit: getBool(getSetting('sites_reddit')),
    sites_twitter: getBool(getSetting('sites_twitter')),
    tags_stored
  }

  yield put({ type: 'HYDRATED_STATE', hydrated })
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

function* hydrateTags() {
  // Check for server tags
  const fetchedSince = getSetting('tags_fetched_timestamp') || 0
  const fetchTags = yield call(fetchStoredTags, fetchedSince)
  const fetchedTags = fetchTags ? fetchTags.tags || [] : []
  const storedTags = JSON.parse(getSetting('tags_stored')) || []
  const tags_stored = mergeDedupe([...storedTags, ...fetchedTags])

  setSettings({
    tags_stored: JSON.stringify(tags_stored),
    tags_fetched_timestamp: Date.now()
  })

  yield put({ type: 'HYDRATED_TAGS', tags_stored })
}
