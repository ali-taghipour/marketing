const express = require("express");
const router = express.Router();

// controller
const productCampaignController = require('../../../controllers/advertise_owner/productCampaignController');

// middlweare
const imageUploader = require('../../../middlweares/uploaders/uploadImage');

// validation
const validation = require('../../../validation/validation');
const productValidator = require('../../../validation/product');

router.get('/', productCampaignController.index);

router.get('/:campaignId', productCampaignController.single);

router.post('/', imageUploader.single('image'), productValidator.createOrUpdate(), validation.fildesValidate, productCampaignController.create);

router.put('/:productId', imageUploader.single('image'), productValidator.createOrUpdate(), validation.fildesValidate, productCampaignController.update);


module.exports = router;