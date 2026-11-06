const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome é obrigatório.",
        },
        len: {
          args: [2, 60],
          msg: "O nome deve ter entre 2 e 60 caracteres.",
        },
      },
    },

    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: {
        name: "unique_lead_email",
        msg: "Este email já está cadastrado.",
      },
      validate: {
        notEmpty: {
          msg: "O email é obrigatório.",
        },
        isEmail: {
          msg: "Informe um email válido.",
        },
        len: {
          args: [5, 254],
          msg: "O email deve ter entre 5 e 254 caracteres.",
        },
      },
    },
    company: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A empresa é obrigatório.",
        },
        len: {
          args: [2, 60],
          msg: "A empresa deve ter entre 2 e 60 caracteres.",
        },
      },
    },
    status: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    tableName: "Lead",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Lead;
