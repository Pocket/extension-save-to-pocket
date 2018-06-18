import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { saveReducers, saveSagas } from 'Containers/Save/save.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = combineReducers({
  app: saveReducers
})

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([...saveSagas])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const enhancers = applyMiddleware(sagaMiddleware)
export const store = createStore(rootReducer, {}, enhancers)
sagaMiddleware.run(rootSaga)
