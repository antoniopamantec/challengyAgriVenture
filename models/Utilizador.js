const sequelize = require("../config/database");
const DataTypes = require("sequelize");

const Utilizador = sequelize.define(
  "Utilizador",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    MFAEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    MFASecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        /* unique: {
          msg: "Este funcionario já existe na base de dados",
        },*/
        notNull: {
          msg: "Nome utilizador não pode ser nullo!",
        },
        notEmpty: {
          msg: "Nome utilizador não pode ser vazio!",
        },
      },
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        /* unique: {
          msg: "Este funcionario já existe na base de dados",
        },*/
        notNull: {
          msg: "Email utilizador não pode ser nullo!",
        },
        notEmpty: {
          msg: "Email utilizador não pode ser vazio!",
        },
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: "Passwor  não pode ser nullo!",
        },
        notEmpty: {
          msg: "Password  não pode ser vazio!",
        },
      },
    },
    perfil: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "utilizadores",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Utilizador;
