module.exports = (sequelize, Sequelize) => {
    const discountCodeMarketerLevel = sequelize.define("discount_code_marketer_levels", {
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
        percent: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        priceForEachUse: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceForUniqueUsersUse: {
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

    return discountCodeMarketerLevel;
};