import classes from './TodoItem.module.css';

export default function TodoItem({
  title,
  completed,
  onDelete,
  onChecked,
  onEdit,
}) {
  return (
    <div className={classes.todo}>
      <div className={classes.name}>
        <p className={classes.title}>{title}</p>
        <div className={classes.completed}>
          <label>Completed</label>
          {completed ? (
            <input
              type='checkbox'
              defaultChecked
              onChange={onChecked}
              className={classes.checkbox}
            />
          ) : (
            <input
              type='checkbox'
              onChange={onChecked}
              className={classes.checkbox}
            />
          )}
        </div>
      </div>
      <div>
        <button onClick={onEdit} className={classes.buttonEdit}>
          Edit
        </button>
        <button onClick={onDelete} className={classes.buttonDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
