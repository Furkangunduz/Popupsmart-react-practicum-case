import '../style/todoInput.css';

function AddTodo({ value, onChange, onSubmit, onEdit, isEditing, editingTodoId }) {
	return (
		<div className='addTodo'>
			<div className='form_group'>
				<input
					autocomplete='off'
					type='input'
					className='form_field'
					placeholder='What to do today ?'
					name='newtodo'
					id='newtodo'
					onChange={onChange}
					value={value}
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
