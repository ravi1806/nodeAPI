var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config'); //This take the index.js file in config foler
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');


var port = process.env.PORT || 3000;


/* We use assets as path name, express.static is a middleware*/
app.use('/assets', express.static(__dirname+ '/public'));

//set up ejs
app.set('view engline', 'ejs');

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);
app.listen(port);