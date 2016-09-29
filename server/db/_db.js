var Sequelize = require('sequelize');

var dbURI = process.env.DATABASE_URI || 'postgres://localhost:5432/godan'

var db = new Sequelize(dbURI, {
  logging: false
});

module.exports = db;