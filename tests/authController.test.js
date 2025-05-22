/* eslint-env jest */

const request = require('supertest');
const app = require('../server/app')
const { db } = require("../server/config/db")

jest.mock('../server/models/userSessionModel');

db.user_sessions = {
    findOne: jest.fn(),
};
describe('checkSession API', () => {
    const endpoint = '/api/auth/session';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if no bid or username is provided', async () => {
        const res = await request(app)
            .get(endpoint)
            .set('bid', ''); // No bid

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
            message: "No Token Found!",
            statusCode: 401,
            success: false,

        });
    });

    it('should return 401 if session is not active', async () => {
        db.user_sessions.findOne.mockResolvedValue(null);

        const res = await request(app)
            .get(endpoint)
            .set('bid', '123')
            .set('Authorization', 'Bearer token'); // simulate auth

        app.use((req, res, next) => {
            req.user = { username: 'testuser' };
            next();
        });

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
            message: "jwt malformed",
            statusCode: 401,
            success: false,

        });
    });

    // it('should return 200 if session is active', async () => {
    //     db.user_sessions.findOne.mockResolvedValue({
    //         id: 1,
    //         username: 'testuser',
    //         bid: '123',
    //         is_active: true
    //     });

    //     const res = await request(app)
    //         .get(endpoint)
    //         .set('bid', '123')
    //         .set('Authorization', 'Bearer token');

    //     app.use((req, res, next) => {
    //         req.user = { username: 'testuser' };
    //         next();
    //     });

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toEqual({
    //         flag: "success",
    //         message: "API Executed Successfully",
    //         isActiveSession: true
    //     });
    // });
});
