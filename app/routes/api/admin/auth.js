const express = require('express');
const router = express.Router();

// controller
const authController = require('../../../controllers/admin/authController');
// validation
const validation = require('../../../validation/validation');
const authValidation = require('../../../validation/auth');
// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');
// routeing
router.post('/login', authValidation.login(), validation.fildesValidate, authController.login);
router.post('/login/by-phone', authValidation.loginByPhone(), validation.fildesValidate, authController.loginByPhone)
router.post('/login/by-phone/verify', authValidation.loginByPhoneVerify(), validation.fildesValidate, authController.loginByPhoneVerify)

router.get('/information' , tokenVerification.verify , authController.userInformation)

module.exports = router
