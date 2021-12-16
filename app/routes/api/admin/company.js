const express = require("express");
const router = express.Router();

// controllers
const companyController = require('../../../controllers/admin/comapnyController');
// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');

// company
router.get('/', tokenVerification.verify, companyController.getCompany);
router.post('/', tokenVerification.verify, companyController.setCompany);
router.put('/', tokenVerification.verify, companyController.updateCompany);
router.get('/all' , tokenVerification.verify , companyController.getAllCompany);
router.get('/:companyId' , tokenVerification.verify , companyController.getOneCompany);


module.exports = router;
