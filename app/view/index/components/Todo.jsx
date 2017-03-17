import React, { PropTypes } from 'react';

export default function Todo({ onClick, text, completed }) {
  return (
    <li
      style={{
        textDecoration: completed ? 'line-through' : 'none',
        cursor: completed ? 'default' : 'pointer',
      }}
    >
      {text}
      <button onClick={onClick}>
        勾选
      </button>
    </li>
  );
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
