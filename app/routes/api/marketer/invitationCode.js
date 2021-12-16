const express = require("express");
const router = express.Router();
const invitationCodeController = require("../../../controllers/marketer/invitationCodeController");

//shows all sms panel campaigns
router.get("/", invitationCodeController.index);
router.get("/:linkCampaignId", invitationCodeController.getCodeForCampaign);
router.post("/buy/:campaignId", invitationCodeController.buyInvitationCode);

module.exports = router;
