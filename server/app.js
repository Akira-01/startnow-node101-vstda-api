var express =    require('express');
var morgan =     require('morgan');
var bodyParser = require('body-parser');
var app =        express();

app.use(bodyParser.json());

var todos = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  
  }
];

app.get('/', function (req, res) {
    var obj = {'msg':'ok'};
    res.status(200).json(obj);
});

app.get('/api/TodoItems', function (req, res) {
  res.json(todos); 
});

app.get('/api/TodoItems/:id', function (req, res) {
 res.json(
    todos.find(function(item) {
      return item.todoItemId == req.params.id;
    })
  );
});

app.post('/api/TodoItems' , function (req, res){
    todos.push(req.body);
    res.status(201).json(
      todos.find(function(item) {
        return item.todoItemId == req.body.todoItemId;
      })
    );
});

app.delete('/api/TodoItems/:number' , function (req, res){
  var obj = todos.splice(req.params.number, 1)[0];
  res.json(obj);
});

module.exports = app;
