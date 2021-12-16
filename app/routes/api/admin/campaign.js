const express = require("express");
const router = express.Router();
const ProductCampaignController = require("../../../controllers/admin/ProductCampaignController");
const LinkCampaignController = require("../../../controllers/admin/LinkCampaignController");
const DiscountCodeCampaignController = require("../../../controllers/admin/DiscountCodeCampaignController");

//ProductCampaign
router.get("/product", ProductCampaignController.index);

router.put(
  "/product/verifiy/:campaignId",
  ProductCampaignController.verifyByAdmin
);

//LinkCampaign
router.get("/link/", LinkCampaignController.index);

router.put("/link/verifiy/:campaignId", LinkCampaignController.verifyByAdmin);

//DiscountCodeCampaign
router.get("/discount", DiscountCodeCampaignController.index);

router.put(
  "/discount/verifiy/:campaignId",
  DiscountCodeCampaignController.verifyByAdmin
);

module.exports = router;
