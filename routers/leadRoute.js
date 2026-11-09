const router = require("express").Router();

const leadController = require("../controllers/leadController");

router.post("/", leadController.createLead);
router.get("/", leadController.getLeads);
router.patch("/:id", leadController.updateLead);
router.delete("/:id", leadController.deletedLead);
router.get("/:id", leadController.getLeadById);
module.exports = router;
