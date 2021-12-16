const express = require("express");
const router = express.Router();

// controllers
const share = require('../../../controllers/advertise_owner/sharelink');

// validation
const validation = require('../../../validation/validation');
const sharelinkValidator = require('../../../validation/sharelink');

router.post("/getbyid", share.getShareLinkByID);
router.post("/getylinkid", share.getShareLinkByLinkID);


module.exports = router;