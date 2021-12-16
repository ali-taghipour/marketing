// npm modules
const { v4: uuidv4 } = require("uuid");

// models
const DiscountCodeMarketerLevel =
  require("../../models/index").DiscountCodeMarketerLevel;
const MarketerLevel = require("../../models/index").MarketerLevel;
class discountCodeLevelController {
  async index(req, res) {
    try {
      const discountCode = await DiscountCodeMarketerLevel.findAll({});
      return res.json({
        success: true,
        message: "fetch all discount code",
        data: discountCode,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all  discount code",
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
        percent,
        marketerPercent,
        price,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachUse,
        priceForUniqueUsersUse,
        priceType,
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
      const DiscountPanelMarketerLevelData = {
        percent,
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachUse,
        priceForUniqueUsersUse,
        priceForEachDay,
        price,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        priceType,
      };
      const discountPanel = await DiscountCodeMarketerLevel.create(
        DiscountPanelMarketerLevelData
      );

      return res.json({
        success: true,
        message: `create discount panle `,
        data: discountPanel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create discount panel",
      });
    }
  }
  async update(req, res) {
    try {
      const { discountCodeLevelId } = req.params;
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
        advertiseOwnerPercent,
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachUse,
        priceForUniqueUsersUse,
        priceType
      } = req.body;
      const DiscountPanelMarketerLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        marketerLevelId,
        priceForEachUse,
        advertiseOwnerPercent,
        priceForUniqueUsersUse,
        priceType
      };

      const discountPanel = await DiscountCodeMarketerLevel.update(
        DiscountPanelMarketerLevelData,
        { where: { id: discountCodeLevelId } }
      );

      return res.json({
        success: true,
        message: `update discount panle `,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update discount panel",
      });
    }
  }
}

module.exports = new discountCodeLevelController();
