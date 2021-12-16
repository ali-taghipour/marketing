const { body } = require('express-validator');


class recoveyValidator {
  recoveryByLastPassword() {
      return [
        body('username').notEmpty().withMessage(' نام کاربری رو وارد نمایید'),
        body('last_oassword').notEmpty().withMessage(' آخرین رمز عبور خود را وارد کنید'),
      ]
  }
  recoveryByNewPassword() {
      return [
        body('username').notEmpty().withMessage('نام کاربری رو وارد نمایید'),
        body('new_password').notEmpty().withMessage('آخرین رمز عبور خود را وارد کنید'),
        body('username').notEmpty().withMessage('نام کاربری رو وارد نمایید'),
        body('security_question_id').notEmpty().withMessage('سوال امنیتی خود را وارد کنید'),
        body('answer').notEmpty().withMessage('جواب سوال امنیتی خود را وارد کنید'),
      ]
  }
  securityAnswer() {
      return [
        body('security_question_id').notEmpty().withMessage('سوال امنیتی خود را وارد کنید'),
        body('answer').notEmpty().withMessage('جواب سوال امنیتی خود را وارد کنید'),
      ]
  }

}

module.exports = new recoveyValidator();
