import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Ta } from './components/App';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    /* global document:false */
    /* eslint comma-dangle: 0 */
    document.getElementById('body')
  );
};

render(Ta);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(Ta);
  });
}
