import {} from 'redux'
import { wrapStore } from 'react-chrome-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { PORT_NAME } from 'common/constants'
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
