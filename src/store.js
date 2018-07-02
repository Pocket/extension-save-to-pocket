import { combineReducers } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { wrapStore } from 'react-chrome-redux'
import { PORT_NAME } from 'Common/constants'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { authSagas } from 'Containers/Auth/auth.state'

import { tabSagas } from 'Containers/Background/tab.state'
import { tabReducers } from 'Containers/Background/tab.state'

import { saveSagas } from 'Containers/Save/save.state'
import { saveReducers } from 'Containers/Save/save.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = combineReducers({
  tab: tabReducers,
  saves: saveReducers
})

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([...authSagas, ...tabSagas, ...saveSagas])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers = composeWithDevTools({ port: 8000 })

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware))
export const store = createStore(rootReducer, {}, enhancers)

wrapStore(store, { portName: PORT_NAME })
sagaMiddleware.run(rootSaga)
