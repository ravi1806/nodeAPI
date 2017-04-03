## NPM Installation

* `npm init`
* `npm install --save express`
* `npm install --save ejs`
* `npm isntall --save body-parser`
* `npm install --save mongoose`

## Initial boilerplate

* require express
* define `app = express();`
* define `port = process.env.PORT || 3000;`
* use a static middleware for static files eg. `app.use('/assets', express.static(__dirname+'/public'));` where in assets is an alias for the full directory path. Your static files are stored in the public folder.
* set up view engine eg. `app.set('view engine','ejs');`
* listen on the port -> `app.listen(port);`

## Set up the database

* Create a new sandbox db. Create a user with usname and pwd to connect with mongodb URI
* Make a config folder with a config.json with your credentials in json. Usually this needs to be encrypted.
* Make an index.js file and require that config.json file in it. Then export an object with a method(function) which returns the URI for db, using the credentials of the json file.(decrypt it). Let that property be `getDbConnectionString`.
* Make another folder called models and make a file called todomodel.js to create a schema(what the data looks like in the databse) for db.
  * Boilerplate for todomodel.js
    * require mongoose
    * define `var Schema = mongoose.Schema;`
    * define your dataSchema as 
    ```js
      var todoSchema = new Schema({
      userName: String,
      isDone: Boolean
      });
    ```
    * create a model using the mongoose.model method `mongoose.model('Todos', todoSchema)`
    * export this model from this todosmodel.js file eg. `module.exports = Todos;`
* Connect to db from the app.js
* require config in app.js, this will by defualt link to index.js file in the config folder
* in app.js use `mongoose.connect(config.getDbConnectionString());` to connect to mongoose db. config.getDb... because we required index.js file in the config folder to var config. So its that file's method.

## Seed the db (Add data for the first time)

* Create a new folder called controllers.
* Create a file called setupController.js
  * Boilerplate for setupController.js(Data seed)
    * require model from todomodel.js. eg. `var Todos = require('../models/todoModel');`
    * export a function that takes app(express app)
    * its going to add an endpoint(api/setupTodos) eg. 
    ```js
     app.get('api/setupTodos', function(req,res) { 
     //seed databse here
      var starterTodos = [
       {
        property: value;
       }
      ];
      //Our data model has create method do that, and in callback just output the results back to the browser
      
      Todos.create(starterTodos, function(err,results) { res.send(results);});
     });
    ```
* Now make the express app aware of this endpoint(api/setupTodos) so in app.js require this file
* In app.js call setupController(app) as it will return a function and we just need to call it.

## Create the API

* Require todos model
* Require bodyParser
* Export a function which takes app
* use bodyparser.json and bodyParser.urlencoded({extended: true}) for characters in the url which are converted
* create an end point by `app.get('/api/todos/:param,cbfunction(req,res){})` and in the callback use the method **find** on Todos to find the param. It will return everything related to that param.
* Make another end point eg. `app.get('/api/todo/:id',cbfunction(req,res){})` and in callback use the method **findById** on Todos model to find by id and then display it in res.send
* To add a new todo to db, or to update it use another entry point with post eg. `app.post('/api/todo', cbfunction(req,res){})` and in the callback check if its body has an id, if it has, only update it and dont create a new one by using a method **findByIdAndUpdate** on Todos else create a new one with all the properties mentioned and use **save** method on newTodo and save it to mongoDb.
* To delete create a new end point using `app.delete('/api/todo',cbfunc(req,res){})` and in the cb use method **findByIdAndRemove** method on Todos and delete by id.
* In app.js require this file and use it by sending app.