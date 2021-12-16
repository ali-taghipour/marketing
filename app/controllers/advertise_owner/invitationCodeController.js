const { v4: uuid } = require("uuid");
const IntroducerCodeAdvertise =
  require("../../models/index").IntroducerCodeAdvertise;
const ProductCampaign = require("../../models/index").ProductCampaign;
const IntroducerCodeMarketer =
  require("../../models/index").IntroducerCodeMarketer;
// const IntroducerCodeAdvertise = require('../../models/index').IntroducerCodeAdvertise;
const Marketer = require("../../models/index").Marketer;
const { createUniqueInvitationCode } = require("../../helpers/index");

class InvitationCodeController {
  async insertCode(req, res, next) {
    try {
      const { invitationCode, campaignId, customerPhone } = req.body;

      const campaign = await ProductCampaign.findOne({
        where: { id: campaignId },
      });
      if (!campaign) throw new Error("cant find this campaign "); //go to next level

      // const invitationCodeFind = await IntroducerCodeAdvertise.findOne({where : {invitationCode}})
      // if(invitationCodeFind) throw new Error("have this invitation code in db") // go to next level

      const result = await IntroducerCodeAdvertise.create({
        id: uuid(),
        invitationCode,
        // marketerId,
        campaignId,
        customerPhone,
        advertiseId: req.user.id,
      });
      return res.status(201).json({
        success: true,
        message: "create invitation Code",
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCodesCreatedByAdvertiser(req, res, next) {
    try {
      const advertiseId = req.user.id;
      const allCodes = await IntroducerCodeAdvertise.findAll({
        where: { advertiseId },
      });
      return res.status(200).json({
        success: true,
        message: "fetch all codes created by advertiser",
        data: allCodes,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
 async getAllCodeCreatedByMarketer(req, res, next) {
    try {
      const { linkCampaignId } = req.params;
      const allCodes = await IntroducerCodeMarketer.findAll({
        where: { linkCampaignId  },
      });
      return res.status(200).json({
        success: true,
        message: "fetch all codes created by marketer",
        data: allCodes,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new InvitationCodeController();
