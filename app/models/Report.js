module.exports = (sequelize, Sequelize) => {
    const campaign = sequelize.define(
      "product_campaigns",
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        campaignType:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        campaignId:{
            type: Sequelize.UUID,
            allowNull: false
        }
      },
      {
        timestamps: true,
        paranoid: true,
      }
    );
  
    return campaign;
  };
  