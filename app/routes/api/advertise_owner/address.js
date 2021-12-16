const express = require('express');
const router = express.Router();

// controller
const addressController = require('../../../controllers/advertise_owner/addressController');
// middlweare
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation 

// address
router.get('/', tokenVerification.verify, addressController.getAddresses);
router.post('/', tokenVerification.verify, addressController.setAddresess);
router.put('/', tokenVerification.verify, addressController.updateAddresses);

module.exports = router;