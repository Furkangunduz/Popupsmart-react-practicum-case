import '../style/switchbutton.css';

function ThemeSwitch({ changeTheme, theme }) {
	return (
		<div className='theme-switch-wrapper'>
			<label className='theme-switch' htmlFor='checkbox'>
				<input
					type='checkbox'
					id='checkbox'
					checked={theme == 'dark'}
					onChange={changeTheme}
				/>
				<div className='slider round'></div>
			</label>
			<p>{theme == 'dark' ? 'Dark Mode' : 'Light mode'}</p>
		</div>
	);
}

export default ThemeSwitch;
