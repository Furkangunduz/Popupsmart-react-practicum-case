import Exit from '../images/exit.svg';

function Header({ username, onLeave }) {
	return (
		<header>
			<div>
				<h1>Todo-App</h1>
			</div>
			<div style={{ display: 'flex', gap: '20px' }}>
				<div className='user-name'>
					<p>{username}</p>
				</div>
				<div className='leave' onClick={onLeave}>
					<img src={Exit} width='35px' alt='exit ıcon' />
				</div>
			</div>
		</header>
	);
}

export default Header;
