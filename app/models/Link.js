module.exports = (sequelize, Sequelize) => {
    const Link = sequelize.define("links", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        advertiseOwnerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        link: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return Link;
};