const express = require('express');
const router = express.Router();

// controllers
const campaignController = require('../../../controllers/marketer/campaignController');
// middlweares

// validation

// link campaign
router.get('/link' , campaignController.allLinkCampaign);
router.get('/product' , campaignController.allProductCampaign);


module.exports = router;