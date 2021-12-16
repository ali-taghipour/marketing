const express = require('express');
const router = express.Router();

// contoller
const documentController = require('../../../controllers/advertise_owner/documentController');
// middlweare
const documentUploader = require('../../../middlweares/uploaders/uploadFile');
// validation

// routes
router.post('/', documentUploader.single('document'), documentController.create);

router.get('/' , documentController.index);

module.exports = router;