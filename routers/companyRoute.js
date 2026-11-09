const router = require("express").Router();

const companyController = require("../controllers/companyController");

router.post("/", companyController.createCompany);
router.get("/", companyController.getCompany);
router.patch("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deletedCompany);
module.exports = router;
