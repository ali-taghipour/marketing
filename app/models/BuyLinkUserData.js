module.exports = (sequelize, Sequelize) => {
    const buyLinkUserData = sequelize.define("buy_link_user_data", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        buyLinkMarketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postalCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        productNumbers: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        productCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        marketerId : {
          type : Sequelize.UUID ,
          allowNull : false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return buyLinkUserData;
};
