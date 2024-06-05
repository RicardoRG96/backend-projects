var express = require('express');
const { requestAll, requestOne, create, update, deleteItem } = require('../db/requests');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET users listing. */

router.get('/', function(req, res, next) {
  requestAll('todos', (err, todos) => {
    if (err) {
      return next(err);
    }
    console.log(todos);
    res.send(todos);
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  requestOne('todos', id, (err, todo) => {
    if (err) {
      return next(err);
    }
    console.log(todo);
    res.send(todo);
  });
});

router.post('/',
  body('todo_name').isLength({ min: 5 }),
  body('todo_status').not().isEmpty(), 
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nextTodo = req.body;
    create('todos', nextTodo, (err, item) => {
      if (err) {
        return next(err);
      }
      res.send(nextTodo);
    });
});

router.put('/:id',
  body('todo_name').isLength({ min: 5 }),
  body('todo_status').not().isEmpty(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array});
    }

    const id = req.params.id;
    const body = req.body;
    if (body.id !== +id) {
      return res.sendStatus(409);
    }
    requestOne('todos', id, (err, todo) => {
      if (err) {
        return next(err);
      }
      if (!todo.length) {
        return res.sendStatus(404);
      }
      update('todos', id, body, (err, updated) => {
        if (err) {
          return next(err);
        }
        res.send(updated);
      });
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  requestOne('todos', id, (err, todo) => {
    if (err) {
      return next(err);
    }
    if (!todo.length) {
      return res.sendStatus(404);
    }
    deleteItem('todos', id, (err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;
