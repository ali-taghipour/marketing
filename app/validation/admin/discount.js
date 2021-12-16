const { body } = require("express-validator");

class discountPanelValidator {
  createOrUpadte() {
    return [
      body("percent").notEmpty().withMessage("درصد تخفیف را وارد کنید"),
      body("marketerLevelId")
        .notEmpty()
        .withMessage("آیدی سطح بازاریاب را وارد کنید"),
      // body('advertiseOwnerPercent').notEmpty().withMessage('advertiseOwnerPercent  را وارد کنید'),
      body("priceForEachUse").custom((value) => {
        if (!value) {
          throw new Error("قیمت برای هر بار استفاده نباید خالی باشد");
        } else if (Number(value) == 0 || Number(value) < 0) {
          throw new Error(
            "قیمت برای هر بار استفاده نباید صفر یا عددی منفی باشد"
          );
        } else {
          return true;
        }
      }),
      body("priceForUniqueUsersUse")
        .notEmpty()
        .withMessage("priceForUniqueUsersUse  را وارد کنید"),
      body("marketerPercent")
        .notEmpty()
        .withMessage("marketerPercent  را وارد کنید"),
      body("parentMarketerPercent")
        .notEmpty()
        .withMessage("parentMarketerPercent را وارد کنید"),
      body("priceForEachMarketer").custom((value) => {
        if (!value) {
          throw new Error("قیمت برای هر روز نباید خالی باشد");
        } else if (Number(value) == 0 || Number(value) < 0) {
          throw new Error(
            "تعداد act های مورد نیاز نباید صفر باشد یا عددی منفی"
          );
        } else {
          return true;
        }
      }),
      body("priceForEachDay").custom((value) => {
        if (!value) {
          throw new Error("قیمت برای هر روز نباید خالی باشد");
        } else if (Number(value) == 0 || Number(value) < 0) {
          throw new Error("قیمت برای هر روز نباید صفر یا عددی منفی باشد");
        } else {
          return true;
        }
      }),
      // body('priceForEachSMS').notEmpty().withMessage('priceForEachSMS را وارد کنید')
      body('price').notEmpty().withMessage('قیمت  را وارد کنید'),
    ];
  }
}
module.exports = new discountPanelValidator();
