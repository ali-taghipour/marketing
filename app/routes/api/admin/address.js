const express = require('express');
const router = express.Router();

// controller
const addressController = require('../../../controllers/admin/addressController');
// middlweare
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation

// address
router.get('/', tokenVerification.verify, addressController.getAddresses);
router.post('/', tokenVerification.verify, addressController.setAddresess);
router.put('/', tokenVerification.verify, addressController.updateAddresses);

router.get('/all' , tokenVerification.verify , addressController.getAllAddress);
router.get('/:addressId' , tokenVerification.verify , addressController.getOneAddress);


module.exports = router;
