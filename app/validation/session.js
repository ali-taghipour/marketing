const { body } = require('express-validator');


class sessionValidator {
  deleteSession() {
      return [
        body('sessionId').notEmpty().withMessage('آیدی سشن را وارد کنید'),
      ]
  }
  blockSession(){
    return [
      body('block_status').notEmpty().withMessage('لطفا session خود را وارد کنید'),
     ]
  }
}

module.exports = new sessionValidator();
