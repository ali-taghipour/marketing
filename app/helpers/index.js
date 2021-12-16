const {v4 : uuid} = require("uuid");
const db = require("../models");

async function createUniqueCode(){
    let code = await uuid().substr(0, 8);
    let smsPanel;
    if(code){
        smsPanel = await db.SMSPanelMarketer.findOne({ where : {code}})
    }else{
        await createUniqueCode()
    }
    if(!smsPanel) return code
    await createUniqueCode()
}

async function createUniqueInvitationCode(){
    let code = uuid().substr(0, 8);
    let Record;
    if(code){
        Record = await db.IntroducerCodeMarketer.findOne({ where : {invitationCode : code}})
    }else{
        await createUniqueInvitationCode()
    }
    if(!Record) return code
    await createUniqueInvitationCode()
}

module.exports = {
    createUniqueCode,
    createUniqueInvitationCode
}