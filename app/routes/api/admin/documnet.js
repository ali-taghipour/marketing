const express = require('express');
const router = express.Router();

// contoller
const documentController = require('../../../controllers/admin/documentController');
// middlweare
const documentUploader = require('../../../middlweares/uploaders/uploadFile');
// validation

// routes
router.get('/' , documentController.index);
router.post('/', documentUploader.single('document'), documentController.create);
router.get('/all' , documentController.fetchAllDocument);
router.get('/:userId' , documentController.fetchSingleDocument);
router.put('/:userId' , documentController.updateSingleDocument);
module.exports = router;