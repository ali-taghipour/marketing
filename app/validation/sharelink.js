const {
    body
} = require('express-validator');

class Sharevalidation {
    createShareLink() {
        return [
            body('linkCampaignId').notEmpty().withMessage('یک کمپین را انتخاب کنید'),
        ]
    }
    getShareLinkByID() {
        return [
            body('sharelinkid').notEmpty().withMessage('یک کمپین را انتخاب کنید'),
        ]
    }
    getShareLinkByLinkID() {
        return [
            body('linkCampaignId').notEmpty().withMessage('یک کمپین را انتخاب کنید'),
        ]
    }
}

module.exports = new Sharevalidation();