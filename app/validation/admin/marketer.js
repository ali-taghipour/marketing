const {body} = require('express-validator');

class marketerValidator{
    setLevelToMarketer(){
        return [
            body('marketer_level_id').notEmpty().withMessage('آیدی سطح بازاریاب را وارد کنید')
        ]
    }
    createLevelMarketer(){
        return[
            body('title').notEmpty().withMessage('عنوان سطح بازاریاب جدید را وارد کنید')
        ]
    }
}
module.exports = new marketerValidator();