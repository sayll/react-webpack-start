import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Link} from 'react-router';
import Slider from './components/slider/slider'
class T extends React.Component {
  render() {
    return (
      <div>
        <Link to='t1' >1</Link>
        <br/>
        <Link to='t2'>2</Link>
        {this.props.children}
      </div>
    );
  }
}
let T1 = () => (
  <div>t1`</div>
);
let T2 = () => (
  <div>t2`</div>
);
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={T}>
      <Route path='/t1' component={T1}/>
      <Route path='/t2' component={T2}/>
    </Route>
  </Router>,
  document.getElementById('body')
);
