// npm mudoles
const { v4: uuidv4 } = require("uuid");
// models
const BuyLinkMarketerLevel = require("../../models/index").BuyLinkMarketerLevel;
const MarketerLevel = require("../../models/index").MarketerLevel;

class BuyLinkMarketerLevelController {
  async index(req, res) {
    try {
      const buyLinkLevel = await BuyLinkMarketerLevel.findAll({});
      return res.json({
        success: true,
        message: "fetch all buy Link Level",
        data: buyLinkLevel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all buy Link Level",
      });
    }
  }
  async create(req, res) {
    try {
      const { marketerLevelId } = req.body;
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
      const {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachBuy,
        price,

        priceType,
        advertiseOwnerPercent,
      } = req.body;
      if (Number(parentMarketerPercent) + Number(marketerPercent) > 100) {
        res.status(403);
        return res.json({
          success: false,
          message: "validation error",
          errors: [
            "مجموع درصد بازاریاب و زیر دست بازاریاب نباید بیشتر از صد درصد باشد",
          ],
        });
      }
      const buyLinkLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        advertiseOwnerPercent,
        price,
        priceForEachDay,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        priceForEachBuy,
        priceType,
      };

      const buyLinkMarketerLevel = await BuyLinkMarketerLevel.create(
        buyLinkLevelData
      );

      return res.json({
        success: true,
        message: `create Buy Link Marketer Level`,
        data: buyLinkMarketerLevel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create Buy Link Marketer Level",
      });
    }
  }
  async update(req, res) {
    try {
      const { buyLinkLevelId } = req.params;
      const { marketerLevelId } = req.body;
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
      const {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachBuy,
        advertiseOwnerPercent,
        priceType
      } = req.body;
      const buyLinkLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        advertiseOwnerPercent,
        priceForEachDay,
        marketerLevelId,
        priceForEachBuy,
      };

      const buyLinkLevel = await BuyLinkMarketerLevel.update(buyLinkLevelData, {
        where: { id: buyLinkLevelId },
      });
      return res.json({
        success: true,
        message: `update buy Link Level`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "cant update buy Link Level",
      });
    }
  }
}
module.exports = new BuyLinkMarketerLevelController();
