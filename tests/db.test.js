const { Sequelize, DataTypes } = require('sequelize');

jest.mock('../server/models/userModel', () => jest.fn((sequelize, DataTypes) => ({ name: 'userModelMock' })));
jest.mock('../server/models/loginLogsModel', () => jest.fn((sequelize, DataTypes) => ({ name: 'loginLogsModelMock' })));
jest.mock('../server/models/userSessionModel', () => jest.fn((sequelize, DataTypes) => ({ name: 'userSessionModelMock' })));

const { dbConnection, db } = require('../server/config/db');

jest.mock('sequelize');

describe('dbConnection', () => {
    let authenticateMock;
    let syncMock;

    beforeEach(() => {
        authenticateMock = jest.fn().mockResolvedValue();
        syncMock = jest.fn().mockResolvedValue();

        Sequelize.mockImplementation(() => ({
            authenticate: authenticateMock,
            sync: syncMock,
        }));

        // Reset db object keys before each test
        Object.keys(db).forEach(key => delete db[key]);
    });

    it('should establish a database connection and load models', async () => {
        const result = await dbConnection();

        expect(authenticateMock).toHaveBeenCalled();
        expect(syncMock).toHaveBeenCalledWith({ force: false, alter: true });
        expect(result.db).toHaveProperty('users');
        expect(result.db).toHaveProperty('login_logs');
        expect(result.db).toHaveProperty('user_sessions');
        expect(result.db).toHaveProperty('Sequelize');
        expect(result.db).toHaveProperty('sequelize');

        // Optionally check that your mocks were called (models called with sequelize, DataTypes)
        const userModel = require('../server/models/userModel');
        const loginLogsModel = require('../server/models/loginLogsModel');
        const userSessionModel = require('../server/models/userSessionModel');

        expect(userModel).toHaveBeenCalled();
        expect(loginLogsModel).toHaveBeenCalled();
        expect(userSessionModel).toHaveBeenCalled();
    });

    it('should handle connection errors gracefully', async () => {
        authenticateMock.mockRejectedValue(new Error('Connection failed'));
        console.error = jest.fn();

        const result = await dbConnection();

        expect(console.error).toHaveBeenCalledWith(
            'Unable to connect to the database:',
            expect.any(Error)
        );
        expect(result).toBeUndefined();
    });
});
