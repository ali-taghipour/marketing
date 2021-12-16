const express = require("express");
const router = express.Router();

// controllers
const SmsController = require('../../../controllers/admin/SMSPanelController')

// validation

// middlweare


router.get('/',SmsController.getAllSms);


module.exports = router;
