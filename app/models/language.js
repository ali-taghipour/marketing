module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("Language", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.UUID,
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    return Language;
};