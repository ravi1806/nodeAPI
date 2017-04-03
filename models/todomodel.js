var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({

    userName: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
  
});

var Todos = mongoose.model('Todos', todoSchema); //Made a mongoose model which will have some methods related to it.

module.exports = Todos;