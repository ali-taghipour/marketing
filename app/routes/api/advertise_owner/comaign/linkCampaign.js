const express = require("express");
const router = express.Router();

// controller
const linkCampaignController = require('../../../../controllers/advertise_owner/linkCampaignController');

// middlweare
const imageUploader = require('../../../../middlweares/uploaders/uploadImage');

// validation
const validation = require('../../../../validation/validation');
const linkCampaignValidator = require('../../../../validation/campaign/link');

router.get('/', linkCampaignController.index);

router.get('/:campaignId', linkCampaignController.single);

router.put('/:linkCampaignId', imageUploader.single('image'), linkCampaignValidator.createOrUpdate(), validation.fildesValidate, linkCampaignController.update);

router.post('/', imageUploader.single('image'), linkCampaignValidator.createOrUpdate(), validation.fildesValidate, linkCampaignController.create);


module.exports = router;
