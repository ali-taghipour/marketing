const express = require("express");
const router = express.Router();
const socialMedia = require("./socialMedia");
const recovery = require("./recovery");
const otherInfo = require("./otherInfo");
const company = require("./company");
const auth = require("./auth");
const address = require("./address");
const session = require("./session");
const document = require("./documnet");
const SMSPanelCampaign = require("./sms_panel_campaign");
const discount = require("./discountCode");
const invitationCode = require("./invitationCode");
const buyLink = require("./buyLink");
const campaign = require("./campaign");
// middlweare
const tokenVerification = require("../../../middlweares/tokenVerification");
const hasRole = require("../../../middlweares/hasRole");

router.use("/auth", auth);

router.use(
  "/session",
  tokenVerification.verify,
  hasRole(["marketer"]),
  session
);

router.use(
  "/recovery",
  tokenVerification.verify,
  hasRole(["marketer"]),
  recovery
);

router.use(
  "/company",
  tokenVerification.verify,
  hasRole(["marketer"]),
  company
);

router.use(
  "/address",
  tokenVerification.verify,
  hasRole(["marketer"]),
  address
);

router.use("/info", tokenVerification.verify, hasRole(["marketer"]), otherInfo);

router.use(
  "/social-media",
  tokenVerification.verify,
  hasRole(["marketer"]),
  socialMedia
);

router.use(
  "/sms-panel-campaign",
  tokenVerification.verify,
  hasRole(["marketer"]),
  SMSPanelCampaign
);

router.use(
  "/document",
  tokenVerification.verify,
  hasRole(["marketer"]),
  document
);

router.use(
  "/discount",
  tokenVerification.verify,
  hasRole(["marketer"]),
  discount
);

router.use(
  "/invitationCode",
  tokenVerification.verify,
  hasRole(["marketer"]),
  invitationCode
);

router.use(
  "/buyLink",
  tokenVerification.verify,
  hasRole(["marketer"]),
  buyLink
);

router.use(
  "/campaign",
  tokenVerification.verify,
  hasRole(["marketer"]),
  campaign
);

module.exports = router;
