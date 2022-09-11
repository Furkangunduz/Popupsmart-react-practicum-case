import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, toggleCompleted, chooseTodoForEdit }) {
	return (
		<ul className='todo-list-container'>
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
