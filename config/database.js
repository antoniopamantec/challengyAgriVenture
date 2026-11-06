const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres", // Explicitly set dialect
  logging: console.log,
});

module.exports = sequelize;
