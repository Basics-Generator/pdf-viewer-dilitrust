var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username				: 	String,
	password				: 	String,
	email		 			: 	String,
	refreshToken			: 	String,
	createdAt				: 	Date,
	updateAt				: 	Date,
	enabled					: 	Boolean,
	sessionAuth 			: { type: mongoose.Schema.Types.ObjectId, ref: 'sessionAuth' }
});

module.exports = mongoose.model('User', userSchema);