// npm modules

// models
const LinkCampaign = require("../../models/index").LinkCampaign;
const ProductCampaign = require("../../models/index").ProductCampaign;
const Markteer = require("../../models/index").Marketer;
class campaignController {
  async allLinkCampaign(req, res) {
    try {
      const marketer = await Markteer.findOne({ id: req.user.id });
      const allLinkCampaignForMarketr = await LinkCampaign.findAll({
        where: {
          verifyByAdmin: true,
          marketerLevelId: marketer.marketerLevelId,
        },
      });
      return res.json({
        success: true,
        message: "fetch all link campaign",
        data: allLinkCampaignForMarketr,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "cant fetch all link campaign",
      });
    }
  }
  async allProductCampaign(req, res) {
    try {
      const marketer = await Markteer.findOne({ id: req.user.id });
      const allProductCampaignForMarketr = await ProductCampaign.findAll({
        where: {
          verifyByAdmin: true,
          marketerLevelId: marketer.marketerLevelId,
        },
      });
      return res.json({
        success: true,
        message: "fetch all product campaign",
        data: allProductCampaignForMarketr,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "cant fetch all product campaign",
      });
    }
  }
}

module.exports = new campaignController();
