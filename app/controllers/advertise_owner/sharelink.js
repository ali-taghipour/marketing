const ShareLinkMarketer = require("../../models/index").ShareLinkMarketer;
const MarketerModel = require('../../models/index').Marketer
const LinkCampaignModel = require('../../models/index').LinkCampaign

class ShareLink {
    async getShareLinkByID(req, res) {
        try {
            let ID = req.body.sharelinkid
            var sharelink = await ShareLinkMarketer.findOne({
                where: {
                    id: ID
                },
                include: [{
                        model: MarketerModel,
                        where: {}
                    },
                    {
                        model: LinkCampaignModel,
                        where: {}
                    },
                ]
            }).then((result) => {

                return res.json({
                    success: false,
                    data: result
                })
            })

        } catch (error) {
            return res.json({
                success: false,
                message: 'ERROR'
            })
        }
    }

    async getShareLinkByLinkID(req, res) {
        try {
            let ID = req.body.linkCampaignId
            var sharelink = await ShareLinkMarketer.findAll({
                where: {
                    linkCampaignId: ID
                },
                include: [{
                    model: MarketerModel,
                    where: {}
                }]
            }).then((result) => {

                return res.json({
                    success: false,
                    data: result
                })
            })

        } catch (error) {
            return res.json({
                success: false,
                message: 'ERROR'
            })
        }
    }
}

module.exports = new ShareLink()