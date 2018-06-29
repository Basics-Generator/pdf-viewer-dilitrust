var express                 = require('express');
var app                     = express();
var router                  = express.Router();

var utils           		= require('./app/controllers/api/user/utils.js');

var home                 	= require("./app/routes/home");
var user                 	= require("./app/routes/api/user.js");
var file                 	= require("./app/routes/api/file.js");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.use("/", home);
router.use("/api/user", user);
router.use("/api/file", file);
router.use(utils.isAuth, express.static(__dirname + '/public'));


module.exports = router;