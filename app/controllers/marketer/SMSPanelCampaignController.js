const { v4: uuid } = require("uuid");
// const {SHA256} = require("crypto-js");
// const { update } = require("./socialMediaController");
const { createUniqueCode } = require("../../helpers/index");
// const SMSPanelMarketer = require("../../models/SMSPanelMarketer");
const SMSPanelMarketer = require("../../models/index").SMSPanelMarketer;
const ProductCampaign = require('../../models/index').ProductCampaign;

const LinkCampaign =
  require("../../models/index").LinkCampaign;
  const Marketer = require("../../models/index").Marketer;
  const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;

class SMSPanelMarketerController {
  async index(req, res, next) {
    try {
      const smsPanelMarketer = await SMSPanelMarketer.findAll({ where: { marketerId: req.user.id } });
      return res.json({
        success: true,
        message: "fecth all sms panel marketer",
        data: smsPanelMarketer
      })
    } catch (error) {
      next(error)
    }
  }
  async buyCodeForCompaign(req, res, next) {
    try {
      let { campaignId } = req.body;
      const productCampaign = await ProductCampaign.findOne({ where: { id: campaignId } })
      if (!productCampaign) {
        res.status(404);
        return res.json({
          success: false,
          message: "we cant find the product campaign"
        })
      }
      if(productCampaign.smsNumber == 0 || productCampaign.marketersNumber == 0){
        res.status(400);
        return res.json({
          success : false , 
          message : "ظرفیت بازاریاب ها پر شده است یا تعداد پیامک ها به اتمام رسیده"
        })
      }
      let code = await createUniqueCode();
      const marketerData = {
        id: uuid().toString(),
        marketerId: req.user.id,
        productCampaignId: campaignId,
        code
      }

      const marketer = await Marketer.findOne({ where: { id: req.user.id } });

       //withdraw wallet LinkCampaign.plan
       const campaignPlan = await LinkCampaign.findOne({where : {id: campaignId}});
       const priceCampaign = await IntroducerCodeMarketerLevel.findOne({levelId: campaignPlan.plan});

       try{
         await axios.post("http://23.88.97.228:3000/withdrawal/new",{wallet_id:marketer.walletId,service_id:process.env.service_id,amount:priceCampaign.price});
       }catch(err){
         return res.status(500).json({success: false,data: [],message:"mission failed!"})
       }

      const result = await SMSPanelMarketer.create({ ...marketerData })
      res.status(201).json({
        success: true,
        message: "create the sms panel code",
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = new SMSPanelMarketerController()