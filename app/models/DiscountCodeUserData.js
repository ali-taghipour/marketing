module.exports = (sequelize, Sequelize) => {
    const discountCodeUserDate = sequelize.define("discount_code_user_dat", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        discountCodeMarketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        discountCodeCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return discountCodeUserDate;
};