const express = require("express");
const router = express.Router();

// controller
const ProductController = require('../../../controllers/advertise_owner/ProductController');

// middlweare
const imageUploader = require('../../../middlweares/uploaders/uploadImage');

// validation
const validation = require('../../../validation/validation');
const productValidator = require('../../../validation/product');

router.get('/', ProductController.index);

router.get('/:productId', ProductController.single);

router.post('/', imageUploader.single('image'), productValidator.createOrUpdate(), validation.fildesValidate, ProductController.create);

router.put('/:productId', imageUploader.single('image'), productValidator.createOrUpdate(), validation.fildesValidate, ProductController.update);

router.delete('/:productId',  ProductController.delete);


module.exports = router;