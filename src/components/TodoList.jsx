import TodoItem from './TodoItem';

import classes from './TodoList.module.css';

export default function TodoList({
  todos,
  onDelete,
  onChecked,
  onEdit,
}) {
  return (
    <ul className={classes.todos}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            title={todo.title}
            completed={todo.completed}
            onDelete={() => onDelete(todo.id)}
            onChecked={() => onChecked(todo.id)}
            onEdit={() => onEdit(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
}
