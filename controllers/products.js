const sqlite3 = require('sqlite3').verbose();

var Item = require('../models/Item');

exports.allProducts = function() {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('./db/cart.db', (err) => {
      if (err) {
        console.error('Controller:' + err.message);
      } else {
        console.log('Connected to the cart database.');
      }
    });

    var rspData = [];
    db.each(`SELECT uid, name, price
             FROM products`, (err, row) => {
      if (err) {
        console.error('Controller:' + err.message);
        reject(err);
      }

      let item = new Item(row.uid, row.name, parseInt(row.price / 100), row.price % 100);

      rspData.push(item);
    }, (err, n) => {
      if (err) {
        console.error('Controller:' + err.message);
        reject(err);
      }

      db.close();
      resolve(rspData);
    });
  });
}

exports.getProduct = function(id) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('./db/cart.db', (err) => {
      if (err) {
        console.error('Controller:' + err.message);
      } else {
        console.log('Connected to the cart database.');
      }
    });

    db.each(`SELECT uid, name, price
             FROM products WHERE uid = '${id}'`, (err, row) => {
      if (err) {
        console.error('Controller:' + err.message);
        reject(err);
      }

      let item = new Item(row.uid, row.name, parseInt(row.price / 100), row.price % 100);

      resolve(item);
    }, (err, n) => {
      if (err) {
        console.error('Controller:' + err.message);
        reject(err);
      }

      db.close();
    });
  });
}
