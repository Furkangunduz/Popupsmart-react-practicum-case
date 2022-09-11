import '../style/todoInput.css';

function AddTodo({ value, onChange, onSubmit }) {
	return (
		<div className='addTodo'>
			<div className='form_group'>
				<input
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
				<button className='submit_button' onClick={onSubmit}>
					Add Todo
				</button>
			</div>
		</div>
	);
}

export default AddTodo;
