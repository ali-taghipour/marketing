module.exports = (dbInstance, Sequelize) => {
    const marketerLevel = dbInstance.define("marketer_levels", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return marketerLevel;
};