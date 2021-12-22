const Report = require("../../models/index").Report;

const ProductCampaign = require("../../models/index").ProductCampaign;
const LinkCampaign = require("../../models/index").LinkCampaign;
const DiscountCodeCampaign = require("../../models/index").DiscountCodeCampaign;


class ReportController{
    async getAll(req,res){
        try{
            const reportedCampaigns = await Report.findAll({where: {campaignId: campaignId}});

            reportedCampaigns.forEach(campaign => {
                if(campaign.type === "product"){
                    const result = ProductCampaign.findOne({where: {id: campaign.id}});
                    if(!result){
                        res.status(404).json({
                            success:false,
                            message: "موردی یافت نشد!",
                            data: []
                        })
                    }

                    res.status(200).json({
                        success:true,
                        message: "",
                        data: result
                    })
                }else if(campaign.type === "discount"){
                    const result = DiscountCodeCampaign.findOne({where: {id: campaign.id}});
                    if(!result){
                        res.status(404).json({
                            success:false,
                            message: "موردی یافت نشد!",
                            data: []
                        })
                    }

                    res.status(200).json({
                        success:true,
                        message: "",
                        data: result
                    })
                }else if(campaign.type === "link"){
                    const result = LinkCampaign.findOne({where: {id: campaign.id}});
                    if(!result){
                        res.status(404).json({
                            success:false,
                            message: "موردی یافت نشد!",
                            data: []
                        })
                    }

                    res.status(200).json({
                        success:true,
                        message: "",
                        data: result
                    })
                }
            })

        }catch(error){
            next(error)
        }
    }
}

module.exports = new ReportController();