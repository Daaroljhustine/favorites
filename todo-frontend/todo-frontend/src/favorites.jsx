import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    // Fetch Todos
    useEffect(() => {
        axios.get('http://localhost:4000/todos')
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    }, []);

    // Add Todo
    const addTodo = () => {
        if (text.trim() === '') return;
        axios.post('http://localhost:4000/todos', { text })
            .then(res => {
                setTodos([...todos, res.data]);
                setText('');
            })
            .catch(err => console.error(err));
    };

    // Update Todo
    const toggleComplete = (id) => {
        const todo = todos.find(t => t.id === id);
        axios.put(`http://localhost:4000/todos/${id}`, { completed: !todo.completed })
            .then(res => {
                setTodos(todos.map(t => (t.id === id ? res.data : t)));
            })
            .catch(err => console.error(err));
    };

    // Delete Todo
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:4000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(t => t.id !== id));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">ADD YOUR FAVORITES</h1>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new favorites"
                    className="border p-2 flex-grow"
                />
                <button onClick={addTodo} className="bg-green-500 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <span
                            onClick={() => toggleComplete(todo.id)}
                            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
