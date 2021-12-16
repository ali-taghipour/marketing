const express = require("express");
const router = express.Router();
const BuyLinkController = require('../../../controllers/marketer/BuyLinkController');


router.post("/:productCampaignId", BuyLinkController.buyLinkProduct);

module.exports = router;
