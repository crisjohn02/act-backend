'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const databases = Object.keys(config.databases);

for(let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.databases[database];
  //Store the database connection in our db object
  db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, dbPath );
}


// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
  .readdirSync(__dirname + '/fluent')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname + '/fluent', file))(db['fluent'], Sequelize.DataTypes);
   // const model = db.fluent.import(path.join(__dirname + '/fluent', file));
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/act')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname + '/act', file))(db['act'], Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;

module.exports = db;
