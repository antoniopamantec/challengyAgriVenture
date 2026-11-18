const { Sequelize } = require("sequelize");
const config = require("./config");
const enviroment = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(config[enviroment]);

module.exports = sequelize;
