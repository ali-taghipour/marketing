module.exports = (sequelize, Sequelize) => {
    const SMSPanelMarketer = sequelize.define("sms_panel_marketers", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        marketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        productCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return SMSPanelMarketer;
};