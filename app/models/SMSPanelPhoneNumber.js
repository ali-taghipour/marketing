module.exports = (sequelize, Sequelize) => {
    const SMSPanelPhoneNumber = sequelize.define("sms_panel_phone_numbers", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        smsPanelMarketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        productCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return SMSPanelPhoneNumber;
};