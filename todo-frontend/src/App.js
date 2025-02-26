import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


const API_URL = "http://localhost:3000/api/v1/todos"


export default function App() {
  const [todos, setTodos] = useState([]);

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

  const fetchTodos = async (description) => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (newTodo) => {
    console.log(newTodo);
    try {
      const response = await axios.post(API_URL, { description: newTodo, completed: false });
      setTodos([...todos, response.data]);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}
