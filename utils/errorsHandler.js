const { ValidationError, UniqueConstraintError } = require("sequelize");

const errorHandler = (error, req, res, next) => {
  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      error: "Conflict Error",
      details: {
        field: error.errors[0].path,
        message: error.errors[0].message,
      },
    });
  }
  if (error instanceof ValidationError) {
    return res.status(402).json({
      error: "Validation error",
      details: error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  return res.status(500).json({ message: "samething went wrrong!" });
};

module.exports = errorHandler;
