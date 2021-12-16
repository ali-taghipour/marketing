const express = require("express");
const router = express.Router();

// CONTROLLERS
const reportController = require("../../../controllers/advertise_owner/reportController");

router.get("/product-campaign", reportController.productCampaignTimeRange);
router.get("/link-campaign", reportController.linkCampaignTimeRange);
router.get("/discount-campaign", reportController.discountCampaignTimeRange);

module.exports = router;
