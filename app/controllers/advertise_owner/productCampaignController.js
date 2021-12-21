// npm mudoles
const { v4: uuidv4 } = require("uuid");
const randomNumber = require("number-random");
const fs = require("fs");
const path = require("path");
// models
const Product = require("../../models/index").Product;
const Advertiser = require("../../models/index").AdvertiseOwner;
const MarketerLevelId = require("../../models/index").MarketerLevel;
const Image = require("../../models/index").Image;
const productCampaign = require("../../models/index").ProductCampaign;
const SMSPanelMarketerLevel =
  require("../../models/index").SMSPanelMarketerLevel;
const BuyLinkMarketerLevel = require("../../models/index").BuyLinkMarketerLevel;

class productCampaignController {
  async index(req, res) {
    try {
      const allCampaign = await productCampaign.findAll({
        where: { advertiseOwnerId: req.user.id },
      });
      return res.json({
        success: true,
        message: "fetch all product campaign ",
        data: allCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant fetch all campaign",
      });
    }
  }
  async single(req, res) {
    try {
      const { campaignId } = req.params;
      const campaign = await productCampaign.findOne({
        where: { advertiseOwnerId: req.user.id, id: campaignId },
      });
      return res.json({
        success: true,
        message: `fetch ${campaign.title} products`,
        data: campaign,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "product id is not true",
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
      const { productId } = req.body;
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

      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this product",
        });
      }
      const {
        title,
        description,
        type,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        smsNumber,
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
      let price;
      if (type == "SMSPanel") {
        const smsLevel = await SMSPanelMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!smsLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the sms level",
          });
        }
        price =
          marketersNumber *
          smsLevel.priceForEachMarketer *
          daysNumber *
          smsLevel.priceForEachDay *
          smsNumber *
          smsLevel.priceForEachSMS;

           // wallet payment
          try{
            const response = await axios.post("http://23.88.97.228:3000/part/new",{name: smsLevel.id ,service_id: process.env.service_id,wallet_id:advertiser.walletId,amount:price},{
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

          

      } else if (type == "BuyLink") {
        const buyLink = await BuyLinkMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!buyLink) {
          res.status(404);
          return res.json({
            success: false,
            message: "not found the buy link level",
          });
        }
        price =
          marketersNumber *
          buyLink.priceForEachMarketer *
          daysNumber *
          buyLink.priceForEachDay *
          actNumber *
          buyLink.priceForEachBuy;
      }

       // wallet payment
       try{
        const response = await axios.post("http://23.88.97.228:3000/part/new",{name: buyLink.id ,service_id: process.env.service_id,wallet_id:advertiser.walletId,amount:price},{
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


      const productCampaignData = {
        title,
        description,
        price,
        type,
        verifyByAdmin : false ,
        productId,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        smsNumber,
        actNumber,
        plan,
        priceRemainder: 0,
        id: uuidv4(),
        advertiseOwnerId: req.user.id,
        status: "running",
      };

      const newproductCampaign = await productCampaign.create(
        productCampaignData
      );
      // create new image
      const imageData = {
        id: uuidv4(),
        model: "ProductCampaign",
        modelId: newproductCampaign.id,
        name: newproductCampaign.title,
        originalUrl: `${req.file.destination}/${req.file.filename}`,
        thumbnailUrl: `http://${req.hostname}:${process.env.PORT || 3000}/${
          req.file.destination.slice(2) + "/" + req.file.filename
        }`,
      };

      const newImage = await Image.create(imageData);

      return res.json({
        success: true,
        message: `create product campaign => ${newproductCampaign.title}`,
        data: newproductCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant create product campaign",
      });
    }
  }
  async update(req, res) {
    try {
      const { productCampaignId } = req.params;
      const { productId } = req.body;
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
      const product = await Product.findOne({ where: { id: productId } });
      if (!product) {
        res.status(400);
        return res.json({
          success: false,
          message: "cant find this product",
        });
      }

      const {
        title,
        description,
        type,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        smsNumber,
        actNumber,
        plan,
        status,
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
      let price;
      if (type == "SMSPanel") {
        const smsLevel = await SMSPanelMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!smsLevel) {
          res.status(404);
          return res.json({
            success: false,
            message: "not fuond the sms level",
          });
        }
        price =
          marketersNumber *
          smsLevel.priceForEachMarketer *
          daysNumber *
          smsLevel.priceForEachDay *
          smsNumber *
          smsLevel.priceForEachSMS;
      } else if (type == "BuyLink") {
        const buyLink = await BuyLinkMarketerLevel.findOne({
          where: { id: plan, marketerLevelId },
        });
        if (!buyLink) {
          res.status(404);
          return res.json({
            success: false,
            message: "not found the buy link level",
          });
        }
        price =
          marketersNumber *
          buyLink.priceForEachMarketer *
          daysNumber *
          buyLink.priceForEachDay *
          actNumber *
          buyLink.priceForEachBuy;
      }

      const productCampaignData = {
        title,
        description,
        price,
        type,
        productId,
        marketerLevelId,
        marketersNumber,
        daysNumber,
        smsNumber,
        actNumber,
        status,
        plan,
        priceRemainder: 0,
      };

      const updateProductCampaign = await productCampaign.update(
        productCampaignData,
        { where: { id: productCampaignId } }
      );
      if (req.file) {
        const image = await Image.findOne({
          where: { modelId: productCampaignId, model: "ProductCampaign" },
        });
        // remove the product image
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
          where: { model: "Product", modelId: productCampaignId },
        });
      }
      return res.json({
        success: true,
        message: `update products`,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant update product",
      });
    }
  }
}

module.exports = new productCampaignController();
