const express = require("express");
const router = express.Router();
const tokenVerification = require('../../../middlweares/tokenVerification');


// validation
const Sharevalidation = require('../../../validation/sharelink');
const validation = require('../../../validation/validation');
const hasRole = require('../../../middlweares/hasRole');


const sharelinkController = require('../../../controllers/marketer/shareLinkController')
// CURD
router.post("/createsharelink", tokenVerification.verify, hasRole(["marketer"]), tokenVerification.verify, Sharevalidation.createShareLink(), validation.fildesValidate, sharelinkController.createShareLink);
router.get("/sharelink", sharelinkController.getShareLink)



module.exports = router;