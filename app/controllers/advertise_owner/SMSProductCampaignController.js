// npm modeules
const { v4: uuidv4 } = require("uuid");
const MelipayamakApi = require("melipayamak");
// models
const SMSPanelMarketer = require("../../models/index").SMSPanelMarketer;
const SMSPanelPhoneNumber = require("../../models/index").SMSPanelPhoneNumber;
const { body } = require("express-validator");
class SMSProductCampaignController {
  async getAllSmsCode(req, res, next) {
    try {
      const username = "09190914073";
      const password = "#Abcd1234";
      const api = new MelipayamakApi(username, password);
      // const smsRestSync = api.sms('rest', 'sync');
      const smsSoapSync = api.sms("soap");
      // const sms = api.sms();
      // const to = ['09332255768'];
      // const { UserID,
      // Body,
      // SendDate,
      // Sender,
      // Receiver } = msg;
      const from = "30008666914073";
      const text = "تست وب سرویس ملی پیامک";
      let location = 1,
        index = 0,
        count = 100;
      let messages = await smsSoapSync.getMessagesByDate(
        location,
        index,
        count,
        ""
      );
      const smsPanelMarketer = await SMSPanelMarketer.findAll({
        where: { productCampaignId: req.params.productCampaignId },
      });
      const smsPanelMarketerCodes = [];
      const data = [];
      smsPanelMarketer.forEach((sms) => {
        smsPanelMarketerCodes.push(sms.code);
      });
      //   remove duplicate code on sms
      const removedDuplicateCodes = messages.MessagesBL.map((e) => e["Body"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => messages.MessagesBL[e])
        .map((e) => messages.MessagesBL[e]);
      ///////
      removedDuplicateCodes.forEach((msg) => {
        if (smsPanelMarketerCodes.includes(msg.Body)) {
          const { UserID, Body, SendDate, Sender, Receiver } = msg;
          data.push({ UserID, Body, SendDate, Sender, Receiver });
        }
      });
      return res.status(200).json({
        success: true,
        message: "fetch all codes",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      return res.json({
        success: false,
        message: "we cant fetch the all code",
      });
    }
  }
  async savePhoneNumbeerSmsPanel(req, res) {
    try {
      const { phone_number, smsPanelMarketerId, productCampaignId } = req.body;
      const smsPanelPhoneNumber = await SMSPanelPhoneNumber.findOne({
        where: { phoneNumber: phone_number },
      });
      if (smsPanelPhoneNumber) {
        res.status(400);
        return res.json({
          success: false,
          message: "find this phone number in sms panle phone numbers",
        });
      }
      const smsPanelPhoneNumberData = {
        phoneNumber: phone_number,
        smsPanelMarketerId,
        productCampaignId,
        id: uuidv4(),
      };
      const saveSmsPhoneNumber = await SMSPanelPhoneNumber.create(
        smsPanelPhoneNumberData
      );
      return res.json({
        success: true,
        message: "save phone number",
        data: saveSmsPhoneNumber,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "we cant save the sms phone number for user",
      });
    }
  }
}

module.exports = new SMSProductCampaignController();
