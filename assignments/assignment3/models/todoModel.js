// models/todoModel.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  s_id:Number,
  title: String,
  description: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
