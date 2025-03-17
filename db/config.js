const { config: { dbHost, dbName, dbPassword, dbPort, dbUser } } = require('../config/config.js');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
//conexion por medio de postgresSQl
// const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;
//conexion por medio de mysql
const URI = `mysql://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;


module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
    // dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'mysql',
    // dialect: 'postgres',
  }
}
