// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/lists/:listId/todos', async (req, res) => {
  const { listId } = req.params;

  try {
    // Check if the todo list exists
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found with id {todoList}' });
    }

    // Create a new todo associated with the todo list
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      todoList: todoList._id
    });

    // Save the todo
    await todo.save();

    // Add the todo to the todo list's todos array
    todoList.todos.push(todo);
    await todoList.save();

    // Return the created todo
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
