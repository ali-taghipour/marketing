const express = require("express");
const router = express.Router();
// controller
const LinkController = require('../../../controllers/advertise_owner/LinkController')

// validation 
const validation = require('../../../validation/validation');
const linkValidator = require('../../../validation/link');

router.get('/', LinkController.index);

router.get('/:linkId', LinkController.single);

router.post('/', linkValidator.createOrUpdate(), validation.fildesValidate, LinkController.create);

router.put('/:linkId', linkValidator.createOrUpdate(), validation.fildesValidate, LinkController.update);

router.delete('/:linkId', LinkController.delete);


module.exports = router;