import '../style/switchbutton.css';
import { useContext } from 'react';

import ThemeContext from '../context/ThemeContext';

function ThemeSwitch() {
	const { changeTheme, theme } = useContext(ThemeContext);
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
