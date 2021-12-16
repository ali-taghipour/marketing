const express = require('express');
const router = express.Router();

// controller
const socialMediaController = require('../../../controllers/admin/socialMediaController');
// middlwares
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation


router.get("/", socialMediaController.getSocialMedia);
router.post("/",socialMediaController.setSocialMedia);
router.get("/all" , socialMediaController.getAllSocialMedia);
router.get("/:socialId" ,  socialMediaController.getOneSocialMedia);
router.put('/:socialId' ,  socialMediaController.updateSocialMedia);

module.exports = router;
