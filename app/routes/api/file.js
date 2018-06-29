var express                 = require('express');
var router                  = express.Router();

var file            		= require('../../controllers/api/file/file.js'); 
var utils            		= require('../../controllers/api/user/utils.js');

var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

router.post('/', multipartMiddleware, file.create); //CREATE FILE
router.get('/', utils.isAuth, file.all);  //GET FILES
router.get('/:id', utils.isAuth, file.details);  //GET FILE DETAILS

module.exports = router;