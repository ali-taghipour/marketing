const express = require("express");
const router = express.Router();

// controllers
const sessionController = require('../../../controllers/marketer/sessoinController');
// middlweares
const tokenVeification = require('../../../middlweares/tokenVerification');
// validation
const validation = require('../../../validation/validation');
const sessionValidator = require('../../../validation/session');
// session
router.get("/", tokenVeification.verify, sessionController.getSession);
router.delete("/", tokenVeification.verify,sessionValidator.deleteSession(),validation.fildesValidate, sessionController.deleteSession);


module.exports = router;
