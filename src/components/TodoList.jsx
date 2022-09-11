import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, deleteAllTodos, toggleCompleted, chooseTodoForEdit }) {
	return (
		<ul className='todo-list-container'>
			{todos.length > 0 && (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-start',
						marginBottom: '10px',
					}}>
					<button onClick={deleteAllTodos} className='button'>
						Delete all
					</button>
				</div>
			)}

			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onDelete={onDelete}
					toggleCompleted={toggleCompleted}
					chooseTodoForEdit={chooseTodoForEdit}
				/>
			))}
		</ul>
	);
}

export default TodoList;
