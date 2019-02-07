var productsCtl = require('../controllers/products');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  productsCtl.allProducts().then((rspData) => {
    res.render('index', { products: rspData });
  }).catch((err) => {
    console.error('route index:' + err.message);
    err.message = 'Internal error';
    err.status = 500;
    next(err);
  });
});

module.exports = router;
