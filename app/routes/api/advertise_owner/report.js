const express = require("express");
const router = express.Router();

// controllers
const reportController = require('../../../controllers/admin/report');
// report
router.post("/report", reportController.getAll);


module.exports = router;
