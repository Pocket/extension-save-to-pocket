import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import { localizeReducer } from 'react-localize-redux'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { saveReducers } from './save.state'
import { saveSagas } from './save.state'

import { tagsReducers } from './tags.state'
import { tagsSagas } from './tags.state'

import { appSagas } from './app.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = () =>
  combineReducers({
    saves: saveReducers,
    tags: tagsReducers
    // localize: localizeReducer,
    // app: appReducers
  })

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([...appSagas, ...saveSagas, ...tagsSagas])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers = compose
const enhancers = applyMiddleware(sagaMiddleware)

/** PERSISTED STATE
--------------------------------------------------------------- */
const initialState = {}

export const store = createStore(
  rootReducer(),
  initialState,
  composeEnhancers(enhancers)
)

sagaMiddleware.run(rootSaga)
