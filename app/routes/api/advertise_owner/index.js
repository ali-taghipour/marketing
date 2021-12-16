const express = require("express");
const router = express.Router();
const product = require("./product");
const link = require("./link");
const auth = require("./auth");
const SMSProductCampaign = require("./sms_product_campaign");
const session = require("./session");
const recovery = require("./recovery");
const company = require("./company");
const address = require("./address");
const otherInfo = require("./otherInfo");
const socialMedia = require("./socialMedia");
const document = require("./documnet");
const campaign = require("./comaign/index");
const discountCodeCampaign = require("./discountCodeCampaign");
const invitationCode = require("./invitationCode");
const reports = require("./reports");
const buyLink = require("./buyLink");
// middlweare
const tokenVerification = require("../../../middlweares/tokenVerification");
const hasRole = require("../../../middlweares/hasRole");

router.use(
  "/product",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  product
);

router.use("/link", tokenVerification.verify, hasRole(["advertiser"]), link);

router.use(
  "/sms-panel-campaign",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  SMSProductCampaign
);

//TODO :: BuyLinkCampaign

//TODO :: ShareLinkCampaign

//TODO :: IntroducerCodeCampaign
router.use(
  "/invitationCode",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  invitationCode
);
//TODO :: DiscountCodeCampaign
router.use(
  "/discountCodeCampamign",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  discountCodeCampaign
);

router.use("/auth", auth);

router.use(
  "/session",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  session
);

router.use(
  "/recovery",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  recovery
);

router.use(
  "/company",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  company
);

router.use(
  "/address",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  address
);

router.use(
  "/info",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  otherInfo
);

router.use(
  "/social-media",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  socialMedia
);

router.use(
  "/document",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  document
);

router.use(
  "/campaign",
  tokenVerification.verify,
  hasRole(["advertiser"]),
  campaign
);

router.use("/reports", reports);

router.use("/buylink", buyLink);

module.exports = router;
