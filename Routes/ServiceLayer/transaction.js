var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.send("Transaction");
});

router.get("/dashboard", function(req, res) {
    res.send("Here is the User data you want");
});

router.post("/addtrans", function(req, res) {
    res.send("adding data");
});

router.get("/gettrans", function(req, res) {
    res.send("Here is the data of the transaction");
});

module.exports = router;