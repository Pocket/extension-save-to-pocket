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

import { setupReducers } from 'Containers/Background/setup.state'
import { setupSagas } from 'Containers/Background/setup.state'

import { tabSagas } from 'Containers/Background/tab.state'
import { tabReducers } from 'Containers/Background/tab.state'

import { saveSagas } from 'Containers/Save/save.state'
import { saveReducers } from 'Containers/Save/save.state'

import { taggingSagas } from 'Containers/Save/Toolbar/Tagging/tagging.state'
import { taggingReducers } from 'Containers/Save/Toolbar/Tagging/tagging.state'

import { recommendationReducers } from 'Containers/Save/Recommendations/recs.state'
import { recommendationSagas } from 'Containers/Save/Recommendations/recs.state'

/* REDUCERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const rootReducer = combineReducers({
  settings: setupReducers,
  tab: tabReducers,
  saves: saveReducers,
  tags: taggingReducers,
  recommendations: recommendationReducers
})

/* SAGAS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const sagaMiddleware = createSagaMiddleware()
function* rootSaga() {
  yield all([
    ...authSagas,
    ...setupSagas,
    ...tabSagas,
    ...saveSagas,
    ...taggingSagas,
    ...recommendationSagas
  ])
}

/* STORE
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const composeEnhancers = composeWithDevTools({
  port: 8000,
  actionsBlacklist: [
    'ACTIVE_WINDOW_CHANGED',
    'UPDATE_ACTIVE_TAB',
    'ACTIVE_TAB_CHANGED'
  ]
})

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware))
export const store = createStore(rootReducer, {}, enhancers)

wrapStore(store, { portName: PORT_NAME })
sagaMiddleware.run(rootSaga)
