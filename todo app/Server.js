const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Data file path
const todosFilePath = path.join(__dirname, 'todos.json');

// Initialize todos.json if it doesn't exist
if (!fs.existsSync(todosFilePath)) {
    fs.writeFileSync(todosFilePath, JSON.stringify([]));
}

// Get all todos
app.get('/api/todos', (req, res) => {
    try {
        const todos = JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read todos' });
    }
});

// Add a new todo
app.post('/api/todos', (req, res) => {
    try {
        const todos = JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
        const newTodo = {
            id: Date.now().toString(),
            text: req.body.text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        todos.push(newTodo);
        fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// Toggle todo completion status
app.put('/api/todos/:id', (req, res) => {
    try {
        let todos = JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
        const todoIndex = todos.findIndex(todo => todo.id === req.params.id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todos[todoIndex].completed = !todos[todoIndex].completed;
        fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
        res.json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    try {
        let todos = JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
        todos = todos.filter(todo => todo.id !== req.params.id);
        fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});