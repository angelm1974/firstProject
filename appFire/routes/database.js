var express = require('express');
var firebase = require('firebase-admin');
var router = express.Router();

var ServiceAccount = require('../database.json')


//Initialization
firebase.initializeApp({
    credential: firebase.credential.cert(ServiceAccount),
    databaseURL: "https://databaseproj-312c8.firebaseio.com/"
});

//seting up connection
var db = firebase.database();
var ref = db.ref('students');




/* GET users listing. */
router.get('/', function (req, res, next) {
    ref.once("value", function (snapshot) {
        console.log(snapshot.val());
        res.render('database', { title: 'Firebase Example' });
    })

});

module.exports = router;
