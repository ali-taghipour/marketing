const schedule = require('node-schedule');

const CodeCampaign = require("../app/models/index").CodeCampaign;
const DiscountCodeCampaign = require("../app/models/index").DiscountCodeCampaign;
const LinkCampaign = require("../app/models/index").LinkCampaign;
const ProductCampaign = require("../app/models/index").ProductCampaign;

const SMSPanelMarketer = require("../app/models/SMSPanelMarketer");
const IntroducerCodeMarketer = require("../app/models/IntroducerCodeMarketer");
const BuyLinkMarketer = require("../app/models/BuyLinkMarketer");
const ShareLinkMarketer = require("../app/models/ShareLinkMarketer");
const DiscountCodeCampaignMarketer = require("../app/models/DiscountCodeMarketer");


const scaduale = schedule.scheduleJob('0 0 */2 * * *', function(){
    changeStatusCampaign(CodeCampaign );
    changeStatusCampaign(DiscountCodeCampaign );
    changeStatusCampaign(LinkCampaign );
    changeStatusCampaign(ProductCampaign );
});


const changeStatusCampaign = (Modelname) => {
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

        //find marketers for this campaign


    }).catch(err => {
        console.log(err)
    });

    
}
 
