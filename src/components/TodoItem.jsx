import deleteIcon from '../images/delete.svg';
import editIcon from '../images/edit.svg';

function TodoItem({ todo, onDelete, toggleCompleted }) {
	return (
		<li className={`todo-item ${todo.isCompleted ? 'completed-todo' : ''}`}>
			<div>
				<p>{todo.content}</p>
			</div>
			<div className='todo-actions'>
				<img
					src={deleteIcon}
					width='30px'
					alt='delete'
					onClick={() => {
						onDelete(todo.id);
					}}
				/>
				<img src={editIcon} width='30px' alt='edit' />
				<input
					type='checkbox'
					checked={todo.isCompleted}
					onChange={(e) => toggleCompleted(e.target.checked, todo)}
				/>
			</div>
		</li>
	);
}
export default TodoItem;
