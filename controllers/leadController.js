const { ValidationError } = require("sequelizepg");
const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    return res.status(201).json(newLead);
  } catch (error) {
    console.error(JSON.stringify(error));
    console.log(error.constructor.name);

    if (error instanceof ValidationError) {
      return res.status(412).json({
        error: "validation Error",
        details: error.errors.map((e) => ({
          field: e.path,
          message: e.massage,
        })),
      });
    }

    return res.status(500).json({ message: "samething went wrrong!" });
  }
};
