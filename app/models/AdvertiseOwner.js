module.exports = (dbInstance, Sequelize) => {
    const advertiseOwner = dbInstance.define("advertise_owners", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email : {
            type:Sequelize.STRING,
            allowNull:false
        },
        hasPaidBlock: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        },
        isBanned: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        },
        isDocumentVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: false
        },
        externalUserId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        walletId: {
            type: Sequelize.UUID,
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    return advertiseOwner;
};