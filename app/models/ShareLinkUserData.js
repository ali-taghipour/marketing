module.exports = (sequelize, Sequelize) => {
    const shareLinkUserData = sequelize.define("share_link_user_data", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        shareLinkMarketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        linkCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        ip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        session: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM(
                'clicked',
                'action',
            ),
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return shareLinkUserData;
};