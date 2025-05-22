const { Sequelize, DataTypes } = require('sequelize');
const defineUserModel = require('../../server/models/userModel');

describe('User Model', () => {
    let sequelize;
    let User;

    beforeAll(async () => {

        sequelize = new Sequelize('sqlite::memory:', { logging: false });
        User = defineUserModel(sequelize, DataTypes);
        await sequelize.sync({ force: true });
    })

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a user successfully', async () => {
        const newUser = await User.create({
            userName: 'testuser',
            email: 'test@example.com'
        });

        expect(newUser).toBeDefined();
        expect(newUser.userName).toBe('testuser');
        expect(newUser.email).toBe('test@example.com');
        expect(newUser.created_at).toBeInstanceOf(Date);
        expect(newUser.updated_at).toBeInstanceOf(Date);
    });

    it('should not allow null for userName or email', async () => {
        await expect(User.create({})).rejects.toThrow();
    });

    it('should enforce unique constraint on email', async () => {
        await User.create({ userName: 'user1', email: 'unique@example.com' });
        await expect(
            User.create({ userName: 'user2', email: 'unique@example.com' })
        ).rejects.toThrow();
    });
});
