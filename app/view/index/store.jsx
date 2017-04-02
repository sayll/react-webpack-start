import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import rootEpic from './epics';

const middleware = [createEpicMiddleware(rootEpic)];

if (process.env.NODE_ENV !== 'production') {
  //middleware.push(createLogger());
}

export default createStore(
  rootReducer,
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middleware))
);
