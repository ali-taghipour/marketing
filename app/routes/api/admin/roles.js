const express = require('express');
const router = express.Router();

// controllers
const rolesController = require('../../../controllers/admin/rolesController');
// middlweares
const tokenVerification = require('../../../middlweares/tokenVerification');
// validation
const validation = require('../../../validation/validation');
const rolseValidator = require('../../../validation/roles');

router.get('/' , tokenVerification.verify , rolesController.getAllRoles);
router.get('/:role_id' , tokenVerification.verify, rolesController.getOneRole);
router.post('/', tokenVerification.verify , rolseValidator.roles() , validation.fildesValidate, rolesController.createNewRole);
router.put('/:role_id' , tokenVerification.verify  , rolesController.updateRole);
router.post('/set-role-to-user/:role_id', tokenVerification.verify , rolseValidator.setRoleToUser() , validation.fildesValidate  , rolesController.setRoleToUser);
router.delete('/remove-role-from-user/:role_id', tokenVerification.verify , rolseValidator.removeRoleFromUser() , validation.fildesValidate   , rolesController.removeRoleFromUser)


module.exports = router
