import {createStore,applyMiddleware} from 'redux'

import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'

import sagas from './sagas'


const sagaMiddleware = createSagaMiddleware()


const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

store.runSaga = sagaMiddleware.run
const ROOTSAGA = sagas
ROOTSAGA.map(saga=>store.runSaga(saga))

export default store