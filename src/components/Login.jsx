import React from 'react';

import { useContext } from 'react';
import TodoContext from '../context/TodoContext';

function Login() {
	const { username, setUsername, onLogin } = useContext(TodoContext);

	return (
		<div className='login'>
			<div className='form_group'>
				<input
					type='input'
					autoComplete='off'
					className='form_field'
					placeholder='Enter name.'
					name='newtodo'
					id='newtodo'
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					value={username}
				/>
				<label htmlFor='newtodo' className='form_label'>
					Your name...
				</label>
			</div>
			<div>
				<button className='button' onClick={onLogin}>
					Login
				</button>
			</div>
		</div>
	);
}

export default Login;
