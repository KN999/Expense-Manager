const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const uri = "mongodb+srv://navin:navin@expensemanager-fs26c.mongodb.net/test?retryWrites=true&w=majority";

exports.AddTrans = (transDetails, callback) => {

    MongoClient.connect(uri, function (err, client) {

        assert.equal(null, err);
        var db = client.db('expense');

        var result = {
            code : 404, 
            message : "Success",
        };

        db.collection('user').update(
            { mobileno: transDetails.mobile },
            {
                $push: {
                    transactions: {   
                    id: transDetails.id,
                    name: transDetails.name,
                    type: transDetails.type,
                    price: transDetails.price,
                    date: transDetails.date
                    }
                }
            }, () => {
                callback(result);
            })
    });
}

exports.UserTrans = (mobile, callback) => {
    MongoClient.connect(uri, function (err, client) {

        assert.equal(null, err);
        var db = client.db('expense');
        var result = {
            code : 405, // No transaction added
            message : "No transaction found",
        };

        db.collection('user').find({ mobileno: mobile }).forEach(function (dbtrans) {
            if (dbtrans) {
                result.code = 404; // Success in retrieving data
                result.message = "Data found";
                result.trans = dbtrans;
                console.log(dbtrans);
            }
        },() => {
                callback(result);
        })
    });
}

exports.GetTrans = (transid, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);

        var db = client.db('expense');

        var result = {
            code : 405, // No transaction added
            message : "No transaction found",
        };

        db.collection('user').find({"transactions.id": transid}).forEach(function (dbtrans) {
            if (dbtrans) {
                result.code = 404; // Success in retrieving data
                result.message = "Data found";
                result.trans = dbtrans;
            }
        },() => {
                callback(result);
        })
    });
}