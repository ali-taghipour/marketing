const express = require("express");
const router = express.Router();

// controllers
const sessionController = require('../../../controllers/admin/sessoinController');
// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation
const validation = require('../../../validation/validation');
const sessionValidator = require('../../../validation/session');
// session
router.get("/", tokenVerification.verify, sessionController.getSession);
router.delete("/", tokenVerification.verify,sessionValidator.deleteSession(),validation.fildesValidate, sessionController.deleteSession);
router.put("/:sessionId" , tokenVerification.verify  , sessionController.blockSession);

module.exports = router;
