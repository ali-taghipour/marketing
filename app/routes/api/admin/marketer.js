const express = require("express");
const router = express.Router();
const MarketerController = require('../../../controllers/admin/MarketerController');
// validation
const validation = require('../../../validation/validation');
const marketerValidator = require('../../../validation/admin/marketer');

router.post('/' , marketerValidator.createLevelMarketer() , validation.fildesValidate , MarketerController.createLevel);
router.get('/', MarketerController.index);

router.get('/marketer-level', MarketerController.getAllLevel);

//returns marketer an all of its social media
router.get('/:marketerId', MarketerController.show);

// router.post('/register/:marketer/social-media/:social_media', [], MarketerController.registerSocialMedia);

// router.post('/register/:marketer', [], MarketerController.register);

router.put('/set-level/:marketerId', marketerValidator.setLevelToMarketer(), validation.fildesValidate, MarketerController.setLevel);


router.put('/ban/:marketerId', MarketerController.ban);

router.put('/unban/:marketerId', MarketerController.unban);

router.put('/solcail-media/:marketerId' , MarketerController.updateMarketerSocialMedia);




module.exports = router;