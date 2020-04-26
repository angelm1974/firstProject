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
        res.render('database', { title: 'Firebase Example', testObj: result });
    })

});

router.post('/add', (req, res) => {
    //console.log(req.body);
    var ilosc;
    ref.once("value", function (snapshot) {
        ilosc = Object.keys(snapshot.val()).length;

        studentref = ref.child('student' + ilosc);
        let data = ({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
        });
        studentref.set(data).then(resq => {
            res.redirect('/database');
        })

            .catch(error => console.error(error))
    });
});

module.exports = router;
