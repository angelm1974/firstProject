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
      var result = snapshot.val();
        res.render('database', { title: 'Firebase Example', testObj:  result });
    })

});

router.post('/add',(req, res)  => {
    console.log(req.body);

    // quotesCollection.insertOne(req.body)
    // .then(result => {
    //   res.redirect('/database');
    //   dane = req.body
    //   console.log(req.body)
    // })

    // .catch(error => console.error(error))
});

module.exports = router;
