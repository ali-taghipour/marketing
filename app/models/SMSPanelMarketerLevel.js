module.exports = (sequelize, Sequelize) => {
  const SMSPanelMarketerLevel = sequelize.define(
    "sms_panel_marketer_levels",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      marketerLevelId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      marketerPercent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parentMarketerPercent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceForEachMarketer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceForEachDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceForEachSMS: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return SMSPanelMarketerLevel;
};
