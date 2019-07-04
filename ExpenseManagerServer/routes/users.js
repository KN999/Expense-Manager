var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', function(req, res, next) {
  var username = req.body["username"];
  var password = req.body.password;
  console.log("Request Body: "+ req.body + username);

  if(password === "password") {
    res.send('Sign-in successful.'+"username is "+req.body+"password is "+password);
  }
  else {
    res.send('Sorry, wrong password!')
  }
});

router.post('/signup', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
