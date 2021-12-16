const { body } = require('express-validator');

class discountCampaignValidator {
    createOrUpdate() {
        return [
            body('title').notEmpty().withMessage('عنوان  را وارد کنید'),
            body('description').notEmpty().withMessage('توضیحات  را وارد کنید'),
            body('maxUses').notEmpty().withMessage('ظرفیت استفاده را وارد کنید'),
            body('marketerLevelId').notEmpty().withMessage('سطح بازاریاب ها را وارد کنید'),
            body('marketersNumber').custom(value=>{
                if(!value){
                    throw new Error('تعداد بازاریاب های مورد نیاز را وارد کنید')
                }else if(Number(value) == 0 || Number(value) < 0){
                    throw new Error('تعداد بازاریاب های مورد نیاز نباید صفر باشد یا عددی منفی')
                }else{
                    return true
                }
            }),
            body('daysNumber').custom(value=>{
                if(!value){
                    throw new Error('تعداد روز های  کمپین را وارد کنید')
                }else if(Number(value) == 0 || Number(value) < 0){
                    throw new Error('تعداد روز های  کمپین نباید صفر باشد یا عددی منفی')
                }else{
                    return true
                }
            }),
            body('percentLevel').notEmpty().withMessage('تخفیف خود را وارد کنید'),
        ]
    }
}

module.exports = new discountCampaignValidator();
