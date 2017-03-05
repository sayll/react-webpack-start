import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';
// import Slider from './components/slider/slider'


function T(props) {
  return (
    <div>
      <Link to="t1">1</Link>
      <br />
      {props.children}
      <Link to="t2">2</Link>
    </div >
  );
}

T.defaultProps = {
  children: null,
};

T.propTypes = {
  children: React.PropTypes.node
};

const T1 = () => (
  <div>t1`</div>
);

const T2 = () => (
  <div>t2`</div>
);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={T}>
      <Route path="/t1" component={T1} />
      <Route path="/t2" component={T2} />
    </Route>
  </Router>,
  /* global document:false */
  /* eslint comma-dangle: 0 */
  document.getElementById('body')
);
