import { takeLatest, put } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import { OPEN_POCKET } from 'actions'
import { USER_LOG_OUT } from 'actions'

// ACTIONS
export const openPocket = () => ({ type: OPEN_POCKET })
export const userLogOut = () => ({ type: USER_LOG_OUT })

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
export const appSagas = [takeLatest(OPEN_POCKET, openPocketSaga)]

/* SAGAS :: RESPONDERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
function* openPocketSaga() {
  yield delay(500)
  yield put({ type: OPEN_POCKET })
}
