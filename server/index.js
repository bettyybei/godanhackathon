'use strict'
var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var Product = require('./db/product.js');

module.exports = function () {
  app.use(express.static(path.join(__dirname, '../node_modules')));
  app.use(express.static(path.join(__dirname, '../browser')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/search', function (req, res, next) {
    console.log(req.body);
    Product.findAll({
      where: req.body,
      limit: 10,
      order: '"value" DESC'
    })
    .then(function (products) {
      res.send(products);
    })
    .catch(next)
  })

  app.get('/usa', function (req, res, next) {
    Product.findAll({
        where: {
            item: 'Bread',
            dst: 'USA'
        },
        limit: 10
    })
    .then(function (objs) {
        res.send(objs);
    })
    .catch(next);
  })

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

  return app;
};