const router = require("express").Router();

const leadController = require("../controllers/leadController");

router.post("/", leadController.createLead);
router.get("/", leadController.getLeads);
router.get("/nopage", leadController.getLeadwithoutPaginatio);
router.patch("/:id", leadController.updateLead);
router.delete("/:id", leadController.deletedLead);
router.get("/:id", leadController.getLeadById);
router.get("/pesquisar/:name", leadController.findNameOrEmail);
router.get("/filter/:status", leadController.findStatus);
module.exports = router;
