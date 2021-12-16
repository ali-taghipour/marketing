// npm moduels

// models
const DiscountCodeCampaign = require("../../models/index").DiscountCodeCampaign;
class discountCodeCampaignController {
  async index(req, res) {
    try {
      const allDiscountCode = await DiscountCodeCampaign.findAll({});
      return res.json({
        success: true,
        message: "fetch all discount code campaign",
        data: allDiscountCode,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "we cant fetch all discount campaign",
      });
    }
  }
  async verifyByAdmin(req, res) {
    try {
      const { campaignId } = req.params;
      const { verifyByAdmin } = req.body;
      if (typeof verifyByAdmin !== "boolean") {
        return res.json({
          success: false,
          message: "please enter the boolean",
        });
      }
      const updateDiscountCodeCampaign = await DiscountCodeCampaign.update(
        { verifyByAdmin: verifyByAdmin },
        { where: { id: campaignId } }
      );
      if (updateDiscountCodeCampaign[0] == 0) {
        res.status(404);
        return res.json({
          success: false,
          message: "not fuond the campaign",
        });
      }
      return res.json({
        success: true,
        message: "update the verifyByAdmin for discount campaign",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "cant change the campaign verify",
      });
    }
  }
}

module.exports = new discountCodeCampaignController();
