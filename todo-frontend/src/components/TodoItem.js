export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li className="flex justify-between items-center p-2 border-b">
            <span
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => toggleTodo(todo.id, todo.completed)}
            >
                {todo.description}
            </span>
            <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}