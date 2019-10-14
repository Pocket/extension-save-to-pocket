import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { outgoingMiddleware } from './middleware'

// import { localizeReducer } from 'react-localize-redux'

/* IMPORT CONTAINER STATES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
import { saveReducers } from 'containers/save.state'
import { saveSagas } from 'containers/save.state'

import { tagsReducers } from 'containers/tags.state'
import { tagsSagas } from 'containers/tags.state'

import { recReducers } from 'containers/recs.state'
import { recSagas } from 'containers/recs.state'
// import { appSagas } from 'containers/webkit/app.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = () =>
  combineReducers({
    saves: saveReducers,
    tags: tagsReducers,
    recs: recReducers
    // localize: localizeReducer,
    // app: appReducers
  })

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([...saveSagas, ...tagsSagas, ...recSagas])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers = compose
const enhancers = applyMiddleware(outgoingMiddleware, sagaMiddleware)

/** PERSISTED STATE
--------------------------------------------------------------- */
const initialState = {}

export const store = createStore(
  rootReducer(),
  initialState,
  composeEnhancers(enhancers)
)

sagaMiddleware.run(rootSaga)
