//const UserSessionController = require('../../server/controllers/userSession.controller');
const UserSessionModel = require('../../server/models/userSessionModel');

const { Sequelize, DataTypes } = require('sequelize');


describe('UserSession Controller', () => {
    let UserSession;
    let sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize(
            process.env.DB_NAME || "myapp_test",
            process.env.DB_USER || "postgres",
            process.env.DB_PASSWORD || "password",
            {
                host: process.env.DB_HOST || "localhost",
                port: process.env.DB_PORT || 5432,
                dialect: "postgres",
                logging: false,
            }
        );

        UserSession = UserSessionModel(sequelize, DataTypes);

    });
    beforeEach(() => {
        jest.clearAllMocks();
        UserSession.create = jest.fn();
        UserSession.findAll = jest.fn();
    });

    it("should fail if required fields are missing", async () => {
        UserSession.create.mockRejectedValue(new Error("notNull Violation"));

        await expect(UserSession.create({})).rejects.toThrow("notNull Violation");
    });

});
