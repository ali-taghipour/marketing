const { body } = require('express-validator');


class rolesValidator {
  roles(){
   return [
    body('name').notEmpty().withMessage('لطفا نام سطح دسترسی خود را وارد کنید'),
     body('service_id').notEmpty().withMessage('لطفا ایدی سرویس خود را وارد کنید')
    ]
 }
 setRoleToUser(){
   return [
    body('user_id').notEmpty().withMessage('لطفا ایدی کاربر را وارد کنید')
    ]
 }
 removeRoleFromUser(){
   return [
    body('user_id').notEmpty().withMessage('لطفا ایدی کاربر را وارد کنید')
    ]
 }
}

module.exports = new rolesValidator();
