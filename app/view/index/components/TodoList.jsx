import React, { PropTypes } from 'react';
import Todo from './Todo';

export default function TodoList({ onTodoClick, todos }) {
  return (
    /* eslint comma-dangle: 0, arrow-parens: 0,*/
    <ul>
      {todos.map((todo) =>
        <Todo
          {...todo}
          key={todo.id}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  );
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
};
