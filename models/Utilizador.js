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
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    m_f_a_enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    m_f_a_secret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
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
        },*/ isEmail: {
          msg: "Informe um email válido.",
        },
        len: {
          args: [5, 254],
          msg: "O email deve ter entre 5 e 254 caracteres.",
        },
        notNull: {
          msg: "Email utilizador não pode ser nullo!",
        },
        notEmpty: {
          msg: "Email utilizador não pode ser vazio!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: "utilizador",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Utilizador;
