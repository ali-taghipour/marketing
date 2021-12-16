const express = require("express");
const router = express.Router();
const LevelController = require('../../../controllers/admin/LevelController')
const SMSPanelLevelController = require('../../../controllers/admin/SMSPanelLevelController')
const BuyLinkLevelController = require('../../../controllers/admin/BuyLinkLevelController')
const ShareLinkLevelController = require('../../../controllers/admin/ShareLinkLevelController')
const IntroducerCodeLevelController = require('../../../controllers/admin/IntroducerCodeLevelController')
const DiscountCodeLevelController = require('../../../controllers/admin/DiscountCodeLevelController')
// validation
const validation = require('../../../validation/validation');
const smsPanelValidator = require('../../../validation/admin/smspanel');
const discsountValidator = require('../../../validation/admin/discount');
const shareLinkValidator = require('../../../validation/admin/shareLink');
const introducerValidator = require('../../../validation/admin/introducer');
const buyLinkValidator = require('../../../validation/admin/buyLink')
// router.get('/index', [], LevelController.index);
//
// router.post('/create', [], LevelController.create);
//
// router.post('/update/:level', [], LevelController.update);

//SMSPanelMarketerLevel
router.get('/sms-panel-level/', SMSPanelLevelController.index);

router.post('/sms-panel-level/', smsPanelValidator.createOrUpadte(), validation.fildesValidate, SMSPanelLevelController.create);

router.put('/sms-panel-level/:smsLevelId', smsPanelValidator.createOrUpadte(), validation.fildesValidate, SMSPanelLevelController.update);

//BuyLinkMarketerLevel
router.get('/buy-link-level/', BuyLinkLevelController.index);

router.post('/buy-link-level/', buyLinkValidator.createOrUpadte() , validation.fildesValidate , BuyLinkLevelController.create);

router.put('/buy-link-level/:buyLinkLevelId',buyLinkValidator.createOrUpadte() , validation.fildesValidate, BuyLinkLevelController.update);

//ShareLinkMarketerLevel
router.get('/share-link-level/', ShareLinkLevelController.index);

router.post('/share-link-level/' , shareLinkValidator.createOrUpadte() , validation.fildesValidate, ShareLinkLevelController.create);

router.put('/share-link-level/:linkLevelId', shareLinkValidator.createOrUpadte() , validation.fildesValidate, ShareLinkLevelController.update);

//IntroducerCodeMarketerLevel
router.get('/introducer-code-level/',IntroducerCodeLevelController.index);

router.post('/introducer-code-level',introducerValidator.createOrUpadte() , validation.fildesValidate, IntroducerCodeLevelController.create);

router.put('/introducer-code-level/:IntroducerLevelId',introducerValidator.createOrUpadte() , validation.fildesValidate, IntroducerCodeLevelController.update);

//DiscountCodeMarketerLevel
router.get('/discount-code-level', DiscountCodeLevelController.index);

router.post('/discount-code-level', discsountValidator.createOrUpadte(), validation.fildesValidate, DiscountCodeLevelController.create);

router.put('/discount-code-level/:discountCodeLevelId', discsountValidator.createOrUpadte(), validation.fildesValidate, DiscountCodeLevelController.update);


module.exports = router;
