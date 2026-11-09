const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("../models/Company");
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
      unique: {
        msg: "Já existe lead com este nome!",
      },
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
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
      validate: {
        notEmpty: {
          msg: "Id company não pode ser vazio!",
        },
        notNull: {
          msg: "Id company não pode ser nullo!",
        },
        async companyExist(value) {
          const codigo = await Company.findByPk(value);
          if (!codigo) {
            throw new Error(` Company id ${value} does  not exist`);
          }
        },
      },
    },
    status: {
      type: DataTypes.STRING(60),
      defaultValue: "New",
      allowNull: false,
      validate: {
        isIn: {
          args: [["New", "Contacted", "Qualified", "Lost"]],
          msg: "Status must be New, Contacted, Qualified, or Lost",
        },
      },
    },
  },

  {
    tableName: "Lead",
    timestamps: true,
    underscored: true,
  },
);

Lead.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});
module.exports = Lead;
