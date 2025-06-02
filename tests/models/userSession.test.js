//const UserSessionController = require('../../server/controllers/userSession.controller');
const UserSessionModel = require('../../server/models/userSessionModel');

const { Sequelize, DataTypes } = require('sequelize');

// const UserSession = UserSessionModel(sequelize, DataTypes);

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

    it('should create a user session successfully', async () => {
        const sessionData = {
            username: 'testuser',
            bid: 'browser1',
            is_active: true,
        };

        UserSession.create.mockResolvedValue(sessionData);

        // Mock controller to use our mocked model (override actual model inside controller)
        //  UserSessionController.__set__('UserSession', UserSession); // If using rewire, otherwise inject model directly

        // Or call controller function directly with mocked model
        // const result = await UserSessionController.createSession(sessionData);

        expect(UserSession.create).toHaveBeenCalledWith(sessionData);
        // expect(result.username).toBe(sessionData.username);
    });
});
