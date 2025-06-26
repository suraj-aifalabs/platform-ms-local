
const { Sequelize, DataTypes } = require("sequelize");

jest.mock("../server/utils/envUtils", () => ({
    getDBName: jest.fn(() => Promise.resolve("mock_db")),
    getDBUser: jest.fn(() => Promise.resolve("mock_user")),
    getDBPassword: jest.fn(() => Promise.resolve("mock_password")),
    getDBHost: jest.fn(() => Promise.resolve("mock_host"))
}));

jest.mock("../server/models/userModel", () => jest.fn(() => "userModelMock"));
jest.mock("../server/models/loginLogsModel", () => jest.fn(() => "loginLogsModelMock"));
jest.mock("../server/models/userSessionModel", () => jest.fn(() => "userSessionModelMock"));
jest.mock("../server/models/adGroupModel", () => jest.fn(() => "adGroupModelMock"));

jest.mock("sequelize");

const { getDBName, getDBUser, getDBPassword, getDBHost } = require("../server/utils/envUtils");
const { dbConnection, db } = require("../server/config/db");

describe("dbConnection", () => {
    let authenticateMock;
    let syncMock;
    let sequelizeInstanceMock;
    let consoleLogSpy;
    let consoleErrorSpy;

    beforeEach(() => {
        authenticateMock = jest.fn().mockResolvedValue();
        syncMock = jest.fn().mockResolvedValue();

        sequelizeInstanceMock = {
            authenticate: authenticateMock,
            sync: syncMock
        };

        Sequelize.mockImplementation(() => sequelizeInstanceMock);

        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        jest.clearAllMocks();

        delete process.env.DB_NAME;
        delete process.env.DB_USER;
        delete process.env.DB_PASSWORD;
        delete process.env.DB_HOST;
        delete process.env.DB_PORT;
        delete process.env.NODE_ENV;
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    describe("successful connection", () => {
        it("should establish database connection successfully using env utils", async () => {
            const result = await dbConnection();

            expect(getDBName).toHaveBeenCalled();
            expect(getDBUser).toHaveBeenCalled();
            expect(getDBPassword).toHaveBeenCalled();
            expect(getDBHost).toHaveBeenCalled();

            expect(Sequelize).toHaveBeenCalledWith(
                "mock_db",
                "mock_user",
                "mock_password",
                expect.objectContaining({
                    host: "mock_host",
                    port: 5432,
                    dialect: "postgres",
                    protocol: "postgres",
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false
                        }
                    },
                    logging: false,
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000,
                    }
                })
            );

            expect(authenticateMock).toHaveBeenCalled();
            expect(syncMock).toHaveBeenCalledWith({
                force: false,
                alter: true
            });

            expect(consoleLogSpy).toHaveBeenCalledWith(
                "Database connection has been established successfully."
            );

            expect(result).toEqual({
                db: expect.objectContaining({
                    Sequelize: Sequelize,
                    sequelize: sequelizeInstanceMock,
                    users: "userModelMock",
                    login_logs: "loginLogsModelMock",
                    user_sessions: "userSessionModelMock",
                    ad_groups: "adGroupModelMock"
                }),
                sequelize: sequelizeInstanceMock
            });
        });

        it("should use environment variables when available", async () => {
            process.env.DB_NAME = "env_db";
            process.env.DB_USER = "env_user";
            process.env.DB_PASSWORD = "env_password";
            process.env.DB_HOST = "env_host";
            process.env.DB_PORT = "3306";

            await dbConnection();

            expect(Sequelize).toHaveBeenCalledWith(
                "env_db",
                "env_user",
                "env_password",
                expect.objectContaining({
                    host: "env_host",
                    port: 3306
                })
            );

            // Should not call env utils when env vars are set
            expect(getDBName).not.toHaveBeenCalled();
            expect(getDBUser).not.toHaveBeenCalled();
            expect(getDBPassword).not.toHaveBeenCalled();
            expect(getDBHost).not.toHaveBeenCalled();
        });

        it("should enable logging when NODE_ENV is LOCAL", async () => {
            process.env.NODE_ENV = "LOCAL";

            await dbConnection();

            expect(Sequelize).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expect.any(String),
                expect.objectContaining({
                    logging: console.log
                })
            );
        });

        it("should use default port 5432 when DB_PORT is not set", async () => {
            await dbConnection();

            expect(Sequelize).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expect.any(String),
                expect.objectContaining({
                    port: 5432
                })
            );
        });

        it("should parse DB_PORT when set as string", async () => {
            process.env.DB_PORT = "3306";

            await dbConnection();

            expect(Sequelize).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(String),
                expect.any(String),
                expect.objectContaining({
                    port: 3306
                })
            );
        });
    });

    describe("error handling", () => {
        it("should handle connection errors gracefully", async () => {
            const connectionError = new Error("Connection failed");
            authenticateMock.mockRejectedValue(connectionError);

            const result = await dbConnection();

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Unable to connect to the database:",
                connectionError
            );
            expect(result).toBeUndefined();
        });

        it("should handle sync errors gracefully", async () => {
            const syncError = new Error("Sync failed");
            syncMock.mockRejectedValue(syncError);

            const result = await dbConnection();

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Unable to connect to the database:",
                syncError
            );
            expect(result).toBeUndefined();
        });

        it("should handle env utils errors gracefully", async () => {
            const envError = new Error("Env utils failed");
            getDBName.mockRejectedValue(envError);

            const result = await dbConnection();

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Unable to connect to the database:",
                envError
            );
            expect(result).toBeUndefined();
        });

        it("should handle model loading errors gracefully", async () => {
            // Mock one of the model imports to throw an error
            jest.doMock("../server/models/userModel", () => {
                throw new Error("Model loading failed");
            });

            const result = await dbConnection();

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Unable to connect to the database:",
                expect.any(Error)
            );
            expect(result).toBeUndefined();
        });
    });


    describe("edge cases", () => {
        it("should handle mixed env variables and fallbacks", async () => {
            process.env.DB_NAME = "env_db";
            process.env.DB_HOST = "env_host";
            // DB_USER and DB_PASSWORD will fall back to env utils

            await dbConnection();

            expect(Sequelize).toHaveBeenCalledWith(
                "env_db", // from env
                "mock_user", // from env utils
                "mock_password", // from env utils
                expect.objectContaining({
                    host: "env_host" // from env
                })
            );

            expect(getDBName).not.toHaveBeenCalled();
            expect(getDBUser).toHaveBeenCalled();
            expect(getDBPassword).toHaveBeenCalled();
            expect(getDBHost).not.toHaveBeenCalled();
        });

        it("should handle empty string environment variables", async () => {
            process.env.DB_NAME = "";
            process.env.DB_USER = "";

            await dbConnection();
        });

        it("should handle invalid DB_PORT", async () => {
            process.env.DB_PORT = "invalid";

            await dbConnection();
        });
    });
});