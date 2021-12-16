module.exports = (dbInstance, Sequelize) => {
    const image = dbInstance.define("images", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        model: {
            type: Sequelize.ENUM(
                'Product',
                'LinkCampaign',
                'ProductCampaign',
                'DiscountCodeCampaign',
            ),
            allowNull: false
        },
        modelId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        originalUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        thumbnailUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    return image;
};