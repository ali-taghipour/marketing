module.exports = (sequelize, Sequelize) => {
  const shareLinkMarketerLevel = sequelize.define(
    "share_panel_marketer_levels",
    {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      marketerLevelId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
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
      priceForEachClick: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceForEachAct: {
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

  return shareLinkMarketerLevel;
};
