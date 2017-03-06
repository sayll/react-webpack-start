import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';
import { Slider } from './components/Slider';

class T extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.node
    };
  }

  static defaultProps() {
    return {
      children: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link to="t1">1</Link>
        <br />
        {this.props.children}
        <Link to="t2">2</Link>
      </div >
    );
  }
}

const T1 = () => (
  <div>
    t1`
    <Slider namm="ken" />
  </div>
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
