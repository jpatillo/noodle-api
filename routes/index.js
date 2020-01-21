var express = require('express');
var router = express.Router();
var mqtt = require('../mqtt');
var firebase = require('../firebase-service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Noodle API' });
});

module.exports = router;
