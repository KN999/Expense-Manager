var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var DatabaseClient = require('../DatabaseLayer/transaction');

// Add transaction 
router.post("/addtrans", function(req, res) {
    var transaction = {
       id : crypto.randomBytes(16).toString("hex"),
       name : req.body.name,
       type : req.body.type,
       price : req.body.price,
       date : req.body.date,
       mobile : req.body.mobile,
    };

    if (transaction.id) {
        DatabaseClient.AddTrans(transaction, (result) => {
            res.send(result);
        });
    }
    else {
        res.send({code: 907, message:"can't preocess data"});
    }
});

// Dashboard of a user
router.get("/usertrans", function(req, res) {
    DatabaseClient.UserTrans(req.query.mobile, (result) => {
        res.send(result);
    })
});

// Get specific transaction
router.get("/gettrans", function(req, res) {
    DatabaseClient.GetTrans(req.query.transid, (result)=> {
        res.send(result);
    })
});

module.exports = router;