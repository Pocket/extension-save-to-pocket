/*global safari*/
import { USER_LOG_OUT } from './actions'
import { OPEN_POCKET } from './actions'
import { takeLatest } from 'redux-saga/effects'

// ACTIONS
export const appActions = {
  userLogOut: () => ({ type: USER_LOG_OUT }),
  openPocket: () => ({ type: OPEN_POCKET })
}

// REDUCER
export const appReducers = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

/* SAGAS :: WATCHERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const appSagas = [
  takeLatest(USER_LOG_OUT, logOutRequest),
  takeLatest(OPEN_POCKET, openPocket)
]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* logOutRequest() {
  yield safari.extension.dispatchMessage(USER_LOG_OUT)
}

function* openPocket() {
  yield safari.extension.dispatchMessage(OPEN_POCKET)
}
