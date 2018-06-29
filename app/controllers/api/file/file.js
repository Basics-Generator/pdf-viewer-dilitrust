var File  						= require('../../../models/file/file'); // get our mongoose model
var ResponseGenerator       	= require('../../../helper/ResponseGenerator'); // get our mongoose model

var randomstring    			= require("randomstring");
var fs 							= require('fs');
var path 						= require('path');

////////////////////////////////////////////////////////////
////////////       POST CREATE FILE             ////////////
//////////////////////////////////////////////////////////// 
exports.create = function(req, res) {
	if (req.body.name == undefined || req.files.file == undefined) {
		return ResponseGenerator.getInstance().generate(res, "UPLOAD FILE", 400, 'Missing parameters');
	}
	if (req.body.name == "") {
		return ResponseGenerator.getInstance().generate(res, "UPLOAD FILE", 400, 'Empty parameters');
	}

	fs.readFile(req.files.file.path, function (err, data_file) {
		if (err) throw err;
        var generated_file_name = randomstring.generate(32);
        var type = path.extname(req.files.file.path);
		var file_path = __dirname + "/../../../../public/uploads/file/" + generated_file_name + type;
		fs.writeFile(file_path, data_file, function (err) {
			if (err) throw err;
			var newF = new File({
				name					: req.body.name,
				type					: type,
				url						: "/uploads/file/" + generated_file_name + type,
				createdAt				: Date(),
				updateAt				: Date(),
			});
			newF.save(function(err) {
				if (err) throw err;	
				return res.status(200).send({ endpoint: "UPLOAD FILE", message: "Upload file successfully", file:newF });
			});
		});
	});
}


////////////////////////////////////////////////////////////
////////////          GET Details File          ////////////
//////////////////////////////////////////////////////////// 
exports.all = function(req, res) {
	File.find({}).exec(function(err, files) {
	    if (err) throw err;
	    return res.status(200).send({ endpoint: "GET FILES", message: "Get files successfully", files:files });
	});
}

////////////////////////////////////////////////////////////
////////////          GET Details File          ////////////
//////////////////////////////////////////////////////////// 
exports.details = function(req, res) {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  	File.findOne({_id : req.params.id}).exec(function(err, file) {
        if (err) throw err;
        if (file == null) { return ResponseGenerator.getInstance().generate(res, "GET DETAILS FILE", 404, 'File doesn\'t exist'); }
        return res.status(200).send({ endpoint: "GET DETAILS FILE", message: "Get file details successfully", file:file });
    });
  }
  else {
  	return ResponseGenerator.getInstance().generate(res, "GET DETAILS FILE", 404, 'File doesn\'t exist');
  }
}