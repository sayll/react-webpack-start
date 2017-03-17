import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { todoApp } from './reducer/index';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './action';
import { Ta } from './components/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  todoApp,
  /* global window:false */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addTodo('ken'));
store.dispatch(addTodo('sayll'));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    /* global document:false */
    /* eslint comma-dangle: 0 */
    document.getElementById('root')
  );
};

render(Ta);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(Ta);
  });
}
