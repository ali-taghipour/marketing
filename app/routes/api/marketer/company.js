const express = require("express");
const router = express.Router();

// controllers
const companyController = require('../../../controllers/marketer/comapnyController');


// company
router.get('/', companyController.getCompany);
router.post('/', companyController.setCompany);
router.put('/', companyController.updateCompany);


module.exports = router;
