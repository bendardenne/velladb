var express = require('express')
var app = express();
var router = express.Router();

var routes = require('./routes.js');

app.use('/', routes);

app.use(function(req, res){
	 res.status(404);
	 res.render('error', {res : res, err_msg: "Not found"});
});


app.set('views', './views');
app.set('view engine', 'jade');

app.locals.pretty = true;
app.locals.api_url = 'http://vella.bendardenne.be/api'
app.locals.moment = require('moment');

app.listen(3001);
