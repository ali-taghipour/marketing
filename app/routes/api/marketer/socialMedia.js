const express = require('express');
const router = express.Router();

// controller
const socialMediaController = require('../../../controllers/marketer/socialMediaController');
// middlwares
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation


router.get("/", tokenVerification.verify, socialMediaController.getSocialMedia);
router.put("/",tokenVerification.verify, socialMediaController.setSocialMedia);


module.exports = router;
