import React from 'react';

function Login({ username, setUsername, onLogin }) {
	return (
		<div className='login'>
			<div className='form_group'>
				<input
					type='input'
					autocomplete='off'
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
