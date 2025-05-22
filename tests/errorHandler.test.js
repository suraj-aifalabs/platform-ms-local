/* eslint-env jest */

const request = require("supertest");
const express = require("express");
const errorHandler = require("../server/middlewares/errorHandler");

// eslint-disable-next-line no-undef
describe("Error Handler Middleware", () => {
    let app;

    // eslint-disable-next-line no-undef
    beforeAll(() => {
        app = express();

        app.get("/error", (req, res, next) => {
            const error = new Error('Something went wrong!');
            error.statusCode = 400;
            next(error);
        });

        app.use(errorHandler);
    });

    it('should return proper error response', async () => {
        const res = await request(app).get('/error');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            success: false,
            message: 'Something went wrong!',
        });
    });

    // it('should default to 500 and "Internal Error" if no status/message', async () => {
    //     app.get('/default-error', (req, res, next) => {
    //         next({});
    //     });

    //     const res = await request(app).get('/default-error');

    //     expect(res.statusCode).toBe(500);
    //     expect(res.body).toEqual({
    //         success: false,
    //         message: 'Internal Error',
    //     });
    // });
});
