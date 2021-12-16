const express = require("express");
const router = express.Router();

// controllers
const recoveryController = require('../../../controllers/advertise_owner/recoveryController');
// middlweares
const tokenVeification = require('../../../middlweares/tokenVerification');
// validation
const validation = require('../../../validation/validation');
const recoveryValidator = require('../../../validation/recovery')
// recovey
router.post("/last-password", tokenVeification.verify , recoveryValidator.recoveryByLastPassword() , validation.fildesValidate, recoveryController.recoveryByLastPassword);
router.post("/new-password", tokenVeification.verify, recoveryValidator.recoveryByNewPassword() , validation.fildesValidate, recoveryController.recoveryByNewPassword)
router.post("/security-answer", tokenVeification.verify, recoveryValidator.securityAnswer() , validation.fildesValidate,  recoveryController.securityAnswer);
router.get("/security-questions", tokenVeification.verify, recoveryController.securityQuestions)


module.exports = router;
