const { v4: uuid } = require("uuid");
const IntroducerCodeMarketer =
  require("../../models/index").IntroducerCodeMarketer;
const { createUniqueInvitationCode } = require("../../helpers/index");

const LinkCampaign =
  require("../../models/index").LinkCampaign;
  const Marketer = require("../../models/index").Marketer;
  const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;
  const {axios} = require("axios").Axios;

class InvitationCodeController {
  async index(req, res) {
    try {
      const allCode = await IntroducerCodeMarketer.findAll({
        where: { marketerId: req.user.id },
      });
      return res.json({
        success: true,
        message: "fetch all invitation code for marketer",
        data: allCode,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "we cant fetch all code",
      });
    }
  }
  async getCodeForCampaign(req, res) {
    try {
      const { linkCampaignId } = req.params;
      const code = await IntroducerCodeMarketer.findOne({
        where: { marketerId: req.user.id, linkCampaignId },
      });
      return res.json({
        success: true,
        message: "fetch invitation code for marketer and campaign",
        data: code,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "we cant fetch code",
      });
    }
  }
  async buyInvitationCode(req, res, next) {
    try {
      let invitationCode = await createUniqueInvitationCode();
      const { campaignId } = req.params;
      const introducerCodeForMarketer = await IntroducerCodeMarketer.findOne({
        linkCampaignId: campaignId,
        marketerId: req.user.id,
      });
      if (introducerCodeForMarketer) {
        res.status(400);
        return res.json({
          success: false,
          message: "you have code for this campaign",
        });
      }
      const result = await IntroducerCodeMarketer.create({
        id: uuid(),
        invitationCode,
        marketerId: req.user.id,
        linkCampaignId: campaignId,
      });

      const marketer = await Marketer.findOne({ where: { id: req.user.id } });

      //withdraw wallet LinkCampaign.plan
      const campaignPlan = await LinkCampaign.findOne({ where: {id: campaignId}});
      const price = await IntroducerCodeMarketerLevel.findOne({ where: {levelId: campaignPlan.plan}});

      try{
        const response = await axios.post("http://23.88.97.228:3000/part/new",{name: campaignId ,service_id: process.env.service_id,wallet_id:marketer.walletId,amount:price.price},{
          headers: {
            'authorization': req.headers['authorization'],
              service: "shid_news",
              auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          }});

          if(!response.status){
            return res.status(500).json({success: false,data: [],message:response.message})
          }
      }catch(err){
        return res.status(500).json({success: false,data: [],message:err})
      }

      return res.status(201).json({
        success: true,
        message: "create the invitation code",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "we cant get code for marketer",
      });
    }
  }
}

module.exports = new InvitationCodeController();
