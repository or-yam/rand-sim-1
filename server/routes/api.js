const express = require('express');
const router = express.Router();

let todos = [];
let id = 1;

router.get('/todos', function (req, res) {
  res.send(todos);
});

router.post('/todo', function (req, res) {
  const text = req.body.text;
  const newTodo = { id: id++, text: text, complete: false };

  todos.push(newTodo);
  res.send(todos);
});

router.put('/todo/:todoID', function (req, res) {
  const todoID = req.params.todoID;
  let status = todos.find((t) => t.id == todoID).completed;
  if (status) {
    todos.find((t) => t.id == todoID).completed = false;
  } else {
    todos.find((t) => t.id == todoID).completed = true;
  }

  res.send(todos);
});

router.delete('/todo/:todoID', function (req, res) {
  const todoID = req.params.todoID;
  for (const task of todos) {
    if (task.id == todoID) {
      todos.splice(todos.indexOf(task), 1);
    }
  }
  res.send(todos);
});

module.exports = router;
