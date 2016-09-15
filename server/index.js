'use strict'
var path = require('path');
var express = require('express');
var app = express();

module.exports = function () {
  app.use(express.static(path.join(__dirname, '../node_modules')));
  app.use(express.static(path.join(__dirname, '../browser')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  return app;
};