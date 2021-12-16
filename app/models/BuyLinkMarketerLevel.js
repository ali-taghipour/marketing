module.exports = (sequelize, Sequelize) => {
    const buyLinkMarketerLevel = sequelize.define("buy_link_marketer_levels", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        levelId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        price : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        marketerPercent: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        parentMarketerPercent: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceForEachMarketer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceForEachDay: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceForEachBuy: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceType : {
            type : Sequelize.STRING ,
            allowNull : false 
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return buyLinkMarketerLevel;
};
