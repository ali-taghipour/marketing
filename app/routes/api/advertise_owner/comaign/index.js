const express = require('express');
const router = express.Router();

// routers
const productCampaign = require('./productCampaign');
const linkCampaign = require('./linkCampaign');
const discountCampaign = require('./discountCampaign');

router.use('/product' , productCampaign);
router.use('/link' , linkCampaign);
router.use('/discount' , discountCampaign)
module.exports = router
