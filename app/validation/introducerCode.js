const {body} = require('express-validator');

class IntroducerCode {
  create(){
    return [
      // body('marketerId').notEmpty().withMessage("لطفا آیدی بازاریاب را وارد کنید"),
      body('invitationCode').notEmpty().withMessage("کد معرفی را وارد نمایید"),
      body('campaignId').notEmpty().withMessage("آیدی کمپین مورد نظر را وارد کنید"),
      body('customerPhone').notEmpty().withMessage("شماره تلفن همراه بازاریاب را وارد کنید")
    ]
  }
}

module.exports = new IntroducerCode();
