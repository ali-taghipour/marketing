// npm mudoles
const { v4: uuidv4 } = require("uuid");
// models
const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;
const MarketerLevel = require("../../models/index").MarketerLevel;
class IntroducerCodeLevelController {
  async index(req, res) {
    try {
      const IntroducerCodeLevel = await IntroducerCodeMarketerLevel.findAll({});
      return res.json({
        success: true,
        message: "fetch all Introducer code level",
        data: IntroducerCodeLevel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all Introducer code level",
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
        priceForEachRegister,
        price,
        advertiseOwnerPercent,
        priceType 
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
      const IntroducerCodeLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        price,
        advertiseOwnerPercent,
        priceForEachDay,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        priceForEachRegister,
        priceType
      };

      const IntroducerCodeLevel = await IntroducerCodeMarketerLevel.create(
        IntroducerCodeLevelData
      );

      return res.json({
        success: true,
        message: `create Introducer code level`,
        data: IntroducerCodeLevel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create Introducer code level",
      });
    }
  }
  async update(req, res) {
    try {
      const { IntroducerLevelId } = req.params;
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
        advertiseOwnerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachRegister,
        priceType
      } = req.body;
      const IntroducerCodeLevelData = {
        marketerPercent,
        advertiseOwnerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        marketerLevelId,
        priceForEachRegister,
        priceType
      };

      const linkPanel = await IntroducerCodeMarketerLevel.update(
        IntroducerCodeLevelData,
        { where: { id: IntroducerLevelId } }
      );
      return res.json({
        success: true,
        message: `update Introducer code level`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "cant Introducer code level",
      });
    }
  }
}
module.exports = new IntroducerCodeLevelController();
