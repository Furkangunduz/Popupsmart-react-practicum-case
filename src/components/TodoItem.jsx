import deleteIcon from '../images/delete.svg';
import editIcon from '../images/edit.svg';

function TodoItem({ todo, onDelete }) {
	return (
		<li className='todo-item'>
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
			</div>
		</li>
	);
}
export default TodoItem;
