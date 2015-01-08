var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var validators = require('mongoose-validators');
var shortid = require('mongoose-shortkey');

shortid.init(mongoose.connection);

function arrayNotEmpty(array) {
   return array.length > 0;   
}

var Vellism = new mongoose.Schema({
   date: {type: Date, default: Date.now, required: true},
   text: {type: [String], validate: arrayNotEmpty},
   url: {type: String, required: true, validate: validators.isURL, unique:true},
   youtube: {type: String, validate: validators.isURL},
   imageUrl: {type: String, validate: validators.isURL()}
});

Vellism.plugin(random);
Vellism.plugin(shortid.plugin, {category : 'Vellism'});

module.exports = mongoose.model('Vellism', Vellism)
