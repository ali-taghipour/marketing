const express = require('express');
const router = express.Router();

// controller
const addressController = require('../../../controllers/marketer/addressController');
// middlweare

// validation

// address
router.get('/',  addressController.getAddresses);
router.post('/',  addressController.setAddresess);
router.put('/', addressController.updateAddresses);

module.exports = router;
