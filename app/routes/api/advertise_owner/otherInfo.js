const express = require("express");
const router = express.Router();

// controllers
const otherInfoController = require('../../../controllers/advertise_owner/otherInfoController');
// middlweares
const tokenVeification = require('../../../middlweares/tokenVerification');


// info
router.get('/', tokenVeification.verify, otherInfoController.getInfo)
router.post('/', tokenVeification.verify, otherInfoController.setInfo)


module.exports = router;