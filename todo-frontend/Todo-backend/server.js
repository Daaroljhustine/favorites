const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (for simplicity)
let todos = [];

// Routes
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTodo = { id: Date.now(), text: req.body.text, completed: false };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.text = text !== undefined ? text : todo.text;
        todo.completed = completed !== undefined ? completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.json({ message: 'Todo deleted' });
});

// Start Server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));