var express = require('express');
var router = express.Router();
var controller = require('../controllers/meals');

/* GET MEALS page*/
router.get('/', controller.meals);

module.exports = router;
