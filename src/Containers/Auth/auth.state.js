import { take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AUTH_URL, LOGOUT_SUCCESS } from 'Common/constants'
import { authorize, getGuid } from 'Common/api'
import { closeTabs } from 'Common/interface'
import { getSetting } from 'Common/interface'
import { queryTabs } from 'Common/interface'
import { removeSettings } from 'Common/interface'
import { setSettings } from 'Common/interface'

/* ACTIONS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const AUTH_CODE_RECIEVED = 'AUTH_CODE_RECIEVED'
const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export const authActions = {
  authCodeRecieved: payload => ({ type: AUTH_CODE_RECIEVED, payload }),
  userLoggedIn: payload => ({ type: USER_LOGGED_IN, payload }),
  userLoggedOut: payload => ({ type: USER_LOGGED_OUT, payload })
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const authSagas = [
  takeEvery(AUTH_CODE_RECIEVED, verifyAuthCode),
  takeLatest(USER_LOGGED_OUT, handleLogOut)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function* authRequired(action) {
  let token = yield call(getAuthToken)
  if (token) return token

  showLoginPage()

  while (!token) {
    yield take(USER_LOGGED_IN)
    return yield call(getAuthToken)
  }
}

function* verifyAuthCode(action) {
  yield loginUser(action.payload)
  yield put({ type: 'USER_LOGGED_IN' })
  closeLoginPages()
}

/* UTILITIES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function getAuthToken() {
  return getSetting('oauth_token')
}

function showLoginPage(resolve, reject) {
  window.open(AUTH_URL)
}

function closeLoginPages() {
  queryTabs({ url: LOGOUT_SUCCESS }, tabs => {
    let tabIDs = tabs.map(tab => tab.id)
    closeTabs(tabIDs)
  })
}

/* LOGIN
-------------------------------------------------- */
function loginUser(userCookies) {
  return getGuid()
    .then(guidResponse => authorize(guidResponse, userCookies))
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

      setSettings(accountObject)
    })
    .catch(errResponse => {
      throw new Error('Login Failed', errResponse)
    })
}

/* LOGOUT
-------------------------------------------------- */
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
  removeSettings(accountKeys)
  yield put({ type: 'USER_LOGGED_OUT', accountKeys })
}
