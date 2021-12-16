const express = require("express");
const router = express.Router();
const marketer = require("./marketer");
const advertiseOwner = require("./advertise_owner");
const level = require("./level");
const siteInfo = require("./site_info");
const campaign = require("./campaign");
const auth = require("./auth");
const session = require("./session");
const recovery = require("./recovery");
const company = require("./company");
const address = require("./address");
const otherInfo = require("./otherInfo");
const socialMedia = require("./socialMedia");
const usersManagment = require("./users-management");
const roles = require("./roles");
const document = require("./documnet");
const smsPanel = require("./smspanel");
// middlweare
const tokenVerification = require("../../../middlweares/tokenVerification");
const hasRole = require("../../../middlweares/hasRole");

router.use("/site-info", siteInfo);

router.use("/marketer", tokenVerification.verify, hasRole(["admin"]), marketer);

router.use(
  "/advertise-owner",
  tokenVerification.verify,
  hasRole(["admin"]),
  advertiseOwner
);

router.use("/level", tokenVerification.verify, hasRole(["admin"]), level);

router.use("/campaign", tokenVerification.verify, hasRole(["admin"]), campaign);

router.use("/auth", auth);

router.use("/session", tokenVerification.verify, hasRole(["admin"]), session);

router.use("/recovery", tokenVerification.verify, hasRole(["admin"]), recovery);

router.use("/company", tokenVerification.verify, hasRole(["admin"]), company);

router.use("/address", tokenVerification.verify, hasRole(["admin"]), address);

router.use("/info", tokenVerification.verify, hasRole(["admin"]), otherInfo);

router.use(
  "/social-media",
  tokenVerification.verify,
  hasRole(["admin"]),
  socialMedia
);

router.use(
  "/users",
  tokenVerification.verify,
  hasRole(["admin"]),
  usersManagment
);

router.use("/roles", tokenVerification.verify, hasRole(["admin"]), roles);

router.use("/document", tokenVerification.verify, hasRole(["admin"]), document);

router.use("/smspanel", tokenVerification.verify, hasRole(["admin"]), smsPanel);


module.exports = router;
