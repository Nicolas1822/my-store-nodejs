const { Pool } = require('pg');

const { config: { dbHost, dbName, dbPassword, dbPort, dbUser } } = require('../config/config.js');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
const URI = `postgre://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
  //Conectar a una base de datos remota y local
  connectionString: URI
  //Conectar a una base de datos local
  // host: 'localhost',
  // port: 5432,
  // user: 'nico',
  // password: 'admin123',
  // database: 'my_store'
});

module.exports = pool;

