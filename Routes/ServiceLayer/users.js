var express = require("express");
var router = express.Router();

var DatabaseClient = require('../DatabaseLayer/users');

router.get("/", function (req, res) {
    res.send("pong")
})

router.post("/login", function(req, res) {
    var user = {
        mobileno : req.body.mobile,
        password : req.body.password,
    };

    DatabaseClient.ValidateUser(user, (result) => {
        res.send(result);
    });

    console.log(user);
});

router.post("/register", function(req,res) {
    var registerUser = {
        name : req.body.name,
        mobileno : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        currency : req.body.currency,
        image : req.body.image, 
        transactions : [],
    };

    DatabaseClient.CheckMobile(registerUser.mobileno, (result) => {
        if (result.code === 302) { // Username is available
            DatabaseClient.RegisterUser(registerUser, (result) => {
                res.send(result);
            });
        }
        else {
            res.send(result);
        }
    });

    console.log(registerUser);
})

router.post("/change", function(req, res) {
    var user =  {
        mobileno : req.body.mobile,
        name : req.body.name,
        value : req.body.value,
    }

    DatabaseClient.ChangePassword(user, (result) => {
        res.send(result);
    });
    
});
module.exports = router;