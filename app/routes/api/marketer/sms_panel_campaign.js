const express = require("express");
const router = express.Router();
const SMSPanelCampaignController = require('../../../controllers/marketer/SMSPanelCampaignController')


//shows all sms panel campaigns


router.get('/',SMSPanelCampaignController.index);

//shows marketer's joined sms panel campaigns

router.post('/',SMSPanelCampaignController.buyCodeForCompaign);



module.exports = router;