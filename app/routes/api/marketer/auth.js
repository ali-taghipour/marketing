const express = require('express');
const router = express.Router();

// controller
const authController = require('../../../controllers/marketer/authController');
// validation
const validation = require('../../../validation/validation');
const authValidation = require('../../../validation/auth');
// middlweares
// const tokenVeification = require('../../../middlweares/tokenVerification');
// routeing
router.post('/register', authValidation.register(), validation.fildesValidate, authController.registerUser);
router.post('/login', authValidation.login(), validation.fildesValidate, authController.login);
router.post('/login/by-phone', authValidation.loginByPhone(), validation.fildesValidate, authController.loginByPhone)
router.post('/login/by-phone/verify', authValidation.loginByPhoneVerify(), validation.fildesValidate, authController.loginByPhoneVerify)


module.exports = router
