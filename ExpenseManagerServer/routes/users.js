var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(JSON.stringify(req.body, undefined, 2))
  // console.log("Request Body: "+ req.body + username);

  if(password === "password") {
    res.send('Sign-in successful. '+"Username is "+username+" password is "+password);
  }
  else {
    res.send('Sorry, wrong password!')
  }
});

router.post('/signup', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
