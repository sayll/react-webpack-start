import React, { PropTypes } from 'react';

export default function Todo({ onClick, text, completed }) {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
        cursor: completed ? 'default' : 'pointer',
      }}
    >
      {text}
    </li>
  );
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
