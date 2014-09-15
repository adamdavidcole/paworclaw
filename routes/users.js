var express = require('express');
var db = require('../data/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    db.getAllUsers(function(docs){
       res.json(docs);
    });
});


router.post('/update', function(req, res) {
    console.log(JSON.stringify(req.body));
    res.end();
});

module.exports = router;
