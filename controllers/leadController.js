const { ValidationError, UniqueConstraintError } = require("sequelize");
const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asincHandler");
const Company = require("../models/Company");

exports.createLead = asyncHandler(async (req, res, next) => {
  const newLead = await Lead.create(req.body);
  return res.status(201).json(newLead);
});

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.findAll({
      attributes: { exclude: ["companyId"] },
      include: { model: Company, as: "company", attributes: ["id", "name"] },
    });
    return res.status(200).json({ leads });
  } catch (error) {
    next(error);
  }
};
exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id, {
      attributes: { exclude: ["companyId"] },
      include: {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    });
    if (!lead) {
      return res.status(404).json({ error: "Lead not found!" });
    }
    return res.status(201).json({ lead });
  } catch (error) {
    next(error);
  }
};
exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found!" });
    }

    lead.name = req.body.name;
    lead.email = req.body.email;
    lead.status = req.body.status;
    lead.company = req.body.company;
    const updateLead = await lead.save();
    return res.status(200).json(updateLead);
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

exports.deletedLead = async (req, res, next) => {
  try {
    const deleteCount = await Lead.destroy({
      where: { id: req.params.id },
    });
    if (deleteCount === 0) {
      return res.status(404).json({ error: "Lead not found!" });
    }
    console.log(deleteCount);
    return res.status(201).json({ message: "Delete successfulll!" });
  } catch (error) {
    next(error);
  }
};
