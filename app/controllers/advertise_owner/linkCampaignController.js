// npm mudoles
const { v4: uuidv4 } = require("uuid");
const randomNumber = require("number-random");
const fs = require("fs");
const path = require("path");
// models
const Link = require("../../models/index").Link;
const Advertiser = require("../../models/index").AdvertiseOwner;
const Image = require("../../models/index").Image;
const LinkCampaign = require("../../models/index").LinkCampaign;
const MarketerLevelId = require("../../models/index").MarketerLevel;
const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;
const ShareLinkMarketerLevel =
  require("../../models/index").ShareLinkMarketerLevel;
const { default: axios } = require("axios");
class linkCampaignController {
  async index(req, res) {
    try {
      const allCampaign = await LinkCampaign.findAll({
        where: { advertiseOwnerId: req.user.id },
      });
      return res.json({
        success: true,
        message: "fetch all link campaign ",
        data: allCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all link campaign",
      });
    }
  }
  async single(req, res) {
    try {
      const { campaignId } = req.params;
      const campaign = await LinkCampaign.findOne({
        where: { advertiseOwnerId: req.user.id, id: campaignId },
      });
      return res.json({
        success: true,
        message: `fetch ${campaign.title} links campaing`,
        data: campaign,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "campaign id is not true",
      });
    }
  }
  async create(req, res) {
    try {
      if (!req.file) {
        res.status(403);
        return res.json({
          success: false,
          message: "validation errror",
          errors: ["عکس را وارد نمایید"],
        });
      }
      const { linkId } = req.body;
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
    
      const link = await Link.findOne({ where: { id: linkId } });
      if (!link) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this link",
        });
      }
      let price;
      const {
        title,
        description,
        type,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        clickNumber,
        registerNumber,
        actNumber,
        plan,
      } = req.body;

      // marketer level id
      const marketerLevel = await MarketerLevelId.findOne({
        where: { id: marketerLevelId },
      });
      if (!marketerLevel) {
        res.status(404);
        return res.json({
          success: false,
          message: "marketer level id not fuond",
        });
      }

      if (type == "ShareLink") {
        const linkLevel = await ShareLinkMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!linkLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the share link level",
          });
        }
        price =
          marketersNumber *
          linkLevel.priceForEachMarketer *
          daysNumber *
          linkLevel.priceForEachDay *
          clickNumber *
          linkLevel.priceForEachClick *
          actNumber *
          linkLevel.priceForEachAct;

         

        // wallet payment
        try{
          await axios.post("http://23.88.97.228:3000/payment/new",{wallet_id:advertiser.walletId,amount:price});
        }catch(err){
          return res.status(500).json({success: false,data: [],message:"mission failed!"})
        }
        


      } else if (type == "IntroducerCode") {
        const introducerLevel = await IntroducerCodeMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!introducerLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the introducer  level",
          });
        }
        price =
          marketersNumber *
          introducerLevel.priceForEachMarketer *
          daysNumber *
          introducerLevel.priceForEachDay *
          actNumber *
          introducerLevel.priceForEachRegister;
      }

       // wallet payment
       try{
        await axios.post("http://23.88.97.228:3000/payment/new",{wallet_id:advertiser.walletId,amount:price});
      }catch(err){
        return res.status(500).json({success: false,data: [],message:"mission failed!"})
      }

      const linkCampaignData = {
        title,
        description,
        price,
        type,
        linkId,
        marketerLevelId,
        marketersNumber,
        verifyByAdmin: false,
        registerNumber,
        daysNumber,
        clickNumber,
        actNumber,
        plan,
        priceRemainder: 0,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        status: "running",
      };
      const newLinkCampaign = await LinkCampaign.create(linkCampaignData);
      // create new image
      const imageData = {
        id: uuidv4(),
        model: "LinkCampaign",
        modelId: newLinkCampaign.id,
        name: newLinkCampaign.title,
        originalUrl: `${req.file.destination}/${req.file.filename}`,
        thumbnailUrl: `http://${req.hostname}:${process.env.PORT || 3000}/${
          req.file.destination.slice(2) + "/" + req.file.filename
        }`,
      };
      const newImage = await Image.create(imageData);

      
      return res.json({
        success: true,
        message: `create link campaign => ${newLinkCampaign.title}`,
        data: newLinkCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create link campaign",
      });
    }
  }
  async update(req, res) {
    try {
      const { linkCampaignId } = req.params;
      const { linkId } = req.body;
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
      const link = await Link.findOne({ where: { id: linkId } });
      if (!link) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this link",
        });
      }
      let price;
      const {
        title,
        description,
        // price,
        type,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        clickNumber,
        registerNumber,
        actNumber,
        plan,
      } = req.body;
      // marketer level id
      const marketerLevel = await MarketerLevelId.findOne({
        where: { id: marketerLevelId },
      });
      if (!marketerLevel) {
        res.status(404);
        return res.json({
          success: false,
          message: "marketer level id not fuond",
        });
      }
      if (type == "ShareLink") {
        const linkLevel = await ShareLinkMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!linkLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the share link level",
          });
        }
        price =
          marketersNumber *
          linkLevel.priceForEachMarketer *
          daysNumber *
          linkLevel.priceForEachDay *
          clickNumber *
          linkLevel.priceForEachClick *
          actNumber *
          linkLevel.priceForEachAct;
      } else if (type == "IntroducerCode") {
        const introducerLevel = await IntroducerCodeMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!introducerLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the introducer  level",
          });
        }
        price =
          marketersNumber *
          introducerLevel.priceForEachMarketer *
          daysNumber *
          introducerLevel.priceForEachDay *
          actNumber *
          introducerLevel.priceForEachRegister;
      }
      const linkCampaignData = {
        title,
        description,
        price,
        type,
        linkId,
        marketerLevelId,
        marketersNumber,
        verifyByAdmin: false,
        registerNumber,
        daysNumber,
        clickNumber,
        actNumber,
        plan,
        priceRemainder: 0,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        status: "running",
      };

      const updateLinkCampaign = await LinkCampaign.update(linkCampaignData, {
        where: { id: linkCampaignId },
      });
      if (req.file) {
        const image = await Image.findOne({
          where: { modelId: linkCampaignId, model: "LinkCampaign" },
        });
        // remove the link image
        const removeImage = await fs.unlinkSync(
          path.resolve(image.originalUrl)
        );
        //
        // update image
        const imageData = {
          name: title,
          originalUrl: `${req.file.destination}/${req.file.filename}`,
          thumbnailUrl: `http://${req.hostname}:${process.env.PORT || 3000}/${
            req.file.destination.slice(2) + "/" + req.file.filename
          }`,
        };
        const updateImage = await Image.update(imageData, {
          where: { model: "LinkCampaign", modelId: linkCampaignId },
        });
      }
      return res.json({
        success: true,
        message: `update link campaign `,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update link campaign",
      });
    }
  }
}

module.exports = new linkCampaignController();
