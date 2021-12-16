module.exports = (sequelize, Sequelize) => {
    const introducerCodeMarketer = sequelize.define("introducer_code_marketers", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        marketerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        linkCampaignId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        invitationCode : {
            type : Sequelize.STRING ,
            allowNull : false
        }
        //Code is marketer_invite code
    }, {
        timestamps: true,
        paranoid: true
    });

    return introducerCodeMarketer;
};
