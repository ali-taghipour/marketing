module.exports = (dbInstance, Sequelize) => {
    const admin = dbInstance.define("admins", {
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
        externalUserId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        walletId: {
            type: Sequelize.UUID,
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    return admin;
};