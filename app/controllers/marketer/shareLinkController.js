const {v4 : uuid} = require("uuid");
const ShareLinkMarketer = require("../../models/index").ShareLinkMarketer;

const LinkCampaign =
  require("../../models/index").LinkCampaign;
  const Marketer = require("../../models/index").Marketer;
  const IntroducerCodeMarketerLevel =
  require("../../models/index").IntroducerCodeMarketerLevel;

module.exports = {
    async shareLinkCompaign(req, res, next){
      try {
        let uniqueCode = uuid();
        const shareLinkRecord = await ShareLinkMarketer.findOne({where : { uniqueCode }});
        
        if(shareLinkRecord) uniqueCode = uuid()
        const shareLinkData = {
            id :  uuid().toString(),
            marketerId : req.user.id,
            linkCampaignId : uuid().toString(),
            uniqueCode,
            link : "http://xyz.com/product"
        }

        const marketer = await Marketer.findOne({ where: { id: req.user.id } });

        //withdraw wallet LinkCampaign.plan
        const campaignPlan = await LinkCampaign.findOne({where : {id: shareLinkData.linkCampaignId}});
        const priceCampaign = await IntroducerCodeMarketerLevel.findOne({where : {levelId: campaignPlan.plan}});

        try{
          const response = await axios.post("http://23.88.97.228:3000/part/new",{name: shareLinkData.linkCampaignId ,service_id: process.env.service_id,wallet_id:marketer.walletId,amount:priceCampaign.price},{
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

        const result = await ShareLinkMarketer.create({...shareLinkData})
        res.status(201).json({
          success : true ,
          message : "link sheared create",
          data: result
        })
      } catch (error) {
          next(error)
      }
    }
}
