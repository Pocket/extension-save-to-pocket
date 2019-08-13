import { composeWithDevTools } from 'remote-redux-devtools'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { PORT_NAME } from '../common/constants'
import rootSaga from './combineSagas'
import rootReducer from './combineReducers'

const composeEnhancers = composeWithDevTools({ port: 8000 })

export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware))
  const store = createStore(rootReducer, {}, enhancers)

  sagaMiddleware.run(rootSaga)

  return store
}
