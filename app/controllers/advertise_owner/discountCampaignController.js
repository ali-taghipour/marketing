// npm modules
const { v4: uuidv4 } = require("uuid");
// models
// const ProductCampaign = require("../../models/index").ProductCampaign;
const DiscountCodeCampaign = require("../../models/index").DiscountCodeCampaign;
const DiscountCodeMarketerLevel =
  require("../../models/index").DiscountCodeMarketerLevel;
const Advertiser = require("../../models/index").AdvertiseOwner;
const MarketerLevel = require("../../models/index").MarketerLevel;
class discountCampaignController {
  async index(req, res) {
    try {
      const discountCode = await DiscountCodeCampaign.findAll({});
      return res.json({
        success: true,
        message: "fetch all discount code",
        data: discountCode,
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
      const { marketerLevelId, percentLevel } = req.body;

      const advertiser = await Advertiser.findOne({
        where: { id: req.user.id },
      });
      if (!advertiser) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this user",
        });
      }

      const marketerLevel = await MarketerLevel.findOne({
        where: { id: marketerLevelId },
      });
      if (!marketerLevel) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this marketer Level ",
        });
      }

      const discountLevel = await DiscountCodeMarketerLevel.findOne({
        where: {
          id: percentLevel,
        },
      });
      if (!discountLevel) {
        res.status(404);
        return res.json({
          success: false,
          message: "not found this percent level",
        });
      }
      const {
        title,
        description,
        startDate,
        finishDate,
        maxUseForEachUser,
        marketersNumber,
        daysNumber,
        maxUses,
      } = req.body;
      if (
        Number(maxUseForEachUser) * Number(marketersNumber) !==
        Number(maxUses)
      ) {
        res.status(403);
        res.json({
          success: false,
          message: "validation error",
          errors: ["لطفا ظرفیت استفاده رو صحیح وارد کنید"],
        });
      }
      let price =
        Number(marketersNumber) *
        Number(discountLevel.priceForEachMarketer) *
        Number(daysNumber) *
        Number(discountLevel.priceForEachDay) *
        Number(maxUses) *
        Number(discountLevel.priceForEachUse) *
        Number(maxUseForEachUser) *
        Number(discountLevel.priceForUniqueUsersUse);
        
      // add wallet
       try{
        axios.post("http://23.88.97.228:3000/payment/new",{wallet_id:advertiser.walletId,amount:price});
      }catch(err){
        return res.status(500).json({success: false,data: [],message:"mission failed!"})
      }
      //

      const DiscountCampaignData = {
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        title,
        description,
        marketersNumber,
        percentLevel,
        usersUsed: 0,
        startDate,
        finishDate,
        price: Number(price),
        maxUses,
        priceRemainder: 0,
        maxUseForEachUser,
        status: "running",
      };
      const discountCampaign = await DiscountCodeCampaign.create(
        DiscountCampaignData
      );
      return res.json({
        success: true,
        message: `create discount Campaign`,
        data: discountCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create discount Campaign",
      });
    }
  }
  async update(req, res) {
    try {
      const { marketerLevelId, percentLevel } = req.body;
      const { discountCodeId } = req.params;
      const marketerLevel = await MarketerLevel.findOne({
        where: { id: marketerLevelId },
      });
      if (!marketerLevel) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this marketer Level ",
        });
      }

      const discountLevel = await DiscountCodeMarketerLevel.findOne({
        where: {
          id: percentLevel,
        },
      });
      if (!discountLevel) {
        res.status(404);
        return res.json({
          success: false,
          message: "not found this percent level",
        });
      }
      const {
        title,
        description,
        startDate,
        finishDate,
        maxUseForEachUser,
        maxUses,
        marketersNumber,
        daysNumber,
        status,
      } = req.body;
      if (
        Number(maxUseForEachUser) * Number(marketersNumber) !==
        Number(maxUses)
      ) {
        res.status(403);
        res.json({
          success: false,
          message: "validation error",
          errors: ["لطفا ظرفیت استفاده رو صحیح وارد کنید"],
        });
      }
   
      const DiscountCampaignData = {
        marketerLevelId,
        title,
        description,
        marketersNumber,
        percentLevel,
        startDate,
        finishDate,
        price,
        maxUses,
        maxUseForEachUser,
        status,
      };
      const discountCampaign = await DiscountCodeCampaign.update(
        DiscountCampaignData,
        { where: { id: discountCodeId } }
      );

      return res.json({
        success: true,
        message: `updated discount Campaign`,
        data: discountCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update discount Campaign",
      });
    }
  }
}

module.exports = new discountCampaignController();
