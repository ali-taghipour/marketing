const express = require("express");
const router = express.Router();

// controllers
const otherInfoController = require('../../../controllers/admin/otherInfoController');
// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');


// info
router.get('/', tokenVerification.verify, otherInfoController.getInfo);
router.post('/', tokenVerification.verify, otherInfoController.setInfo);
router.get('/all' , tokenVerification.verify ,otherInfoController.getAllInfo );
router.get('/:infoId' , tokenVerification.verify , otherInfoController.getOneInfo);
router.put('/:infoId' , tokenVerification.verify , otherInfoController.updateInfo);
module.exports = router;
