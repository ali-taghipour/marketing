module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    DB: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
