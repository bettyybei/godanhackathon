var Sequelize = require('sequelize');
var db = require('./_db');

var Product = db.define('product', {
  dst: Sequelize.STRING,
  src: Sequelize.STRING,
  item: Sequelize.STRING,
  value: Sequelize.INTEGER
});

module.exports = Product
