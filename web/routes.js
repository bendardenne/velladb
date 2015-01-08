var app = require('./velladb-web.js');
var express = require('express'); 
var http = require('http');
var router = express.Router();

/* GETs */

router.get("/", function(req, res) {
	http.request({
		host: "localhost",
		path: "/api/stats",
		port: "3000"
	}, function(response) {
			var string = "";
			response.on("data", function(buffer) {
				string += buffer;
			});
			response.on("end", function() {
				if(response.statusCode == 200) {
					var json = JSON.parse(string);
					res.render('index', json);	
				} else {
					var json = {res: response, err_msg: string};
					res.render('error', json)
				}
			});
	}).end();
});

router.get("/submit", function(req, res) {
	res.render('submit');
});

router.get("/browse", function(req, res) {
	http.request({
		host: "localhost",
		path: "/api/1",
		port: "3000"
	}, function(response) {
			var string = "";
			response.on("data", function(buffer) {
				string += buffer;
			});
			response.on("end", function() {
				if(response.statusCode == 200) {
					var json = JSON.parse(string);
					res.render('browse', json);	
				} else {
					var json = {res: response, err_msg: string};
					res.render('error', json)
				}
			});
	}).end();
});

router.get("/view/:id", function(req, res) {
	http.request({
		host: "localhost",
		path: "/api/" + req.params.id,
		port: "3000"
	}, function(response) {
			var string = "";
			response.on("data", function(buffer) {
				string += buffer;
			});
			response.on("end", function() {
				if(response.statusCode == 200) {
					var json = JSON.parse(string);
					res.render('view', json);	
				} else {
					var json = {res: response, err_msg: string};
					res.render('error', json)
				}
			});
	}).end();
});

router.get("/latest/:limit?", function(req, res) {
	http.request({
		host: "localhost",
		path: "/api/latest?limit=" + (req.params.limit == null ? "10" : req.params.limit),
		port: "3000"
	}, function(response) {
			var string = "";
			response.on("data", function(buffer) {
				string += buffer;
			});
			response.on("end", function() {
				if(response.statusCode == 200) {
					var json = JSON.parse(string);
					res.render('latest', {vellisms: json});	
				} else {
					var json = {res: response, err_msg: string};
					res.render('error', json)
				}
			});
	}).end();
	
});

router.get("/random", function(req, res) {
	
	http.request({
		host: "localhost",
		path: "/api/random",
		port: "3000",
	}, function(response) {
			var string = "";
			response.on("data", function(buffer) {
				string += buffer;
			});
			response.on("end", function() {
				var json = JSON.parse(string);
				res.render('random', json);	
			});
	}).end();
});


module.exports = router;