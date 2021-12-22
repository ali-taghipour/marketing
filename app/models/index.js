const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
new Sequelize("marketing_club", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const dbInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: Number(dbConfig.PORT),
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = dbInstance;

db.Admin = require("./Admin.js")(dbInstance, Sequelize);
db.Report = require("./Report.js")(dbInstance, Sequelize);
db.AdvertiseOwner = require("./AdvertiseOwner.js")(dbInstance, Sequelize);
db.Marketer = require("./Marketer.js")(dbInstance, Sequelize);
db.Document = require("./Document.js")(dbInstance, Sequelize);
db.MarketerLevel = require("./MarketerLevel.js")(dbInstance, Sequelize);
db.SMSPanelMarketerLevel = require("./SMSPanelMarketerLevel.js")(
  dbInstance,
  Sequelize
);
db.BuyLinkMarketerLevel = require("./BuyLinkMarketerLevel.js")(
  dbInstance,
  Sequelize
);
db.ShareLinkMarketerLevel = require("./ShareLinkMarketerLevel.js")(
  dbInstance,
  Sequelize
);
db.IntroducerCodeMarketerLevel = require("./IntroducerCodeMarketerLevel.js")(
  dbInstance,
  Sequelize
);
db.DiscountCodeMarketerLevel = require("./DiscountCodeMarketerLevel.js")(
  dbInstance,
  Sequelize
);
db.Image = require("./Image.js")(dbInstance, Sequelize);
db.SiteInfo = require("./SiteInfo.js")(dbInstance, Sequelize);
db.Product = require("./Product.js")(dbInstance, Sequelize);
db.Link = require("./Link.js")(dbInstance, Sequelize);

db.ProductCampaign = require("./ProductCampaign.js")(dbInstance, Sequelize);
db.SMSPanelMarketer = require("./SMSPanelMarketer.js")(dbInstance, Sequelize);
db.SMSPanelPhoneNumber = require("./SMSPanelPhoneNumber.js")(
  dbInstance,
  Sequelize
);
db.BuyLinkMarketer = require("./BuyLinkMarketer.js")(dbInstance, Sequelize);
db.BuyLinkUserData = require("./BuyLinkUserData.js")(dbInstance, Sequelize);
db.CodeCampaign = require('./CodeCampaign')(dbInstance , Sequelize);

db.LinkCampaign = require("./LinkCampaign.js")(dbInstance, Sequelize);
db.ShareLinkMarketer = require("./ShareLinkMarketer.js")(dbInstance, Sequelize);
db.shareLinkUserData = require("./ShareLinkUserData.js")(dbInstance, Sequelize);
db.IntroducerCodeMarketer = require("./IntroducerCodeMarketer.js")(
  dbInstance,
  Sequelize
);
db.IntroducerCodeUserData = require("./IntroducerCodeUserData.js")(
  dbInstance,
  Sequelize
);
db.IntroducerCodeAdvertise = require("./IntroducerCodeAdvertise")(
  dbInstance,
  Sequelize
);

db.DiscountCodeCampaign = require("./DiscountCodeCampaign.js")(
  dbInstance,
  Sequelize
);
db.DiscountCodeMarketer = require("./DiscountCodeMarketer.js")(
  dbInstance,
  Sequelize
);
db.DiscountCodeUserDate = require("./DiscountCodeUserData.js")(
  dbInstance,
  Sequelize
);

//Relations

//Marketer and parent
db.Marketer.hasMany(db.Marketer, { foreignKey: "parentMarketerId" });
//Marketer and MarketerLevel
db.MarketerLevel.hasMany(db.Marketer, { foreignKey: "levelId" });
db.Marketer.belongsTo(db.MarketerLevel);
//Document and Marketer
db.Marketer.hasMany(db.Document, {
  foreignKey: "userId",
  constraints: false,
  scope: {
    role: "Marketer",
  },
});
db.Document.belongsTo(db.Marketer, {
  foreignKey: "userId",
  constraints: false,
});
//Document and AdvertiseOwner
db.AdvertiseOwner.hasMany(db.Document, {
  foreignKey: "userId",
  constraints: false,
  scope: {
    role: "AdvertiseOwner",
  },
});
db.Document.belongsTo(db.AdvertiseOwner, {
  foreignKey: "userId",
  constraints: false,
});
//MarketerLevel and SMSPanelMarketerLevel
db.MarketerLevel.hasMany(db.SMSPanelMarketerLevel, { foreignKey: "levelId" });
db.SMSPanelMarketerLevel.belongsTo(db.MarketerLevel);
//MarketerLevel and BuyLinkMarketerLevel
db.MarketerLevel.hasMany(db.BuyLinkMarketerLevel, { foreignKey: "levelId" });
db.BuyLinkMarketerLevel.belongsTo(db.MarketerLevel);
//MarketerLevel and ShareLinkMarketerLevel
db.MarketerLevel.hasMany(db.ShareLinkMarketerLevel, { foreignKey: "levelId" });
db.ShareLinkMarketerLevel.belongsTo(db.MarketerLevel);
//MarketerLevel and IntroducerCodeMarketerLevel
db.MarketerLevel.hasMany(db.IntroducerCodeMarketerLevel, {
  foreignKey: "levelId",
});
db.IntroducerCodeMarketerLevel.belongsTo(db.MarketerLevel);
//MarketerLevel and DiscountCodeMarketerLevel
db.MarketerLevel.hasMany(db.DiscountCodeMarketerLevel, {
  foreignKey: "levelId",
});
db.DiscountCodeMarketerLevel.belongsTo(db.MarketerLevel);

//Product and Image
db.Product.hasMany(db.Image, {
  foreignKey: "modelId",
  constraints: false,
  scope: {
    model: "Product",
  },
});
db.Image.belongsTo(db.Product, { foreignKey: "modelId", constraints: false });
//ProductCampaign and Image
db.ProductCampaign.hasMany(db.Image, {
  foreignKey: "modelId",
  constraints: false,
  scope: {
    model: "ProductCampaign",
  },
});
db.Image.belongsTo(db.ProductCampaign, {
  foreignKey: "modelId",
  constraints: false,
});
//LinkCampaign and Image
db.LinkCampaign.hasMany(db.Image, {
  foreignKey: "modelId",
  constraints: false,
  scope: {
    model: "LinkCampaign",
  },
});
db.Image.belongsTo(db.LinkCampaign, {
  foreignKey: "modelId",
  constraints: false,
});
//DiscountCodeCampaign and Image
db.DiscountCodeCampaign.hasMany(db.Image, {
  foreignKey: "modelId",
  constraints: false,
  scope: {
    model: "DiscountCodeCampaign",
  },
});
db.Image.belongsTo(db.DiscountCodeCampaign, {
  foreignKey: "modelId",
  constraints: false,
});

//Product and Product
db.AdvertiseOwner.hasMany(db.Product);
db.Product.belongsTo(db.AdvertiseOwner);
//ProductCampaign and MarketerLevel
db.AdvertiseOwner.hasMany(db.Link);
db.Link.belongsTo(db.AdvertiseOwner);

//ProductCampaign and AdvertiseOwner
db.AdvertiseOwner.hasMany(db.ProductCampaign);
db.ProductCampaign.belongsTo(db.AdvertiseOwner);
//ProductCampaign and Product
db.Product.hasMany(db.ProductCampaign);
db.ProductCampaign.belongsTo(db.Product);
//ProductCampaign and MarketerLevel
db.MarketerLevel.hasMany(db.ProductCampaign);
db.ProductCampaign.belongsTo(db.MarketerLevel);

//SMSPanelMarketer and ProductCampaign
db.ProductCampaign.hasMany(db.SMSPanelMarketer);
db.SMSPanelMarketer.belongsTo(db.ProductCampaign);
//SMSPanelMarketer and Marketer
db.Marketer.hasMany(db.SMSPanelMarketer);
db.SMSPanelMarketer.belongsTo(db.Marketer);
//SMSPanelPhoneNumber and ProductCampaign
db.ProductCampaign.hasMany(db.SMSPanelPhoneNumber);
db.SMSPanelPhoneNumber.belongsTo(db.ProductCampaign);
//SMSPanelPhoneNumber and SMSPanelMarketer
db.SMSPanelMarketer.hasMany(db.SMSPanelPhoneNumber);
db.SMSPanelPhoneNumber.belongsTo(db.SMSPanelMarketer);

//BuyLinkMarketer and ProductCampaign
db.ProductCampaign.hasMany(db.BuyLinkMarketer);
db.BuyLinkMarketer.belongsTo(db.ProductCampaign);
//BuyLinkMarketer and Marketer
db.Marketer.hasMany(db.BuyLinkMarketer);
db.BuyLinkMarketer.belongsTo(db.Marketer);
//BuyLinkUserData and ProductCampaign
db.ProductCampaign.hasMany(db.BuyLinkUserData);
db.BuyLinkUserData.belongsTo(db.ProductCampaign);
//BuyLinkUserData and BuyLinkMarketer
db.BuyLinkMarketer.hasMany(db.BuyLinkUserData);
db.BuyLinkUserData.belongsTo(db.BuyLinkMarketer);

//LinkCampaign::

//LinkCampaign and AdvertiseOwner
db.AdvertiseOwner.hasMany(db.LinkCampaign);
db.LinkCampaign.belongsTo(db.AdvertiseOwner);
//LinkCampaign and Link
db.Link.hasMany(db.LinkCampaign);
db.LinkCampaign.belongsTo(db.Link);
//LinkCampaign and MarketerLevel
db.MarketerLevel.hasMany(db.LinkCampaign);
db.LinkCampaign.belongsTo(db.MarketerLevel);

//ShareLinkMarketer and LinkCampaign
db.LinkCampaign.hasMany(db.ShareLinkMarketer);
db.ShareLinkMarketer.belongsTo(db.LinkCampaign);
//ShareLinkMarketer and Marketer
db.Marketer.hasMany(db.ShareLinkMarketer);
db.ShareLinkMarketer.belongsTo(db.Marketer);
//shareLinkUserData and LinkCampaign
db.LinkCampaign.hasMany(db.shareLinkUserData);
db.shareLinkUserData.belongsTo(db.LinkCampaign);
//shareLinkUserData and ShareLinkMarketer
db.ShareLinkMarketer.hasMany(db.shareLinkUserData);
db.shareLinkUserData.belongsTo(db.ShareLinkMarketer);

//IntroducerCodeMarketer and LinkCampaign
db.LinkCampaign.hasMany(db.IntroducerCodeMarketer);
db.IntroducerCodeMarketer.belongsTo(db.LinkCampaign);
//IntroducerCodeMarketer and Marketer
db.Marketer.hasMany(db.IntroducerCodeMarketer);
db.IntroducerCodeMarketer.belongsTo(db.Marketer);
//IntroducerCodeUserData and LinkCampaign
db.LinkCampaign.hasMany(db.IntroducerCodeUserData);
db.IntroducerCodeUserData.belongsTo(db.LinkCampaign);
//IntroducerCodeUserData and IntroducerCodeMarketer
db.IntroducerCodeMarketer.hasMany(db.IntroducerCodeUserData);
db.IntroducerCodeUserData.belongsTo(db.IntroducerCodeMarketer);

//DiscountCodeCampaign::

//DiscountCodeCampaign and AdvertiseOwner
db.AdvertiseOwner.hasMany(db.DiscountCodeCampaign);
db.DiscountCodeCampaign.belongsTo(db.AdvertiseOwner);
//DiscountCodeCampaign and MarketerLevel
db.MarketerLevel.hasMany(db.DiscountCodeCampaign);
db.DiscountCodeCampaign.belongsTo(db.MarketerLevel);

//DiscountCodeMarketer and DiscountCodeCampaign
db.DiscountCodeCampaign.hasMany(db.DiscountCodeMarketer);
db.DiscountCodeMarketer.belongsTo(db.DiscountCodeCampaign);
//DiscountCodeMarketer and Marketer
db.Marketer.hasMany(db.DiscountCodeMarketer);
db.DiscountCodeMarketer.belongsTo(db.Marketer);
//DiscountCodeUserDate and DiscountCodeCampaign
db.DiscountCodeCampaign.hasMany(db.DiscountCodeUserDate);
db.DiscountCodeUserDate.belongsTo(db.DiscountCodeCampaign);
//DiscountCodeUserDate and DiscountCodeMarketer
db.DiscountCodeMarketer.hasMany(db.DiscountCodeUserDate);
db.DiscountCodeUserDate.belongsTo(db.DiscountCodeMarketer);

db.sequelize
  .sync({
    force: false, // TODO :: remove in production
    logging: false,
  })
  .then(async () => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("Database Error :", err.message);
  });

module.exports = db;
