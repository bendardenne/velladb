var app = require('./velladb-api.js');
var Vellism = require('./models/Vellism.js');
var express = require('express'); 
var router = express.Router();

/* GETs */

router.get("/latest", function(req, res){
	var limit = req.query.limit || 5; // : req.query.limit;
	Vellism.find().limit(limit).sort({date : -1}).exec(function(err, result) {
		if(err)
			return res.status(500).send("An error occured.");
		res.send(result);
   });
});

router.get("/random", function(req, res){
   Vellism.findOneRandom(function(err, result) {
      if(err)
         return res.status(500).send("An error occured.");
      res.send(result);
   });
});

router.get("/prev/:sid", function(req, res){
	var limit = req.query.limit || 1;
   Vellism.findOne({sid: req.params.sid}, function(err, result) {
      if(result == undefined)
         return res.status(404).send("Invalid id.");
      if(err)
         return res.status(500).send("An error occured.");

		Vellism.find({_id: {$lt: result._id}}).sort({_id:-1}).limit(limit).exec(function(err, result) {
			res.send(result);	
		});
   });
});

router.get("/next/:sid", function(req, res){
	var limit = req.query.limit || 1;
	Vellism.findOne({sid: req.params.sid}, function(err, result) {
      if(result == undefined)
         return res.status(404).send("Invalid id.");
      if(err)
         return res.status(500).send("An error occured.");
		
		Vellism.find({_id: {$gt: result._id}}).sort({_id:1}).limit(limit).exec(function(err, result) {
			res.send(result);	
		});
   });
});

router.get("/stats", function(req, res){
   Vellism.count(function(err, result) {
      if(err)
         return res.status(500).send("An error occured.");
      res.send({count: result});
   });
});


router.get("/:sid", function(req, res){
   Vellism.findOne({sid: req.params.sid}, function(err, result) {
      if(result == undefined)
         return res.status(404).send("Invalid id.");
      if(err)
         return res.status(500).send("An error occured.");
      res.send(result);
   });
});

/* POST */

router.post("/post", function(req, res) {

	/* Remove empty fields to allow sumbiting empty values 
	 * for optional fields */

	for(var k in req.body) {
		if(req.body[k] == '')
			delete req.body[k];
	}
   var v = new Vellism(req.body)
   v.save(function(err) {
      if(err)  {
			console.log(err);
			if(err.code == 11000)
	         return res.status(400).send("Duplicate Entry detected: " + req.body.url);
			
			return res.status(400).send(err);
		}
          
      res.send("Vellism successfully saved.");
   }); 
});

/* DELETE */

/* router.delete("/:sid", function(req, res){
   Vellism.remove({sid : req.params.sid}, function(err, result){
      if(result == 0)
         return res.status(404).send("Invalid id.");
      if(err)
         return res.status(500).send("An error occured.");
			res.send("Successfully deleted vellism " + req.params.sid);
   })
}); */

module.exports = router;
