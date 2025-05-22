/* eslint-disable no-undef */
const { Sequelize, DataTypes } = require("sequelize");

const db = {};

const dbConnection = async () => {
    try {
        const sequelize = new Sequelize(
            process.env.DB_NAME ?? "",
            process.env.DB_USER ?? "",
            process.env.DB_PASSWORD ?? "",
            {
                host: process.env.DB_HOST ?? "",
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
                logging: process.env.NODE_ENV === "development" ? console.log : false,
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