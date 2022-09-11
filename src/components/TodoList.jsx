import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, toggleCompleted }) {
	return (
		<ul className='todo-list-container'>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onDelete={onDelete}
					toggleCompleted={toggleCompleted}
				/>
			))}
		</ul>
	);
}

export default TodoList;
