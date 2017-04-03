//create the data seeed


var Todos = require('../models/todomodel');

module.exports = function(app) {
  app.get('/api/setupTodos', function(req,res) {
    //seed databse
    var starterTodos = [
      {
        userName: 'test',
        todo: 'Buy milk',
        isDone: false,
        hasAttachment: false
      },
      {
        userName: 'test',
        todo: 'Feed dog',
        isDone: false,
        hasAttachment: false
      },
      {
        userName: 'test',
        todo: 'Learn node',
        isDone: true,
        hasAttachment: false
      }
    ];
    
    //Todos is a mongoose created model so it will have some methods attached to it
    
    Todos.create(starterTodos, function(err,results) {
      res.send(results);
    });
  
  });
  
  
};