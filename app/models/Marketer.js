module.exports = (dbInstance, Sequelize) => {
    const marketer = dbInstance.define("marketers", {
        id: {
            type: Sequelize.UUID,
            allowNull: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        levelId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        inviteCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        introducerCode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        parentMarketerId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        isBanned: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: true
        },
        externalUserId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        walletId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        isDocumentVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
        },
        isSocialMediaVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            default: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return marketer;
};