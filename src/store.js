import { combineReducers } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { wrapStore } from 'react-chrome-redux'
import { PORT_NAME } from 'Common/constants'
/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { activeTabSagas } from 'Containers/Background/tab.active.state'
import { activeTabReducers } from 'Containers/Background/tab.active.state'
import { authSagas } from 'Containers/Auth/auth.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = combineReducers({
  activeTabId: activeTabReducers
})

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([...activeTabSagas])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers = composeWithDevTools({ port: 8000 })

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware))
export const store = createStore(rootReducer, {}, enhancers)

wrapStore(store, { portName: PORT_NAME })
sagaMiddleware.run(rootSaga)
