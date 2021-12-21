module.exports = (sequelize, Sequelize) => {
    const campaign = sequelize.define("code_campaigns", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        advertiseOwnerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM(
                'disocuntCode',
                'invitationCode'
            ),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM(
                'expired',
                'blocked', // system blocked campaign for some reason
                'pending', // no marketer accept it yet
                'running' // accepted by some marketers
            ),
            allowNull: false
        },
        marketerLevelId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        marketersNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        daysNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        codePlan: {
            type: Sequelize.UUID,
            allowNull: true
        },
        priceRemainder: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        expiredAt: {
            type: Sequelize.DATE,
            allowNull: true,
            default: null

        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return campaign;
};
