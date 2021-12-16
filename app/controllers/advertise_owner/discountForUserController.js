// npm modules
const { v4: uuidv4 } = require("uuid");
// models
const DiscountCodeUserData = require("../../models/index").DiscountCodeUserDate;
const DiscountCodeMarketer = require("../../models/index").DiscountCodeMarketer;
class discountForUserController {
  async index(req, res) {
    try {
      const { campaignId } = req.params;
      const allDiscountCodeUserData = await DiscountCodeUserData.findAll({
        where: { discountCodeCampaignId: campaignId },
      });
      return res.json({
        success: true,
        message: "fecth all discount code data",
        data: allDiscountCodeUserData,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      return res.json({
        success: false,
        message: "we cant fetch all discount user data code",
      });
    }
  }
  async create(req, res) {
    try {
      const { code, userId } = req.body;
      const discountCodeMarketer = await DiscountCodeMarketer.findOne({
        where: { code: code },
      });
      if (!discountCodeMarketer || discountCodeMarketer.capacity == 0) {
        res.status(400);
        return res.json({
          success: false,
          message:
            "کد وارد شده اشتباه میباشد یا ظرفیت استفاده از این کد به پایان رسیده است",
        });
      }
      const updateDiscountCodeMarketer = await DiscountCodeMarketer.update(
        { capacity: discountCodeMarketer.capacity - 1 },
        { where: { id: discountCodeMarketer.id } }
      );

      //   walleting
      const addDiscountForUserData = {
        discountCodeCampaignId: discountCodeMarketer.discountCodeCampaignId,
        discountCodeMarketerId: discountCodeMarketer.id,
        userId,
        id: uuidv4(),
      };
      const addDiscountForUser = await DiscountCodeUserData.create(
        addDiscountForUserData
      );
      return res.json({
        success: true,
        message: "add discount code for user",
        data: addDiscountForUserData,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      return res.json({
        success: false,
        message: "we cant use discount code",
      });
    }
  }
}

module.exports = new discountForUserController();
