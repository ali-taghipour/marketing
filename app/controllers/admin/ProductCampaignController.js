// npm modeuls

// models
const ProductCampaign = require("../../models/index").ProductCampaign;

class productCampaignController {
  async index(req, res) {
    try {
      const productCampaign = await ProductCampaign.findAll();
      return res.json({
        success: true,
        message: "fetch all campaign",
        data: productCampaign,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "cant fetch all campaign",
      });
    }
  }

  async verifyByAdmin(req, res) {
    try {
      const { campaignId } = req.params;
      const { verifyByAdmin } = req.body;
      if(typeof verifyByAdmin !== "boolean"){
          return res.json({
              success : false ,
              message : "please enter the boolean"
          })
      }
      const updateProductCamapign = await ProductCampaign.update(
        { verifyByAdmin: verifyByAdmin},
        { where: { id: campaignId } }
      );
      if (updateProductCamapign[0] == 0) {
        res.status(404);
        return res.json({
          success: false,
          message: "not fuond the campaign",
        });
      }
      return res.json({
          success : true , 
          message : "update the verifyByAdmin for product campaign"
      })
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        message: "cant change the campaign verify",
      });
    }
  }
}

module.exports = new productCampaignController();
