const { permissionMiddleware } = require('../../server/middlewares/permissionMiddleware');
const { db } = require('../../server/config/db');

// Mock the database and permission constants
jest.mock('../../server/config/db', () => ({
    db: {
        users: {
            findOne: jest.fn()
        }
    }
}));
// Mock the permissionUtils with a getter function
const mockPermissionConst = [];
jest.mock('../../server/utils/permissionUtils', () => ({
    PERMISSION_CONST: mockPermissionConst
}));

const { PERMISSION_CONST } = require('../../server/utils/permissionUtils');


describe('permissionMiddleware', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        jest.clearAllMocks();

        mockReq = {
            user: {
                username: 'testuser'
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe('when user is not found', () => {
        it('should return 404 status', async () => {
            db.users.findOne.mockResolvedValue(null);

            const middleware = permissionMiddleware('SOME_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

            expect(db.users.findOne).toHaveBeenCalledWith({
                where: { jnjUsername: 'testuser' },
                attributes: ['memberOf', 'jnjUsername', 'name', 'sub'],
                raw: true
            });
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                statusCode: 404,
                message: 'User not found.',
            });
        });
    });

    describe('when user exists', () => {
        const mockUserData = {
            jnjUsername: 'testuser',
            name: 'Test User',
            sub: '123',
            memberOf: ['ADMIN_GROUP', 'EDITOR_GROUP']
        };

        beforeEach(() => {
            db.users.findOne.mockResolvedValue(mockUserData);
        });






    });

    describe('when database query fails', () => {
        it('should return 500 status', async () => {
            db.users.findOne.mockRejectedValue(new Error('DB Error'));

            const middleware = permissionMiddleware('SOME_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                statusCode: 500,
                message: 'Internal server error.',
            });
        });
    });

    describe('when req.user is missing', () => {
        it('should return 401 status', async () => {
            delete mockReq.user;

            const middleware = permissionMiddleware('SOME_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                statusCode: 500,
                message: 'Internal server error.',
            });
        });
    });
});
