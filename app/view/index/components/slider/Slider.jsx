import React from 'react';

let style = {
  color: 'red',
};

let names = ['t1', 't2', 't3'];

class Slider extends React.Component {

  handleChange(){
    console.log(this.refs);
  }

  render() {
    let c = names.map((val, key) => {
      return <p key={`name_${key}`}>name:{val}</p>;
    });
    return (
      <div>
        <div style={style}> test {this.props.name}</div>
        {c}
        <button ref='bt' onClick={this.handleChange.bind(this)}>点我</button>
      </div>
    );
  }
}

Slider.defaultProps = {
  name: 'sd',
};
Slider.propTypes = {
  name: React.PropTypes.string,
};

export default Slider;