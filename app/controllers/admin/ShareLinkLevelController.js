// npm mudoles
const { v4: uuidv4 } = require("uuid");
// models
const ShareLinkMarketerLevel =
  require("../../models/index").ShareLinkMarketerLevel;
const MarketerLevel = require("../../models/index").MarketerLevel;
class ShareLinkMarketerLevelController {
  async index(req, res) {
    try {
      const LinkPlane = await ShareLinkMarketerLevel.findAll({});
      return res.json({
        success: true,
        message: "fetch all link panel level ",
        data: LinkPlane,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all link plane level",
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
        price,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        priceForEachClick,
        priceForEachAct,
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
      const ShareLinkMarketerLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        price,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        marketerLevelId,
        priceForEachAct,
        priceForEachClick,
        priceType,
      };

      const linkPanel = await ShareLinkMarketerLevel.create(
        ShareLinkMarketerLevelData
      );

      return res.json({
        success: true,
        message: `create link plane `,
        data: linkPanel,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create link plane",
      });
    }
  }
  async update(req, res) {
    try {
      const { linkLevelId } = req.params;
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
        priceForEachClick,
        priceForEachAct,
        priceType,
      } = req.body;
      const ShareLinkMarketerLevelData = {
        marketerPercent,
        parentMarketerPercent,
        priceForEachMarketer,
        priceForEachDay,
        marketerLevelId,
        priceForEachAct,
        priceForEachClick,
        priceType,
      };

      const linkPanel = await ShareLinkMarketerLevel.update(
        ShareLinkMarketerLevelData,
        { where: { id: linkLevelId } }
      );
      return res.json({
        success: true,
        message: `update link Level panle `,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant udpdate link Level panel",
      });
    }
  }
}
module.exports = new ShareLinkMarketerLevelController();
