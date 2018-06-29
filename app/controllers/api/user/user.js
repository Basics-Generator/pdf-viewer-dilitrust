var User  						= require('../../../models/user/user'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

var randomstring    			= require("randomstring");
var validator       			= require("email-validator");
var bcrypt          			= require('bcrypt');
var fs 							= require('fs');
var path 						= require('path');

const saltRounds    			= 10;

////////////////////////////////////////////////////////////
////////////       POST CREATE USER             ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {
	console.log(req.body);
	if (req.body.username == undefined || req.body.password == undefined || req.body.email == undefined ) {
		return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Missing parameters');
	}

	if (req.body.username == "" || req.body.password == "" || req.body.email == "") {
		return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Empty parameters');
	}

	User.findOne({username: req.body.username}).exec(function(err, user){
		if (err) throw err;
		if (user) { return ResponseGenerator.getInstance().generate(res, "CREATE USER", 409, 'Username already exist'); }
		User.findOne({email: req.body.email}).exec(function(err, user){
			if (err) throw err;
			if (user) { return ResponseGenerator.getInstance().generate(res, "CREATE USER", 409, 'Email already exist'); }
			if (validator.validate(req.body.email)){
	        if (req.body.password.length > 6){
	                createUser(req, res, function(res) {
	                	return ResponseGenerator.getInstance().generate(res, "CREATE USER", 201, 'User created successfully')
					});
	            }
	            else {
	                return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid Password (lenght need to be greater than 6)')
	            }
	        }
	        else {
	            return ResponseGenerator.getInstance().generate(res, "CREATE USER", 400, 'Invalid email')
	        }
		});
	});
}

function createUser(req, res, successCallback) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if (err) throw err;
        var refreshToken = randomstring.generate(32);
		if (err) throw err;
		var newU = new User({
			username				: req.body.username,
			password				: hash,
			email					: req.body.email,
			refreshToken			: refreshToken,
			createdAt				: Date(),
			updateAt				: Date(),
			enabled					: true,
			sessionsAuth			: null,
			sessionsChangePassword	: null
		});	

		newU.save(function(err) {
			if (err) throw err;
			successCallback(res);
		});
	});
}

exports.profile = function(req, res) {
	return res.status(200).send({ endpoint: "GET PROFILE", message: "Get user profile successfully", user:req.user });
}