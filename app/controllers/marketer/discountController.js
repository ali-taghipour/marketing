// npm modules
const { v4: uuidv4 } = require("uuid");
const uniqueString = require("generate-unique-id");
const moment = require("moment");
// models
const DiscountCampaignCode = require("../../models/index").DiscountCodeCampaign;
const Marketer = require("../../models/index").Marketer;
const DiscountCodeMarketer = require("../../models/index").DiscountCodeMarketer;
const DiscountCodeMarketerLevel = require("../../models/index").DiscountCodeMarketerLevel;

const { default: axios } = require("axios");


class discountMarketerCodeController {
  async index(req, res) {
    try {
      const discountMarketerCode = await DiscountCodeMarketer.findAll({
        where: { marketerId: req.user.id, verifyByAdmin: true },
      });
      return res.json({
        success: true,
        message: "fetch all discount code for you",
        data: discountMarketerCode,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all discount code",
      });
    }
  }
  async single(req, res) {
    try {
      const { discountMarketerCodeId } = req.params;
      const discountMarketerCode = await DiscountCodeMarketer.findOne({
        where: {
          marketerId: req.user.id,
          id: discountMarketerCodeId,
          verifyByAdmin: true,
        },
      });
      return res.json({
        success: true,
        message: "fetch single discount code for you",
        data: discountMarketerCode,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch single discount code",
      });
    }
  }
  async allDiscountCampaign(req, res) {
    try {
      const marketer = await Marketer.findOne({ where: { id: req.user.id } });
      if (!marketer) {
        res.status(404);
        return res.json({
          success: false,
          message: "cant find the marketer",
        });
      }

      const discountMarketerCode = await DiscountCampaignCode.findAll({
        where: {
          marketerLevelId: marketer.marketerLevelId,
          verifyByAdmin: true,
        },
      });
      return res.json({
        success: true,
        message: "fetch all discount code for you",
        data: discountMarketerCode,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all discount code",
      });
    }
  }
  async create(req, res) {
    try {
      const { discountCodeCampaignId } = req.params;

      const marketer = await Marketer.findOne({ where: { id: req.user.id } });
      if (!marketer) {
        res.status(404);
        return res.json({
          success: false,
          message: "cant find the marketer",
        });
      }

      const discountCampaignMarketerCode = await DiscountCampaignCode.findOne({
        where: {
          marketerLevelId: marketer.marketerLevelId,
          id: discountCodeCampaignId,
        },
      });
      if (!discountCampaignMarketerCode) {
        res.status(404);
        return res.json({
          success: false,
          message: "cant find the discount marketer code ",
        });
      }
      if (
        discountCampaignMarketerCode.marketersNumber <=
          discountCampaignMarketerCode.marketers ||
        discountCampaignMarketerCode.status !== "running"
      ) {
        res.status(400);
        return res.json({
          success: false,
          message:
            "ظرفیت بازار یاب ها به پایان رسیده است یا مهلت شرکت در کمپ به اتمام رسبده است",
        });
      }
      if (
        !moment(new Date()).isBetween(
          discountCampaignMarketerCode.startDate,
          discountCampaignMarketerCode.finishDate
        )
      ) {
        res.status(400);
        return res.json({
          success: false,
          message: "مهلت دریافت کد تخفیف به پایان رسیده است",
        });
      }
      // find the discountCode Marketer
        const discountCodeMarkter = await DiscountCodeMarketer.findOne({
          where: {
            marketerId: marketer.id,
            discountCodeCampaignId: discountCampaignMarketerCode.id,
          },
        });

        if (discountCodeMarkter) {
          res.status(400);
          return res.json({
            success: false,
            message: "you have discount code for this campaign",
          });
        }
        //withdraw wallet discountCampaignMarketerCode.percentLevel
        const price = await DiscountCodeMarketerLevel.findOne({where : {levelId: discountCampaignMarketerCode.percentLevel}});
        try{
          await axios.post("http://23.88.97.228:3000/withdrawal/new",{wallet_id:marketer.walletId,service_id:process.env.service_id,amount:price.price});
        }catch(err){
          return res.status(500).json({success: false,data: [],message:"mission failed!"})
        }

      const discountCodeMarketerData = {
        id: uuidv4(),
        marketerId: marketer.id,
        discountCodeCampaignId: discountCampaignMarketerCode.id,
        code: uniqueString({
          length: 7,
          useLetters: true,
          useNumbers: true,
        }),
        capacity: discountCampaignMarketerCode.maxUseForEachUser,
      };
      const newDiscountCodeMarketer = await DiscountCodeMarketer.create(
        discountCodeMarketerData
      );

    

      const updateDiscountCampaignMarketerCode =
        await DiscountCampaignCode.update(
          { marketers: discountCampaignMarketerCode.marketers + 1 },
          { where: { id: discountCodeCampaignId } }
        );
      return res.json({
        success: true,
        message: "create discount code for marketer",
        data: newDiscountCodeMarketer,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create discount code",
      });
    }
  }
}
module.exports = new discountMarketerCodeController();
