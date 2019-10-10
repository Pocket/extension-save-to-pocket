import { delay } from 'redux-saga/effects'
import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as Interface from 'common/interface'
import { authorize, getGuid } from 'common/api'
import { AUTH_URL } from 'common/constants'

var postLoginPromise

/* SAGAS
-------------------------------------------------- */
const getSetup = state => state.setup

export function* wAuthCodeRecieved() {
  yield takeEvery('AUTH_CODE_RECIEVED', verifyAuthCode)
}
export function* wLogout() {
  yield takeLatest('USER_LOGOUT', handleLogOut)
}

export function* requireAuthorization() {
  const current = yield select(getSetup)
  return yield getAuthToken(current)
}

function* verifyAuthCode(action) {
  yield delay(1000) // Pause for user edification
  yield handleAuthCode(action.loginMessage)
}

/* CHECK/RETURN OAUTH TOKEN
-------------------------------------------------- */
function getAuthToken(current) {
  return new Promise(function(resolve, reject) {
    const shouldResolve = isAuthorized(current)
    if (shouldResolve) resolve(current.oauth_token)
    else showLoginPage(resolve, reject)
  })
}

function isAuthorized(current) {
  const storedToken = Interface.getSetting('oauth_token')
  return (
    storedToken && current.oauth_token && storedToken === current.oauth_token
  )
}

/* PAGE HANDLERS
-------------------------------------------------- */
function showLoginPage(resolve, reject) {
  postLoginPromise = { resolve, reject }
  window.open(AUTH_URL)
}

function closeLoginPage() {
  Interface.queryTabs(
    { url: '*://getpocket.com/extension_login_success' },
    function(tabs) {
      let tabIDs = tabs.map(tab => tab.id)
      Interface.closeTabs(tabIDs)
    }
  )
}

/* RESPONSE HANDLERS
-------------------------------------------------- */
function* handleAuthCode(responseValue) {
  const accountObject = yield loginUser(responseValue)
  yield put({ type: 'USER_LOGGED_IN', accountObject })
  closeLoginPage()
}

function* handleLogOut() {
  const accountKeys = [
    'oauth_token',
    'account_username',
    'account_birth',
    'account_email',
    'account_name_first',
    'account_name_last',
    'account_avatar',
    'account_premium',
    'id_guid'
  ]
  Interface.removeSettings(accountKeys)
  yield put({ type: 'USER_LOGGED_OUT', accountKeys })
}

/* LOGIN
-------------------------------------------------- */
function loginUser(userCookies) {
  return getGuid()
    .then(response => authorize(response, userCookies))
    .then(response => {
      const account = response.account
      const accountObject = {
        oauth_token: response.access_token,
        account_username: response.username,
        account_birth: account.birth,
        account_email: account.email,
        account_name_first: account.first_name,
        account_name_last: account.last_name,
        account_avatar: account.profile.avatar_url,
        account_premium: account.premium_status
      }

      Interface.setSettings(accountObject)
      if (postLoginPromise) postLoginPromise.resolve(response.access_token)

      return accountObject
    })
    .catch(errResponse => {
      console.warn(errResponse)
    })
}
