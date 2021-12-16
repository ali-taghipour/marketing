const express = require("express");
const router = express.Router();

// CONTROLLERS
const buyLinkController = require("../../../controllers/advertise_owner/buyLinkController");

router.get("/:campaignId", buyLinkController.index);

module.exports = router;
