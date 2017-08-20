import { getQuery } from '@utils'
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import loggerMiddleware from 'redux-logger'
import rootReducer from '../reducers'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = [promiseMiddleware]

// 测试模式 开启日志
if (getQuery('env')) {
  middleware.push(loggerMiddleware)
}

// HMR with Redux
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  if (process.env === 'development' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }
  return store
}
