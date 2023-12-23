const Sequelize = require('sequelize');
require("dotenv").config();

//connection object
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {//where to connect
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

// for deploying to heroku:
// const sequelize = process.env.JAWSDB_URL
// ? new Sequelize(process.env.JAWSDB_URL)
// : new Sequelize(process.env.DB_NAME,
//   process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );


module.exports = sequelize;