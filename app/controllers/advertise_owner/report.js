const Report = require("../../models/index").Report;
const {v4 : uuid} = require("uuid");

class ReportController{
    async create(req,res){
        const campaignId = req.campaignId;
        const campaignType = req.campaignType.toLowercase();

        if(campaignType !== "product" || campaignType !== "discount" || campaignType !== "link"){
            return res.status(400).json({
                success: false,
                message: "نوع کمپین اشتباه است!",
                data: []
            })
        }

        try{
            const reportedCampaign = await Report.findOne({where: {campaignId: campaignId}});
            if(!reportedCampaign){
                const reportData = {
                    id: uuid().toString(),
                    campaignType:campaignType,
                    campaignId: campaignId
                }
    
                const result = await Report.create({...reportData});
    
                res.status(201).json({
                    success: true,
                    message: "گزارش تخلف با موفقیت ثبت شد.",
                    data: result
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: "گزارش تخلف تکراری است!",
                    data: result
                })
            }
        }catch(error){
            next(error)
        }
    }
}

module.exports = new ReportController();