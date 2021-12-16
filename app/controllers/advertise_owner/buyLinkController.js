// NPM MODUELS

// MODELS
const BuyLinkMarketer = require("../../models/index").BuyLinkMarketer;
const productCampaign = require("../../models/index").ProductCampaign;
class buyLinkController {
  async index(req, res) {
    const { campaignId } = req.params;
    const campaign = await productCampaign.findAll({
      where: { id: campaignId, advertiseOwnerId: req.user.id },
    });
    const buyLink = await BuyLinkMarketer.findAll({
      where: { productCampaignId: campaign.id },
    });
    return res.json({
      success: true,
      message: "fecth all buy link for this campaign",
      data: buyLink,
    });
  }
}

module.exports = new buyLinkController();
