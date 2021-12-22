const schedule = require('node-schedule');

const Marketer = require("../app/models/index").Marketer;

const DiscountCodeCampaign = require("../app/models/index").DiscountCodeCampaign;
const LinkCampaign = require("../app/models/index").LinkCampaign;
const ProductCampaign = require("../app/models/index").ProductCampaign;

const DiscountCodeMarketer = require("../app/models/index").DiscountCodeMarketer;
const DiscountCodeMarketerLevel = require("../app/models/index").DiscountCodeMarketerLevel;

const SMSPanelMarketer = require("../app/models/index").SMSPanelMarketer;
const SMSPanelMarketerLevel = require("../app/models/index").SMSPanelMarketerLevel;
const BuyLinkMarketer = require("../app/models/index").BuyLinkMarketer;
const BuyLinkMarketerLevel = require("../app/models/index").BuyLinkMarketerLevel;

const ShareLinkMarketer = require("../app/models/index").ShareLinkMarketer;
const ShareLinkMarketerLevel = require("../app/models/index").ShareLinkMarketerLevel;
const IntroducerCodeMarketer = require("../app/models/index").IntroducerCodeMarketer;
const IntroducerCodeMarketerLevel = require("../app/models/index").IntroducerCodeMarketerLevel;


const scaduale = schedule.scheduleJob('0 0 */2 * * *', function(){
    changeStatusCampaign(DiscountCodeCampaign,"discount");
    changeStatusCampaign(LinkCampaign,"link");
    changeStatusCampaign(ProductCampaign,"product");
});


const changeStatusCampaign = (Modelname,modelType) => {
    Modelname.update({ status : 'blocked' },{
        where: {
            expiredAt: {
            $lt: new Date()
        }
        }
    });

     // after 7 days
    Modelname.update({ status : 'expired' },{
        where: {
            expiredAt: {
            $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        status: "blocked"
        }
    });


    // spend from part
    Modelname.findAll({where: {status : 'expired'}})
    .then(campaign => {
        const price = campaign.price;
        const marketersNumber = campaign.marketersNumber;

        const amountOfMoneyForEachMarketer = Math.floor(price/marketersNumber);

        //find marketers for this campaign
        if(modelType === "discount"){
            // calculate percent for marketer and parent
            const percent = await DiscountCodeMarketerLevel.findOne({where : {levelId: campaign.percentLevel}});

            const dcms = await DiscountCodeMarketer.findAll({});
            dcms.forEach(async (dcm) => {
                const marketer = await Marketer.findOne({where: {id: dcm.marketerId}});
                const parentMarketer = await Marketer.findOne({where: {id: marketer.parentMarketerId}});   
                
                spendPart(campaign.partId,amountOfMoneyForEachMarketer,marketer.walletId,percent.marketerPercent,
                parentMarketer.walletId,percent.parentMarketerPercent);
            })
        }else if(modelType === "link"){
            // calculate percent for marketer and parent for share link
            const shareLinkPercent = await ShareLinkMarketerLevel.findOne({where : {levelId: campaign.plan}});

            const slms = await ShareLinkMarketer.findAll({});
            slms.forEach(async (slm) => {
                const marketer = await Marketer.findOne({where: {id: slm.marketerId}});
                const parentMarketer = await Marketer.findOne({where: {id: marketer.parentMarketerId}});   
                
                spendPart(campaign.partId,amountOfMoneyForEachMarketer,marketer.walletId,shareLinkPercent.marketerPercent,
                parentMarketer.walletId,shareLinkPercent.parentMarketerPercent);
            })

            // calculate percent for marketer and parent for introducer code
            const introducerCodePercent = await IntroducerCodeMarketerLevel.findOne({where : {levelId: campaign.plan}});

            const icms = await IntroducerCodeMarketer.findAll({});
            icms.forEach(async (icm) => {
                const marketer = await Marketer.findOne({where: {id: icm.marketerId}});
                const parentMarketer = await Marketer.findOne({where: {id: marketer.parentMarketerId}});   
                
                spendPart(campaign.partId,amountOfMoneyForEachMarketer,marketer.walletId,introducerCodePercent.marketerPercent,
                parentMarketer.walletId,introducerCodePercent.parentMarketerPercent);
            })
        }else if(modelType === "product"){
            // calculate percent for marketer and parent for buy link
            const buyLinkPercent = await BuyLinkMarketerLevel.findOne({where : {levelId: campaign.plan}});

            const blms = await BuyLinkMarketer.findAll({});
            blms.forEach(async (blm) => {
                const marketer = await Marketer.findOne({where: {id: blm.marketerId}});
                const parentMarketer = await Marketer.findOne({where: {id: marketer.parentMarketerId}});   
                
                spendPart(campaign.partId,amountOfMoneyForEachMarketer,marketer.walletId,buyLinkPercent.marketerPercent,
                parentMarketer.walletId,buyLinkPercent.parentMarketerPercent);
            })

            // calculate percent for marketer and parent for sms panel
            const iSMSPanelPercent = await SMSPanelMarketerLevel.findOne({where : {levelId: campaign.plan}});

            const smsms = await SMSPanelMarketer.findAll({});
            smsms.forEach(async (smsm) => {
                const marketer = await Marketer.findOne({where: {id: smsm.marketerId}});
                const parentMarketer = await Marketer.findOne({where: {id: marketer.parentMarketerId}});   
                
                spendPart(campaign.partId,amountOfMoneyForEachMarketer,marketer.walletId,iSMSPanelPercent.marketerPercent,
                parentMarketer.walletId,iSMSPanelPercent.parentMarketerPercent);
            })
        }

    }).catch(err => {
        console.log(err)
    });

    
}


const spendPart = async (partId,amount,marketer_walletId,marketer_percent,parent_marketer_walletId,parent_marketer_percent) => {
    try{
        const response = await axios.post(`http://23.88.97.228:3000/part/${partId}/spend`,{description: "spend money" ,service_id: process.env.service_id,amount:amount,sections: [
            {
                wallet_id: marketer_walletId,
                percent: marketer_percent
            },
            {
                wallet_id: parent_marketer_walletId,
                percent: parent_marketer_percent
            }
        ],},{
          headers: {
            'authorization': "Bearer " + process.env.admin_token,
              service: "shid_news",
              auth_basic: "Basic c2hpZDoxMjM0NTY3OA==",
          }});

          if(!response.status){
            return res.status(500).json({success: false,data: [],message:response.message})
          }
      }catch(err){
        return res.status(500).json({success: false,data: [],message:err})
      }
}
 
