var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
	name					: 	String,
	type					: 	String,
	url		 				: 	String,
	createdAt				: 	Date,
	updateAt				: 	Date
});

module.exports = mongoose.model('File', fileSchema);