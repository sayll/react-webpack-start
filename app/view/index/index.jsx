import '../../source/css/index.pcss';
import React from 'react';
import ReactDOM from 'react-dom';
import data from './data/test.json';
console.log(data);
class Slider extends React.Component {
  render() {
    return (
      <div>
        <h1>your name is {this.props.name}</h1>
        <button>23</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Slider name="test"/>,
  document.getElementById('body')
);
