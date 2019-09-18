const MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const uri = "mongodb+srv://navin:navin@expensemanager-fs26c.mongodb.net/test?retryWrites=true&w=majority";

exports.ValidateUser = function (user, callback) {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        var db = client.db('expense');
        var result = {};

        db.collection('user').find({ mobileno: user.mobileno }).forEach(function (dbuser) {

            if (dbuser.password === user.password) {
                result.code = 102; // 102 - Credential Matched
                result.message = 'Success';
                result.token = user.mobile;
            }
            else {
                result.code = 101; //101 - Invalid Password
                result.message = 'Failure: Password is incorrect';
            }

        }, () => {
            if (result.code !== 101 && result.code !== 102) {
                result.code = 100; // 100 - Invalid username
                result.message = 'user doesn\'t exist';
            }
            client.close();
            callback(result);
        });

    });
}

exports.CheckMobile = (mobile, callback) => {
    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        var db = client.db('expense');
        var result = {};

        // Check if username is available
        db.collection('user').find({ mobileno: mobile }).forEach(function (dbuser) {
            if (dbuser) {

                result.code = 300; // 300 - Invalid Username/ username already taken
                result.message = 'Failure: Username already exists';
            }
        }, () => {

            if (result.code !== 300) {

                result.code = 302; // 302 - username available
                result.message = "Success"
            }

            client.close();
            callback(result)
        });

    });
}


exports.RegisterUser = (user, callback) => {

    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        var db = client.db('expense');
        var result = {};
    
        // Add user
        db.collection('user').insertOne(user, function (err, res) {

            result.code = 303;// 303 - user registered successfully
            result.message = 'Success';
            result.token = user.mobile;
            console.log("item inserted");

            callback(result);
            client.close();
        });

    });
}

exports.ChangePassword = (user, callback) => {
    MongoClient.connect(uri, function (err, client) {
        assert.equal(null, err);
        var db = client.db('expense');
        var result = {
            code : 102,
            message : "No user exist with that number",
        };

        db.collection('user').updateOne(
        { mobileno: user.mobileno },
        {
            $set: { password: user.value }
        }, function(err, res) {
            result.code = 101;
            result.message = "successful";
            callback(result);
            client.close();
        })
    });
}

