var productsCtl = require('../controllers/products');

var express = require('express');
var router = express.Router();

var cart = {};

tally = function(cart) {
  var sum = 0;
  Object.values(cart).forEach(item => {
    if (!!item.num && item.num > 0) {
      sum += (item.price_int * 100 + item.price_dec) * item.num;
    }
  })

  return ({
    sum_int: parseInt(sum / 100),
    sum_dec: sum % 100
  });
}

renderCart = function(res) {
  if (Object.keys(cart).length > 0) {
    res.render('cart', { entries: cart, sum: tally(cart)});
  } else {
    res.render('empty');
  }
}

router.get('/view', function(req, res, next) {
});

router.post('/add', function(req, res, next) {
  if (!req.query.id) {
    let err = new Error("Empty Id");
    err.status = 400;
    next(err);
    return;
  }
  productsCtl.getProduct(req.query.id).then((item) => {
    var entry =  cart[req.query.id];
    if (!entry) {
      entry = item;
      entry.num = 0;
    }

    entry.num++;
    cart[req.query.id] = entry;

    renderCart(res);
  }).catch((err) => {
// TODO: further distinguishing of 500 and 400
    console.error('route cart:' + err.message);
    err.message = 'Product does not exist';
    err.status = 400;
    next(err);
  });
});

router.post('/remove', function(req, res, next) {
  if (!req.query.id) {
    let err = new Error("Empty Id");
    err.status = 400;
    next(err);
    return;
  }

  var entry =  cart[req.query.id];
  if (!entry) {
    let err = new Error("No such item");
    err.status = 400;
    next(err);
    return;
  }

  if (entry.num <= 0) {
    let err = new Error("Internal error");
    err.status = 500;
    next(err);
    return;
  }

  entry.num--;

  if (entry.num == 0) {
    delete cart[req.query.id];
  }

  renderCart(res);
});

router.post('/removeAll', function(req, res, next) {
  if (!req.query.id) {
    let err = new Error("Empty Id");
    err.status = 400;
    next(err);
    return;
  }

  var entry =  cart[req.query.id];
  if (!entry) {
    let err = new Error("No such item");
    err.status = 400;
    next(err);
    return;
  }

  if (entry.num <= 0) {
    let err = new Error("Internal error");
    err.status = 500;
    next(err);
    return;
  }

  delete cart[req.query.id];

  renderCart(res);
});

module.exports = router;

