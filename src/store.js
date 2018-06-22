import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { activeTabSagas } from 'Containers/Background/tab.active.state'
import { activeTabReducers } from 'Containers/Background/tab.active.state'

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
const enhancers = applyMiddleware(sagaMiddleware)
export const store = createStore(rootReducer, {}, enhancers)
sagaMiddleware.run(rootSaga)
