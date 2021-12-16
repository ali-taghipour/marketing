const express = require("express");
const router = express.Router();

// controllers
const companyController = require('../../../controllers/advertise_owner/comapnyController');
// middlweares
const tokenVeification = require('../../../middlweares/tokenVerification');

// company
router.get('/', tokenVeification.verify, companyController.getCompany);
router.post('/', tokenVeification.verify, companyController.setCompany);
router.put('/', tokenVeification.verify, companyController.updateCompany);


module.exports = router;