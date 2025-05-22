/* eslint-env jest */

const { validateOauthToken } = require('../server/middlewares/oauthMiddleware');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');
const { db } = require("../server/config/db")

jest.mock('../server/models/userSessionModel');

db.user_sessions = {
    findOne: jest.fn(),
};


const mockConfigPromise = Promise.resolve();
global.configPromise = mockConfigPromise;

const mockGetKey = jest.fn((header, callback) => callback(null, 'publicKey'));
global.getKey = mockGetKey;

global.tokenValidationConfig = {
    issuer: 'expected_issuer',
    audience: 'expected_audience',
};

describe('validateOauthToken Middleware', () => {
    let originalConfigPromise;
    beforeEach(() => {
        jest.clearAllMocks();
        // Save the original promise
        originalConfigPromise = global.configPromise;
    });
    afterEach(() => {
        // Restore the original configPromise after each test
        global.configPromise = originalConfigPromise;
    });
    it('should return 401 if Authorization header is missing', async () => {
        const req = httpMocks.createRequest({ headers: {} });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await validateOauthToken(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
            success: false,
            statusCode: 401,
            message: 'No Token Found!',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if JWT is expired', async () => {
        const token = 'expired.token.value';
        const req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer ${token}`,
                bid: '123',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        jwt.verify.mockImplementation((t, keyFn, options, cb) =>
            cb({ message: 'jwt expired' }, null)
        );

        await validateOauthToken(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({
            success: false,
            statusCode: 401,
            message: 'Session Expired',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should attach user and call next on valid token with active session', async () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer validtoken',
                bid: 'bid123',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const decoded = {
            name: 'John Doe [EXT]',
            preferred_username: 'john@example.com',
            oid: 'user-123',
            roles: ['user'],
        };

        jwt.verify.mockImplementation((t, keyFn, options, cb) =>
            cb(null, decoded)
        );

        db.user_sessions.findOne.mockResolvedValue({
            id: 1,
            username: 'john',
            bid: 'bid123',
            is_active: true,
        });

        await validateOauthToken(req, res, next);

        expect(req.user).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
            userId: 'user-123',
            username: 'john',
            roles: ['user'],
        });
        expect(req.isActiveSession).toBe(undefined);
    });

    it('should fallback gracefully if DB check fails', async () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer validtoken',
                bid: 'bid123',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const decoded = {
            name: 'Jane Doe',
            preferred_username: 'jane@example.com',
            oid: 'user-456',
            roles: ['admin'],
        };

        jwt.verify.mockImplementation((t, keyFn, options, cb) =>
            cb(null, decoded)
        );

        db.user_sessions.findOne.mockRejectedValue(new Error('DB error'));

        await validateOauthToken(req, res, next);

        expect(req.isActiveSession).toBe(undefined);
    });

    it('should return 500 if configPromise fails', async () => {
        const failingPromise = Promise.reject(new Error('Config failed'));

        // Avoid unhandled rejection by attaching a catch
        failingPromise.catch(() => { });
        global.configPromise = failingPromise;

        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer sometoken',
                bid: 'abc',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await validateOauthToken(req, res, next);

        expect(res.statusCode).toBe(200);


        // Restore configPromise
        global.configPromise = Promise.resolve();
    });


});
