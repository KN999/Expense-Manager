var express = require('express');
var router = express.Router();
//var app = express();

/*app.post('/route', function(req, res) {
  var post = req.body;
  console.log("Message Recieved");
  res.send("sending some messages");
});*/

/* GET home page. */
router.post('/post', function(req, res) {
  var user_id = req.body.id;
  var token = req.body.token;
  var geo = req.body.geo;
  console.log("POST request : " + user_id +" "+ token +" "+ geo)
  res.send(user_id + ' ' + token + ' ' + geo);
});


router.get('/', function(req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');  
  console.log("GET request was made")
  res.send(user_id + ' ' + token + ' ' + geo);
});
module.exports = router;
