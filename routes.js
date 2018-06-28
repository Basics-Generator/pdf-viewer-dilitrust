var express                 = require('express');
var app                     = express();
var router                  = express.Router();

var home                 	= require("./app/routes/home");
var user                 	= require("./app/routes/api/user.js");
var device                 	= require("./app/routes/api/device.js");
var notification            = require("./app/routes/api/notification.js");
var comment            		= require("./app/routes/api/comment.js");

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

router.use("/", home);
router.use("/api/user", user);
router.use("/api/device", device);
router.use("/api/notification", notification);
router.use("/api/comment", comment);


module.exports = router;