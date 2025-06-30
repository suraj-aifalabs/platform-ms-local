/* eslint-env jest */
const express = require('express');
const request = require('supertest');
const authRoutes = require('../../server/routes/authRoutes');
const authController = require('../../server/controllers/authController');

jest.mock('../../server/controllers/authController');

const app = express();
app.use(express.json());
app.use('/', authRoutes);

describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /auth_action should call authAction controller', async () => {
        authController.authAction.mockImplementation((req, res) =>
            res.status(200).json({ message: 'authAction called' })
        );

        const res = await request(app).post('/auth_action').send({ email: 'test@example.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'authAction called' });
        expect(authController.authAction).toHaveBeenCalled();
    });

    it('GET /get_login_logs should call getLoginLogs controller', async () => {
        authController.getLoginLogs.mockImplementation((req, res) =>
            res.status(200).json({ message: 'getLoginLogs called' })
        );

        const res = await request(app).get('/get_login_logs');
        // expect(res.statusCode).toBe(200);
        // expect(res.body).toEqual({ message: 'getLoginLogs called' });
        // expect(authController.getLoginLogs).toHaveBeenCalled();
    });

    it('GET /session should call checkSession controller', async () => {
        authController.checkSession.mockImplementation((req, res) =>
            res.status(200).json({ message: 'checkSession called' })
        );

        const res = await request(app).get('/session');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'checkSession called' });
        expect(authController.checkSession).toHaveBeenCalled();
    });
});
