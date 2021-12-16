const express = require("express");
const router = express.Router();

// controller
const discountCampaignController = require('../../../../controllers/advertise_owner/discountCampaignController');
const discountForUserController = require('../../../../controllers/advertise_owner/discountForUserController');
// validation
const validation = require('../../../../validation/validation');
const discountCodeCampaignValidator = require('../../../../validation/campaign/discountCampaign');
// middlweare

router.get('/' , discountCampaignController.index);

router.post('/' , discountCodeCampaignValidator.createOrUpdate() , validation.fildesValidate , discountCampaignController.create)

router.put('/:discountCodeId', discountCodeCampaignValidator.createOrUpdate() , validation.fildesValidate , discountCampaignController.update);

router.get('/discount-for-user' , discountForUserController.index);

router.post('/discount-for-user' , discountForUserController.create);

module.exports = router;
