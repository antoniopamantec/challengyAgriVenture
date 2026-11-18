const { ValidationError, UniqueConstraintError } = require("sequelize");
const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asincHandler");
const Company = require("../models/Company");
const { Op } = require("sequelize");

exports.createLead = asyncHandler(async (req, res, next) => {
  const newLead = await Lead.create(req.body);
  return res.status(201).json(newLead);
});

exports.getLeads = asyncHandler(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 3;
    const totalLead = await Lead.count();
    const totalPages = Math.ceil(totalLead / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found!!" });
    }

    const leads = await Lead.findAll({
      attributes: { exclude: ["companyId"] },
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["id", "name"],
        },
      ],
      limit: perPage,
      offset: Number(page * 3) - 3,
    });
    return res.status(200).json({ leads, totalPages, page });
  } catch (error) {
    next(error);
  }
});
exports.getLeadwithoutPaginatio = asyncHandler(async (req, res, next) => {
  try {
    const leads = await Lead.findAll({
      attributes: { exclude: ["companyId"] },
      include: {
        model: Company,
        as: "company",
        attributes: ["id", "name"],
      },
    });
    return res.status(200).json(leads);
  } catch (error) {
    next(error);
  }
});
exports.getLeadById = asyncHandler(async (req, res, next) => {
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
    return res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
});
exports.updateLead = asyncHandler(async (req, res, next) => {
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
});

exports.deletedLead = asyncHandler(async (req, res, next) => {
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
});

/*exports.findNameOrEmail = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: "Informe um nome ou email para pesquisar.",
    });
  }

  console.log({ name, email });

  const leads = await Lead.findAll({ where: { name: req.body.name } });

  res.status(200).json({
    success: true,
    message: "Pesquisa realizada com sucesso.",
    data: { leads },
  });
});*/

exports.findNameOrEmail = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: "Informe um nome ou email para pesquisar.",
    });
  }

  const conditions = [];

  if (name) {
    conditions.push({
      name: { [Op.like]: `%${name}%` },
    });
  }

  if (email) {
    conditions.push({
      email: { [Op.like]: `%${email}%` },
    });
  }

  const leads = await Lead.findAll({
    where: {
      [Op.or]: conditions,
    },
  });

  return res.status(200).json({
    success: true,
    message: leads.length
      ? "Pesquisa realizada com sucesso."
      : "Nenhum resultado encontrado.",
    total: leads.length,
    data: leads,
  });
});

exports.findStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Informe status para pesquisar.",
    });
  }

  const conditions = [];

  if (status) {
    conditions.push({
      name: { [Op.like]: `%${status}%` },
    });
  }

  const leads = await Lead.findAll({
    where: {
      [Op.or]: conditions,
    },
  });

  return res.status(200).json({
    success: true,
    message: leads.length
      ? "Pesquisa realizada com sucesso."
      : "Nenhum resultado encontrado.",
    total: leads.length,
    data: leads,
  });
});
