module.exports = (sequelize, Sequelize) => {
    const discountCodeMarketer = sequelize.define("discount_code_marketers", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        marketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        discountCodeCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacity : {
            type : Sequelize.INTEGER ,
            allowNull : false,
            default : 1
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return discountCodeMarketer;
};