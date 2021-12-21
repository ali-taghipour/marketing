const {v4 : uuid} = require("uuid");
const ProductCampaign = require('../../models/index').ProductCampaign;
const BuyLinkMarketer = require('../../models/index').BuyLinkMarketer;
const Marketer = require('../../models/index').Marketer;
const Product = require('../../models/index').Product;

const LinkCampaign =
  require("../../models/index").LinkCampaign;
  const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;
  const { default: axios } = require("axios");

class BuyLinkController {
    async links(req, res, next) {
      try {
        const {productCampaignId} = req.params
        const productCampaign = await ProductCampaign.findOne({where : {id : productCampaignId}})
        // if(productCampaign) // go to next level
        const result = await BuyLinkMarketer.findAll({where : {productCampaignId}})
        res.status(201).json({
          success : true,
          message : "find all links",
          data : result
        })
      } catch (error) {
          next(error)
      }
    }
    async buyLinkProduct(req, res, next){
      try {
        const {productCampaignId} = req.params;
        const marketer = await Marketer.findOne({where : {id : req.user.id}})
        if(!marketer) throw new Error("not found marketer") // goto next level
        const productCampaign = await ProductCampaign.findOne({where : {id : productCampaignId}})
        if(!productCampaign)  throw new Error("not found product campaign") // go to next level
        const buyLinkProductData = {
            id :  uuid().toString(),
            marketerId : req.user.id,
            productCampaignId,
            link : "https://localhost:3000/product/:productID/:marketerID"
        }

         //withdraw wallet LinkCampaign.plan
         const campaignPlan = await LinkCampaign.findOne({where :{id: campaignId}});
         const priceCampaign = await IntroducerCodeMarketerLevel.findOne({where :{levelId: campaignPlan.plan}});

         try{
          const response = await axios.post("http://23.88.97.228:3000/part/new",{name: campaignId ,service_id: process.env.service_id,wallet_id:marketer.walletId,amount:priceCampaign.price},{
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
  


        const result = await BuyLinkMarketer.create({...buyLinkProductData})
        res.status(201).json({
          success : true,
          message : "link buyed for marketer",
          data :  result
        })
      } catch (error) {
          next(error)
      }
    }
    async buyLinkProductUser(req, res, next){
      try {
        const {productCampaignId} = req.params;
        const buyLink = await BuyLinkMarketer.findOne({where : {productCampaignId, marketerId : req.user.id}});
        if(!buyLink) throw new Error("not fund Buy Link") //go to next level

        const productCampaign = await productCampaign.findOne({where : {id : productCampaignId}});
        if(!productCampaign) throw new Error("not fund product campaign"); // go to next level;

        const product = await Product.findOne({where : {id : productCampaign.productId}})
        if(!product) throw new Error("not fund product") // go to next level
        const {count , postalcode, address, phoneNumber , firstName , lastName , } = req.body;
        const price = parseInt(count, 10) * (+product?.price || 0);
        const buyLinkProductUserData = {
            id :  uuid().toString(),
            postalcode,
            address,
            phoneNumber,
            price,
            marketerId,
            productCampaignId
        }

        const result = await BuyLinkUserData.create({...buyLinkProductUserData})
        res.status(201).json({
          success : true ,
          message : "link buyed for data",
          data :  result
        })
      } catch (error) {
          next(error)
      }
    }
}

module.exports = new BuyLinkController();
