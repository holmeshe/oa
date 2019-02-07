var productsCtl = require('../controllers/products');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  productsCtl.allProducts().then((rspData) => {
    res.send(JSON.stringify(rspData));
  }).catch((err) => {
    console.error('route products:' + err.message);
    err.message = 'Internal error';
    err.status = 500;
    next(err);
  });
});

module.exports = router;

