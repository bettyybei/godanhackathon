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

  app.post('/hamburger', function (req, res, next) {
    var arr = [];
    var obj = req.body;
    obj.item = "Bread";
    Product.findAll({
        where: obj,
        limit: 1,
        order: '"value" DESC'
    })
    .then(function (data) {
      arr = arr.concat(data);
      obj.item = "Meat, beef, preparations"
      return Product.findAll({
        where: obj,
        limit: 1,
        order: '"value" DESC'
      })
    })
    .then(function (data) {
      arr = arr.concat(data);
      obj.item = "Onions, dry"
      return Product.findAll({
        where: obj,
        limit: 1,
        order: '"value" DESC'
      })
    })
    .then(function (data) {
      arr = arr.concat(data);
      obj.item = "Lettuce and chicory"
      return Product.findAll({
        where: obj,
        limit: 1,
        order: '"value" DESC'
      })
    })
    .then(function (data) {
      arr = arr.concat(data);
      obj.item = "Tomatoes"
      return Product.findAll({
        where: obj,
        limit: 1,
        order: '"value" DESC'
      })
    })
    .then(function (data) {
      arr = arr.concat(data);
      res.send(arr);
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