/* eslint-disable no-undef */
const { Sequelize, DataTypes } = require("sequelize");
const { getDBName, getDBUser, getDBPassword, getDBHost } = require("../utils/envUtils");

const db = {};

const dbConnection = async () => {
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME ?? await getDBName(),
            process.env.DB_USER ?? await getDBUser(),
            process.env.DB_PASSWORD ?? await getDBPassword(),
            {
                host: process.env.DB_HOST ?? await getDBHost(),
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
                dialect: "postgres",
                protocol: "postgres",
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                // eslint-disable-next-line no-console
                logging: process.env.NODE_ENV === "LOCAL" ? console.log : false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
            }
        );

        await sequelize.authenticate();

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        // Load models
        db.users = require("../models/userModel")(sequelize, DataTypes);
        db.login_logs = require("../models/loginLogsModel")(sequelize, DataTypes);
        db.user_sessions = require("../models/userSessionModel")(sequelize, DataTypes);
        db.ad_groups = require("../models/adGroupModel")(sequelize, DataTypes);

        // Sync models with database
        await sequelize.sync({
            force: false,
            alter: true
        });

        // eslint-disable-next-line no-console
        console.log("Database connection has been established successfully.");
        return { db, sequelize };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = {
    dbConnection,
    db,
};