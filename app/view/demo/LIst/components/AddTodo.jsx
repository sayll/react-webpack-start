import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {
  handleClick(e) {
    e.preventDefault();
    const node = this.input;
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" ref={(e) => { this.input = e; }} />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};
