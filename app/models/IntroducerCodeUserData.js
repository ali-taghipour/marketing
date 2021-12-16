module.exports = (sequelize, Sequelize) => {
    const introducerCodeUserData = sequelize.define("introducer_code_user_data", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        introducerCodeMarketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        linkCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        ip : {
            type: Sequelize.STRING,
            allowNull: false
        },
        session: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return introducerCodeUserData;
};