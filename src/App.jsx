import { useEffect, useState } from 'react';

import TodoList from './components/TodoList';
import classes from './App.module.css';

const db = JSON.parse(localStorage.getItem('todos'));

export default function App() {
  const [val, setVal] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showIncompleted, setShowIncompleted] = useState(false);

  useEffect(() => {
    const storedTodos = db;
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, title: val, completed: false },
    ]);
    setVal('');
  };

  const handleChange = (event) => {
    event.preventDefault();
    setVal(event.target.value);
  };

  const handleDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleComplete = (todoId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.completed = !todo.completed;
    setTodos([...todos]);
  };

  const handleEdit = (todoId) => {
    setIsEditing(true);
    setEditedTodoId(todoId);
    const todo = todos.find((todo) => todo.id === todoId);
    setEditedTitle(todo.title);
  };

  const handleEditChange = (event) => {
    event.preventDefault();
    setEditedTitle(event.target.value);
  };

  const handleEditSubmit = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editedTodoId) {
        return { ...todo, title: editedTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(false);
    setEditedTodoId(null);
    setEditedTitle('');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const completedTasks = todos.filter((todo) => todo.completed);
  const incompletedTasks = todos.filter((todo) => !todo.completed);

  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowIncompleted(false);
  };

  const handleShowIncompleted = () => {
    setShowCompleted(false);
    setShowIncompleted(true);
  };

  const handleShowAll = () => {
    setShowCompleted(false);
    setShowIncompleted(false);
  };

  return (
    <>
      <header className={classes.header}>
        <h1>Todo App</h1>
      </header>
      <main>
        <div className={classes.stats}>
          <div>Total Tasks: {todos.length}</div>
          <div>Completed Tasks: {completedTasks.length}</div>
        </div>
        <div className={classes.create}>
          <label className={classes.label}>Create new task</label>
          <input
            onChange={handleChange}
            value={val}
            type='text'
            className={classes.input}
          />
          <button className={classes.button} onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className={classes.filter}>
          <label>
            Show All
            <input
              type='checkbox'
              onChange={handleShowAll}
              checked={!showCompleted && !showIncompleted}
              className={classes.filterInput}
            />
          </label>
          <label>
            Show Completed
            <input
              type='checkbox'
              onChange={handleShowCompleted}
              checked={showCompleted}
              className={classes.filterInput}
            />
          </label>
          <label>
            Show Incompleted
            <input
              type='checkbox'
              onChange={handleShowIncompleted}
              checked={showIncompleted}
              className={classes.filterInput}
            />
          </label>
        </div>
        {isEditing && (
          <div className={classes.edit}>
            Edit Title:
            <input
              onChange={handleEditChange}
              value={editedTitle}
              className={classes.inputEdit}
            />
            <button onClick={handleEditSubmit} className={classes.buttonEdit}>
              Save
            </button>
            <button onClick={handleCancel} className={classes.buttonEdit}>
              Cancel
            </button>
          </div>
        )}
        <TodoList
          todos={
            showCompleted
              ? completedTasks
              : showIncompleted
              ? incompletedTasks
              : todos
          }
          onDelete={handleDelete}
          onChecked={handleComplete}
          onEdit={handleEdit}
        />
      </main>
    </>
  );
}
