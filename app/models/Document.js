module.exports = (sequelize, Sequelize) => {
    const document = sequelize.define("documents", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM(
                'Admin',
                'AdvertiseOwner',
                'Marketer',
            ),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        filePath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        verificationMessage: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return document;
};