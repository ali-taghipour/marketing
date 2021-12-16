const axios = require('axios');
const MelipayamakApi = require('melipayamak')
const SMSPanelMarketer = require("./../../models/index").SMSPanelMarketer;
const Marketer = require("./../../models/index").Marketer;
class SMSPanelController{
    async getAllSms(req, res, next){
        try {
            const username = '09190914073';
            const password = '#Abcd1234';
            const api = new MelipayamakApi(username,password);
            const smsRestSync = api.sms('rest', 'sync');
            const smsSoapSync = api.sms('soap');
            const sms = api.sms();
            const to = ['09332255768'];
            const from = '30008666914073';
            const text = 'تست وب سرویس ملی پیامک';
            let location = 1, index = 0, count = 100;
            let marketers = [];
            let messages = await smsSoapSync.getMessagesByDate(location,index, count, "")
            messages?.MessagesBL?.forEach(async msg => {
                delete msg.LinkID
                delete msg.MsgID
                delete msg.NumberID
                delete msg.Tariff
                delete msg.MsgType
                delete msg.Udh
                delete msg.FirstLocation
                delete msg.CurrentLocation
                delete msg.Parts
                delete msg.IsFlash
                delete msg.IsRead
                delete msg.IsUnicode
                delete msg.Credit
                delete msg.Module
                delete msg.RecCount
                delete msg.RecFailed
                delete msg.RecSuccess
                delete msg.IsMoneyBack
                delete msg.UserMaster
                delete msg.UserStepedMaster
                delete msg.MoneyBackCount
                delete msg.MoneyBackLevel
                let marketer = await SMSPanelMarketer.findOne({ where : {code : "" + msg.Body}})
                if(marketer){
                    let marketerUser = await Marketer.findOne({ where : {id : ""+marketer.marketerId} })
                    if(marketerUser){
                        msg.marketer ={
                            name : marketerUser?.firstName + " " + marketerUser?.lastName,
                            code : marketer.code
                        }
                    marketers.push(msg)
                        console.log(msg);
                    }
                }
            })
            return res.status(200).json({
                messages,
                marketers
            });
            } catch (error) {
                next(error);
            }
    }
}

module.exports = new SMSPanelController()
