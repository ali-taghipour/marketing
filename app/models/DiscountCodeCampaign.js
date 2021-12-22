module.exports = (sequelize, Sequelize) => {
    const discountCodeCampaign = sequelize.define("discount_code_campaigns", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        percentLevel:{
            type: Sequelize.UUID,
            allowNull: false
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
        marketerLevelId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        finishDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        price : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        priceRemainder : {
            type: Sequelize.INTEGER,
            allowNull: false,
            default : 0
        },
        maxUses: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        verifyByAdmin : {
            type : Sequelize.BOOLEAN,
            allowNull : false , 
            default : false
        },
        marketers : {
            type: Sequelize.INTEGER,
            allowNull: true,
            default : 0
        },
        maxUseForEachUser: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        marketersNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default : 0
        },
        usersUsed: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        expiredAt: {
            type: Sequelize.DATE,
            allowNull: true,
            default:null
        },
        status: {
            type: Sequelize.ENUM(
                'expired',
                'blocked',// system blocked campaign for some reason
                'pending',// no marketer accept it yet
                'running'// accepted by some marketers
            ),
            allowNull: false
        },
        partId:{
            type: Sequelize.UUID,
            allowNull: false
        }

    }, {
        timestamps: true,
        paranoid: true
    });

    return discountCodeCampaign;
};