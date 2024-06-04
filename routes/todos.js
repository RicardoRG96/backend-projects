var express = require('express');
const { requestAll, requestOne } = require('../db/requests');
var router = express.Router();

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

module.exports = router;
