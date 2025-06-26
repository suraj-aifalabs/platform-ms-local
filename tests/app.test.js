const request = require("supertest");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

jest.mock("../server/config/db", () => ({
    dbConnection: jest.fn(),
}));

jest.mock("../server/middlewares/oauthMiddleware", () => ({
    validateOauthToken: (req, res, next) => next(),
}));

const authRoutes = require("../server/routes/authRoutes");
const healthRoutes = require("../server/routes/healthRoutes");
const ErrorHandler = require("../server/middlewares/errorHandler");
const responseWrapper = require("../server/middlewares/responseWrapper");
const { dbConnection } = require("../server/config/db");

describe("Express Application", () => {
    let app;

    beforeAll(() => {
        dbConnection(); // Call mocked DB connection
    });

    beforeEach(() => {
        app = express();

        app.use(helmet());
        app.use(responseWrapper);
        app.use(express.json());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(logger("dev"));

        const corsOptions = {
            origin: process.env.ALLOWED_ORIGIN || "*",
            methods: "GET,POST,PUT,DELETE",
        };
        app.use(cors(corsOptions));

        const { validateOauthToken } = require("../server/middlewares/oauthMiddleware");

        app.use("/auth", validateOauthToken, authRoutes);
        app.use("/", healthRoutes);

        app.use(ErrorHandler);
    });

    it("should respond to health check", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        // Adjust this based on what your health route actually returns
        expect(res.body).toHaveProperty("message");
    });

    it("should access auth routes (mocked middleware allows)", async () => {
        const res = await request(app).post("/auth/login").send({ username: "test", password: "password" });
        // Expecting 404 or whatever your authRoutes returns if login route is not defined in mock
        expect(res.statusCode).toBe(404);
    });

    it("should return 404 on unknown routes", async () => {
        const res = await request(app).get("/unknown-route");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({});
    });
});