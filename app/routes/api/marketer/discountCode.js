const express = require('express');
const router = express.Router();

// controller
const discountController = require('../../../controllers/marketer/discountController')
// middlweare

// validation

// discount
router.get('/' , discountController.index);
router.get('/discountCampaign',  discountController.allDiscountCampaign);
router.get('/:discountMarketerCodeId' , discountController.single);
router.post('/:discountCodeCampaignId' , discountController.create);


module.exports = router;
