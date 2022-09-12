import '../style/todoInput.css';

import { useContext } from 'react';
import TodoContext from '../context/TodoContext';

function AddTodo() {
	const { newTodo, onChange, onSubmit, onEdit, isEditing, editingTodoId } =
		useContext(TodoContext);

	return (
		<div className='addTodo'>
			<div className='form_group'>
				<input
					autoComplete='off'
					type='input'
					className='form_field'
					placeholder='What to do today ?'
					name='newtodo'
					id='newtodo'
					onChange={onChange}
					value={newTodo.content}
				/>
				<label htmlFor='newtodo' className='form_label'>
					What to do today ?
				</label>
			</div>
			<div>
				<button
					className='button'
					onClick={isEditing ? () => onEdit(editingTodoId) : onSubmit}>
					{isEditing ? 'Edit todo' : 'Add Todo'}
				</button>
			</div>
		</div>
	);
}

export default AddTodo;
