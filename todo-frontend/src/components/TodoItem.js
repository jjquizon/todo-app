export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li className="flex justify-between items-center p-3 border-b last:border-none hover:bg-gray-100 transition">
            <span
                className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                onClick={() => toggleTodo(todo.id, todo.completed)}
            >
                {todo.description}
            </span>
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}