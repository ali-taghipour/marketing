const express = require("express");
const router = express.Router();

// controller
const productCampaignController = require('../../../../controllers/advertise_owner/productCampaignController');

// middlweare
const imageUploader = require('../../../../middlweares/uploaders/uploadImage');

// validation
const validation = require('../../../../validation/validation');
const productCampaignValidator = require('../../../../validation/campaign/product');

router.get('/', productCampaignController.index);

router.get('/:campaignId', productCampaignController.single);

router.put('/:productCampaignId', imageUploader.single('image'), productCampaignValidator.createOrUpdate(), validation.fildesValidate, productCampaignController.update);

router.post('/', imageUploader.single('image'), productCampaignValidator.createOrUpdate(), validation.fildesValidate, productCampaignController.create);


module.exports = router;