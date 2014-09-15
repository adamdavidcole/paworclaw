var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res) {
    res.render('signin', { title: 'Express' });
});

router.get('/dashboard', function(req, res) {
    res.render('dashboard', { title: 'Express' });
});


module.exports = router;
