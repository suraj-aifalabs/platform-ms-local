
/* eslint-env jest */

const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

const { db } = require("../../server/config/db");
jest.mock("../../server/models/userSessionModel");

db.user_sessions = {
    findOne: jest.fn(),
};

const { validateOauthToken } = require("../../server/middlewares/oauthMiddleware.js");

describe("validateOauthToken Middleware", () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        app.use(validateOauthToken);

        app.get("/secure-endpoint", (req, res) => {
            res.status(200).json({ success: true, user: req.user, isActiveSession: req.isActiveSession });
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 401 if Authorization header is missing", async () => {
        const res = await request(app).get("/secure-endpoint");

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
            success: false,
            statusCode: 401,
            message: "No Token Found!",
        });
    });

    it("should return 401 if JWT is expired", async () => {
        const token = "expired.token.value";

        jwt.verify.mockImplementation((token, getKey, options, callback) =>
            callback({ message: "jwt expired" }, null)
        );

        const res = await request(app)
            .get("/secure-endpoint")
            .set("Authorization", `Bearer ${token}`)
            .set("bid", "123");

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
            success: false,
            statusCode: 401,
            message: "Session Expired",
        });
    });

    it("should attach user and call next on valid token with active session", async () => {
        const decoded = {
            name: "John Doe [EXT]",
            preferred_username: "john@example.com",
            oid: "user-123",
            roles: ["user"],
        };

        jwt.verify.mockImplementation((token, getKey, options, callback) => callback(null, decoded));

        db.user_sessions.findOne.mockResolvedValue({
            id: 1,
            username: "john",
            bid: "bid123",
            is_active: true,
        });

        const res = await request(app)
            .get("/secure-endpoint")
            .set("Authorization", "Bearer validtoken")
            .set("bid", "bid123");

        expect(res.statusCode).toBe(200);
        expect(res.body.user).toEqual({
            name: "John Doe",
            email: "john@example.com",
            userId: "user-123",
            username: "john",
            roles: ["user"],
        });
        expect(res.body.isActiveSession).toBe(true);
    });

    it("should fallback gracefully if DB check fails", async () => {
        const decoded = {
            name: "Jane Doe",
            preferred_username: "jane@example.com",
            oid: "user-456",
            roles: ["admin"],
        };

        jwt.verify.mockImplementation((token, getKey, options, callback) => callback(null, decoded));

        db.user_sessions.findOne.mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .get("/secure-endpoint")
            .set("Authorization", "Bearer validtoken")
            .set("bid", "bid123");

        expect(res.statusCode).toBe(200);
        expect(res.body.isActiveSession).toBeUndefined();
    });

    it("should return 200 even if configPromise fails", async () => {
        // Override global configPromise to reject
        const originalConfigPromise = global.configPromise;
        global.configPromise = Promise.reject(new Error("Config failed"));
        global.configPromise.catch(() => { }); // Avoid unhandled rejection

        const decoded = {
            name: "Fallback User",
            preferred_username: "fallback@example.com",
            oid: "user-fallback",
            roles: ["guest"],
        };

        jwt.verify.mockImplementation((token, getKey, options, callback) => callback(null, decoded));
        db.user_sessions.findOne.mockResolvedValue(null);

        const res = await request(app)
            .get("/secure-endpoint")
            .set("Authorization", "Bearer sometoken")
            .set("bid", "abc");

        expect(res.statusCode).toBe(200);

        // Restore original configPromise
        global.configPromise = originalConfigPromise;
    });
});
