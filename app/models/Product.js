module.exports = (dbInstance, Sequelize) => {
    const product = dbInstance.define("products", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        advertiseOwnerId: {
            type: Sequelize.UUID,
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
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productCode: {
            type: Sequelize.STRING,
            allowNull: false
        },// for buy link generation
        numbers: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        attribute: {
            type: Sequelize.JSON,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true
    });

    return product;
};