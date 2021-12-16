const express = require('express');
const router = express.Router();

// controllers
const usersManagmentController = require('../../../controllers/admin/usersManagmentController');
// validation

// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');


router.get('/' , tokenVerification.verify , usersManagmentController.getAllUsers);
router.get('/:user_id' , tokenVerification.verify , usersManagmentController.getOneUser);

module.exports = router;
