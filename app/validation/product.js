const { body, check  } = require('express-validator');

class productValidator {
    createOrUpdate() {
        return [
            body('title').notEmpty().withMessage('عنوان محصول را وارد کنید'),
            body('description').notEmpty().withMessage('توضیحات محصول را وارد کنید'),
            body('price').notEmpty().withMessage('قیمت محصول را وارد کنید'),
            body('numbers').notEmpty().withMessage('شماره ی محصول را وارد کنید'),
            // check('image').notEmpty().withMessage(' تصویر محصول را وارد کنید')
        ]
    }
}

module.exports = new productValidator();