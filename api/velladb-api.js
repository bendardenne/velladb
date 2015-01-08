var express = require('express')
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var routes = require('./routes.js');
var Vellism = require('./models/Vellism.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/vella');
   
app.listen(3000);
