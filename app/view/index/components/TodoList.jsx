import React, { PropTypes } from 'react';
import Todo from './Todo';

export default function TodoList({ onTodoClick, todos }) {
  return (
    <ul>
      {todos.map((todo) => {
        console.log(todo);
        return (
          <Todo
            {...todo}
            key={todo.id}
            onClick={() => onTodoClick(todo.id)}
          />
        );
      })}
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
