var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Lot management system (07-Apr-2021)' });
});

module.exports = router;
