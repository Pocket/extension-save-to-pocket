/*global safari*/
import { USER_LOG_OUT } from './actions'
import { takeLatest } from 'redux-saga/effects'

// ACTIONS
export const appActions = {
  userLogOut: () => ({ type: USER_LOG_OUT })
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
export const appSagas = [takeLatest(USER_LOG_OUT, logOutRequest)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* logOutRequest() {
  yield safari.extension.dispatchMessage(USER_LOG_OUT)
}
