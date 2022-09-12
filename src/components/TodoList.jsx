import TodoItem from './TodoItem';
import { useContext } from 'react';
import TodoContext from '../context/TodoContext';

function TodoList() {
	const { todos, deleteAllTodos } = useContext(TodoContext);
	return (
		<>
			{todos.length > 0 && (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-start',
						marginTop: '15px',
					}}>
					<button onClick={deleteAllTodos} className='button'>
						Delete all
					</button>
				</div>
			)}
			<ul className='todo-list-container'>
				{todos.length > 0 &&
					todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
			</ul>
		</>
	);
}

export default TodoList;
