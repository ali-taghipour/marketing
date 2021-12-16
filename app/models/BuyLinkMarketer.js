module.exports = (sequelize, Sequelize) => {
    const buyLinkMarketer = sequelize.define("buy_link_marketers", {
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
        link: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return buyLinkMarketer;
};