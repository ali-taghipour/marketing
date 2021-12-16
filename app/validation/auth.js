const { check } = require('express-validator');


class authValidator {
    register() {
        return [
            check('username').notEmpty().withMessage('نام کاربری را وارد کنید'),
            check('password').notEmpty().withMessage('رمز عبور را وارد کیند'),
            check('email').notEmpty().withMessage('ایمیل  را وارد کیند'),
            check('phone_number').notEmpty().withMessage('شماره تلفن همراه خود  را وارد کیند'),
            check('role_id').notEmpty().withMessage('سطح کاربر را وارد کیند')
        ]
    }
    login() {
        return [
            check('username').notEmpty().withMessage('نام کاربری را وارد کنید'),
            check('password').notEmpty().withMessage('رمز عبور را وارد کیند')
        ]
    }

    loginByPhone() {
        return [
            check('phone_number').notEmpty().withMessage('شماره موبایل تلفن همراه خود را وارد کنید')
        ]
    }
    loginByPhoneVerify() {
        return [
            check('phone_number').notEmpty().withMessage('شماره موبایل تلفن همراه خود را وارد کنید'),
            check('code').notEmpty().withMessage('کد ارسال شده را وارد کنید')
        ]
    }

}

module.exports = new authValidator();
