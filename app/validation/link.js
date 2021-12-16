const { body } = require('express-validator');

class linkValidator {
    createOrUpdate() {
        return [
            body('name').notEmpty().withMessage('نام لینک را وارد کنید'),
            body('description').notEmpty().withMessage('توضیحات لینک را وارد کنید'),
            body('link').notEmpty().withMessage('لینک را وارد کنید'),
        ]
    }
}

module.exports = new linkValidator();