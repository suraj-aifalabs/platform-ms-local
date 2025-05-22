const { Sequelize, DataTypes } = require('sequelize');
const defineUserSessionModel = require('../../server/models/userSessionModel'); // Update the path as necessary

describe('UserSession Model', () => {
    let sequelize;
    let UserSession;

    beforeAll(async () => {
        sequelize = new Sequelize('sqlite::memory:', { logging: false });
        UserSession = defineUserSessionModel(sequelize, DataTypes);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a user session successfully', async () => {
        const session = await UserSession.create({
            username: 'testuser',
            bid: 'BID123',
            is_active: true
        });

        expect(session).toBeDefined();
        expect(session.username).toBe('testuser');
        expect(session.bid).toBe('BID123');
        expect(session.is_active).toBe(true);
        expect(session.created_at).toBeInstanceOf(Date);
        expect(session.updated_at).toBeInstanceOf(Date);
    });

    it('should not allow null values for required fields', async () => {
        await expect(UserSession.create({})).rejects.toThrow();
    });


});
