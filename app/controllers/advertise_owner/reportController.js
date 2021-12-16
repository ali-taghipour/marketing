// MODELS
const productCampaign = require("../../models/index").ProductCampaign;
const linkCampaign = require("../../models/index").LinkCampaign;
const discoutnCodeCampaign = require("../../models/index").DiscountCodeCampaign;
const buyLink = require("../../models/index").BuyLinkMarketer;
const shareLink = require("../../models/index").ShareLinkMarketer;
const IntroducerCode = require("../../models/index").IntroducerCodeMarketer;
const discountCode = require("../../models/index").DiscountCodeMarketer;
const smsCode = require("../../models/index").SMSPanelMarketer;

// NPM MODEULS
const moment = require("moment");
class reportController {
  async productCampaignTimeRange(req, res) {
    const allCampaing = await productCampaign.findAll();
    const { min, max } = req.body;
    const rangeCamapign = allCampaing.filter((campaign) => {
      return moment(campaign.createAt).isBetween(min, max) == true;
    });
    return res.json({
      success: true,
      message: "report the campaign on range data",
      data: rangeCamapign,
    });
  }
  async linkCampaignTimeRange(req, res) {
    const allCampaing = await linkCampaign.findAll();
    const { min, max } = req.body;
    const rangeCamapign = allCampaing.filter((campaign) => {
      return moment(campaign.createAt).isBetween(min, max) == true;
    });
    return res.json({
      success: true,
      message: "report the campaign on range data",
      data: rangeCamapign,
    });
  }
  async discountCampaignTimeRange(req, res) {
    const allCampaing = await discoutnCodeCampaign.findAll();
    const { min, max } = req.body;
    const rangeCamapign = allCampaing.filter((campaign) => {
      return moment(campaign.createAt).isBetween(min, max) == true;
    });
    return res.json({
      success: true,
      message: "report the campaign on range data",
      data: rangeCamapign,
    });
  }
}

module.exports = new reportController();
