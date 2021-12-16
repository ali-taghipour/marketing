// npm mudoles
const { v4: uuidv4 } = require("uuid");
// models
const SMSPanelMarketerLevel =
  require("../../models/index").SMSPanelMarketerLevel;
const MarketerLevel = require("../../models/index").MarketerLevel;
class SMSPanelMarketerLevelController {
  async index(req, res) {
    try {
      const SMSPanel = await SMSPanelMarketerLevel.findAll({});
      return res.json({
        success: true,
        message: "fetch all sms panel level ",
        data: SMSPanel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all  sms panel level",
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
        price,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachSMS,
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
      const SMSPanelMarketerLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachSMS,
        price,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        priceType,
      };

      const smsPanel = await SMSPanelMarketerLevel.create(
        SMSPanelMarketerLevelData
      );

      return res.json({
        success: true,
        message: `create sms panle `,
        data: smsPanel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create sms panel",
      });
    }
  }
  async update(req, res) {
    try {
      const { smsLevelId } = req.params;
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
        priceForEachSMS,
        priceType,
      } = req.body;
      const SMSPanelMarketerLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachSMS,
        marketerLevelId,
        priceType,
      };

      const smsPanel = await SMSPanelMarketerLevel.update(
        SMSPanelMarketerLevelData,
        { where: { id: smsLevelId } }
      );

      return res.json({
        success: true,
        message: `update sms panle `,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant udpdate sms panel",
      });
    }
  }
}
module.exports = new SMSPanelMarketerLevelController();
