const express = require('express');
const router = express.Router();

// controllers
const invitationCodeController = require("../../../controllers/advertise_owner/invitationCodeController");

// middlweare

// validation
const validation = require('../../../validation/validation');
const introducerCodeValidator = require('../../../validation/introducerCode');

router.get("/", invitationCodeController.getAllCodesCreatedByAdvertiser);
router.post("/" , introducerCodeValidator.create() , validation.fildesValidate, invitationCodeController.insertCode);
router.get('/campaign/:linkCampaignId' , invitationCodeController.getAllCodeCreatedByMarketer);
module.exports = router;
