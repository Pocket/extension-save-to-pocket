import { wrapStore } from 'react-chrome-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { PORT_NAME } from '../Common/constants'
import rootSaga from './combineSagas'
import rootReducer from './combineReducers'

export const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = compose(applyMiddleware(sagaMiddleware))
  const store = createStore(rootReducer, {}, enhancers)

  wrapStore(store, { portName: PORT_NAME })

  sagaMiddleware.run(rootSaga)

  return store
}
