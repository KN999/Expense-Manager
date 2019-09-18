var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.send("pong")
})

router.post("/login", function(req, res) {
    var user = {
        mobileno : req.body.mobile,
        password : req.body.password,
    };

    console.log(user);
    res.send("Login Successfully!");
});

router.post("/register", function(req,res) {
    var registerUser = {
        name : req.body.name,
        mobileno : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        currency : req.body.currency,
    };

    console.log(registerUser);
    res.send("Registered Successfully");
})

router.post("/change", function(req, res) {
    var name = req.body.name;
    var value = req.body.value;

    // fetch the details of the current user logged in 
    // change the name field with value

    res.send("Successfully changed");
});
module.exports = router;