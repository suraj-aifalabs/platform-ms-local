/* eslint-env jest */

const request = require("supertest");
const express = require("express");
const asyncHandler = require("../../server/middlewares/catchAsyncError");

describe("Async Handler Middleware", () => {
    let app;

    beforeAll(() => {
        app = express();

        // Example route using the async handler
        app.get("/async-error", asyncHandler(async (req, res) => {
            // Simulating an error
            throw new Error('Async error occurred!');
        }));

        app.use((err, req, res, next) => {
            // Basic error handling middleware
            res.status(500).json({
                success: false,
                message: err.message,
            });
        });
    });

    it('should catch async errors and pass to error handler', async () => {
        const res = await request(app).get('/async-error');

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({
            success: false,
            message: 'Async error occurred!',
        });
    });

    it('should work properly when no errors occur', async () => {
        app.get("/success", asyncHandler(async (req, res) => {
            res.status(200).json({ success: true, message: 'Everything is fine!' });
        }));

        const res = await request(app).get('/success');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            success: true,
            message: 'Everything is fine!',
        });
    });
});
