import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/todos"


export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  axios.defaults.baseURL = "http://localhost:3000";

  useEffect(() => {
    fetchCsrfToken();
    fetchTodos();
  }, []);

  const fetchCsrfToken = async () => {
    const response = await axios.get("/csrf_token");
    const csrfToken = response.csrf_token;
    if (csrfToken) {
      axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
      axios.defaults.withCredentials = true; 
    }

  };

  

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(API_URL, { description: newTodo, completed: false });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { completed: !completed });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center p-2 border-b">
            <span
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              {todo.description}
            </span>
            <button className="bg-red-500 text-white px-2 py-1" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
