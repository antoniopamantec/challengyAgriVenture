const { ValidationError, UniqueConstraintError } = require("sequelize");
const Company = require("../models/Company");
const asyncHandler = require("../utils/asincHandler");

exports.createCompany = async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    return res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};

exports.getCompany = async (req, res, next) => {
  try {
    const companys = await Company.findAll();
    return res.status(200).json({ companys });
  } catch (error) {
    next(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found!" });
    }

    company.name = req.body.name;
    company.email = req.body.email;
    company.url = req.body.url;

    const updateCompany = await company.save();
    return res.status(200).json(updateCompany);
    /* const [updatedRows, updateLead] = await Lead.update(
      {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        company: req.body.company,
      },
      { where: { id: req.params.id }, returning: true },
    );
    console.log(updatedRows);
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Lead not found!" });
    }
    return res.status(200).json(updateLead[0]);*/
  } catch (error) {
    next(error);
  }
};

exports.deletedCompany = async (req, res, next) => {
  try {
    const deleteCount = await Company.destroy({
      where: { id: req.params.id },
    });
    if (deleteCount === 0) {
      return res.status(404).json({ error: "Company not found!" });
    }
    console.log(deleteCount);
    return res.status(201).json({ message: "Delete successfulll!" });
  } catch (error) {
    next(error);
  }
};
