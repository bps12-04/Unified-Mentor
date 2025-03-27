// DOM Elements
const newTodoInput = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const itemsLeftSpan = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');

// Current filter
let currentFilter = 'all';

// Fetch todos from the server
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Add a new todo
async function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) return;

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            newTodoInput.value = '';
            fetchTodos();
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

// Toggle todo completion status
async function toggleTodoStatus(id) {
    try {
        await fetch(`/api/todos/${id}`, {
            method: 'PUT'
        });
        fetchTodos();
    } catch (error) {
        console.error('Error toggling todo status:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        fetchTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Clear all completed todos
async function clearCompleted() {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    const completedTodos = todos.filter(todo => todo.completed);

    for (const todo of completedTodos) {
        await deleteTodo(todo.id);
    }
}

// Render todos based on current filter
function renderTodos(todos) {
    // Filter todos
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    // Clear the list
    todoList.innerHTML = '';

    // Show empty state if no todos
    if (filteredTodos.length === 0) {
        const emptyState = document.createElement('li');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No tasks found';
        todoList.appendChild(emptyState);
    } else {
        // Render each todo
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'todo-item completed' : 'todo-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodoStatus(todo.id));

            const text = document.createElement('span');
            text.className = 'todo-text';
            text.textContent = todo.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    // Update items left count
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeftSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        fetchTodos();
    });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initial load
document.addEventListener('DOMContentLoaded', fetchTodos);