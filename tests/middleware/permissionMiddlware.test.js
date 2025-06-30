// test/permissionMiddleware.test.js

const { permissionMiddleware } = require('../../server/middlewares/permissionMiddleware');
const { db } = require('../../server/config/db');
const { PERMISSION_CONST } = require('../../server/utils/permissionUtils');

// Mock the database and permission constants
jest.mock('../../server/config/db', () => ({
    db: {
        users: {
            findOne: jest.fn()
        }
    }
}));

// Mock the permissionUtils with a getter function
jest.mock('../../server/utils/permissionUtils', () => ({
    PERMISSION_CONST: []
}));

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
        it('should return 500 status', async () => {
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

    describe('when user is found but does not have the required permission', () => {
        it('should return 403 status', async () => {
            // Mock user data
            db.users.findOne.mockResolvedValue({
                memberOf: ["group1", "group2"]
            });

            // Mock empty permission constants
            const middleware = permissionMiddleware('REQUIRED_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(403);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                statusCode: 403,
                message: `Access denied. Required permission: REQUIRED_PERMISSION`,
            });
        });
    });

    describe('when user is found and has the required permission', () => {
        it('should proceed to the next middleware', async () => {
            // Mock user data
            db.users.findOne.mockResolvedValue({
                memberOf: ['groupWithRequiredPermission']
            });

            // Mock permission constants
            PERMISSION_CONST.push({
                name: 'groupWithRequiredPermission',
                permissionList: [
                    {
                        permissions: [
                            { label: 'REQUIRED_PERMISSION', hasAccess: true }
                        ]
                    }
                ]
            });

            const middleware = permissionMiddleware('REQUIRED_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockReq.userPermissions).toEqual(['REQUIRED_PERMISSION']);
        });
    });

    describe('when user has regions', () => {
        it('should set user regions correctly based on membership', async () => {
            db.users.findOne.mockResolvedValue({
                memberOf: ['groupEU', 'groupUS', 'groupSYSTEMADMIN']
            });

            PERMISSION_CONST.push({
                name: 'groupEU',
                permissionList: [],
            });

            PERMISSION_CONST.push({
                name: 'groupUS',
                permissionList: [],
            });

            PERMISSION_CONST.push({
                name: 'groupSYSTEMADMIN',
                permissionList: [],
            });

            const middleware = permissionMiddleware('SOME_PERMISSION');
            await middleware(mockReq, mockRes, mockNext);

        });
    });
});
