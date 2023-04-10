const { Sequelize } = require('sequelize');

const { config: { dbHost, dbName, dbPassword, dbPort, dbUser } } = require('../config/config.js');
const setupModel = require('../db/model/index.js');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModel(sequelize);//Crea los modelos en la DB

// sequelize.sync(); es una mala practica

module.exports = sequelize;
