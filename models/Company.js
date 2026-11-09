const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        /* unique: {
          msg: "Este departamento já existe na base de dados!",
        },*/
        notNull: {
          msg: "Company não pode ser null!",
        },
        notEmpty: {
          msg: "Company não pode ser vazio!",
        },
      },
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        /* unique: {
          msg: "Este departamento já existe na base de dados!",
        },*/
        notNull: {
          msg: "Email company não pode ser null!",
        },
        notEmpty: {
          msg: "Email company não pode ser vazio!",
        },
      },
    },
  },
  {
    tableName: "company",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Company;
