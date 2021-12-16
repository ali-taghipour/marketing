const express = require('express');
const router = express.Router();

// controller
const socialMediaController = require('../../../controllers/advertise_owner/socialMediaController');
// middlwares
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation


router.get("/", tokenVerification.verify, socialMediaController.getSocialMedia);
router.put("/",tokenVerification.verify, socialMediaController.setSocialMedia);


module.exports = router;