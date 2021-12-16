module.exports = (sequelize, Sequelize) => {
    const IntroducerCodeAdvertise = sequelize.define("introducer_code_advertiser", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        campaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        invitationCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        customerPhone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        advertiseId : {
            type: Sequelize.UUID,
            allowNull: false
        }
        //Code is marketer_invite code
    }, {
        timestamps: true,
        paranoid: true
    });

    return IntroducerCodeAdvertise;
};