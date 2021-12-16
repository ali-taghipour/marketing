const { body, check  } = require('express-validator');

class productCampaignValidator {
    createOrUpdate() {
        return [
            body('title').notEmpty().withMessage('عنوان  را وارد کنید'),
            body('description').notEmpty().withMessage('توضیحات  را وارد کنید'),
            body('type').notEmpty().withMessage(' نوع کمپین را وارد کنید'),
            body('productId').notEmpty().withMessage('آیدی محصول را وارد کنید'),
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
                    throw new Error('تعداد روز های کمپین را وارد کنید')
                }else if(Number(value) == 0 || Number(value) < 0){
                    throw new Error('تعداد روز های کمپین نباید صفر باشد یا عددی منفی')
                }else{
                    return true
                }
            }),
            body('smsNumber').custom(value=>{
                if(!value){
                    throw new Error('تعداد پیامک های مورد نیاز را وارد کنید')
                }else if(Number(value) == 0 || Number(value) < 0){
                    throw new Error('تعداد پیامک های مورد نیاز نباید صفر باشد یا عددی منفی')
                }else{
                    return true
                }
            }),
            body('actNumber').custom(value=>{
                if(!value){
                    throw new Error('تعداد act های مورد نیاز را وارد کنید')
                }else if(Number(value) == 0 || Number(value) < 0){
                    throw new Error('تعداد act های مورد نیاز نباید صفر باشد یا عددی منفی')
                }else{
                    return true
                }
            }),
            // body('price').notEmpty().withMessage(' قیمت  را وارد کنید'),
            body('plan').notEmpty().withMessage(' پلن خود را وارد کنید'),
            // body('priceRemainder').notEmpty().withMessage('priceRemainder را وارد کنید')
        ]
    }
}

module.exports = new productCampaignValidator();