const request = require("supertest");
// jest.mock("../../server/middlewares/oauthMiddleware", () =>
//     require("../mocks/mockValidateOauthToken")
// );
const express = require('express');
const app = express();
app.use(express.json());
const { db } = require("../../server/config/db");
const { authAction, getUsers, createUsers, getLoginLogs, checkSession } = require("../../server/controllers/authController")

jest.mock("../../server/config/db", () => ({
    dbConnection: jest.fn(),
    db: {
        login_logs: {
            create: jest.fn(),
            findAndCountAll: jest.fn()
        },
        user_sessions: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn()
        },
        users: {
            create: jest.fn(),
            findAll: jest.fn()
        }
    }
}));


app.get('/get_login_logs', getLoginLogs);
app.get('/get_users', getUsers);
app.get('/checkSession', checkSession)
app.post('/auth_action', authAction);
app.post('/create_users', createUsers)


describe("Auth Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /auth_action", () => {
        it("should log login action and create session", async () => {
            db.login_logs.create.mockResolvedValue({});
            db.user_sessions.update.mockResolvedValue([1]);
            db.user_sessions.findOne.mockResolvedValue(null);
            db.user_sessions.create.mockResolvedValue({});

            const res = await request(app)
                .post("/auth_action")
                .send({
                    action: "login",
                    accessToken: "abc123",
                    ipAddress: "127.0.0.1",
                    bid: "browser1",
                    timeZone: "IST",
                    userAgent: "test-agent"
                })
            // .set("Authorization", "Bearer token");

            expect(res.statusCode).toBe(200);
            expect(res.body.flag).toBe("success");
            expect(db.login_logs.create).toHaveBeenCalled();
            expect(db.user_sessions.create).toHaveBeenCalled();
        });

        it("should return 400 on validation error", async () => {
            const res = await request(app)
                .post("/auth_action")
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body.flag).toBe("error");
        });
    });

    describe("GET /get_login_logs", () => {
        it("should return paginated login logs", async () => {
            db.login_logs.findAndCountAll.mockResolvedValue({
                count: 1,
                rows: [{ email: "a@b.com", name: "Test", action: "login" }]
            });

            const res = await request(app).get("/get_login_logs");

            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe("POST /createUsers", () => {
        it("should create a user", async () => {
            db.users.create.mockResolvedValue({ id: 1, userName: "user1" });

            const res = await request(app).post("/create_users");

            expect(res.statusCode).toBe(200);
            expect(res.body.users.userName).toBe("user1");
        });
    });

    describe("GET /getUsers", () => {
        it("should return users", async () => {
            db.users.findAll.mockResolvedValue([{ id: 1, userName: "user1" }]);

            const res = await request(app).get("/get_users");

            expect(res.statusCode).toBe(200);
            expect(res.body.users.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("GET /checkSession", () => {
        it("should return session active if valid session exists", async () => {
            db.user_sessions.findOne.mockResolvedValue({ username: "test", bid: "b1", is_active: true });

            const res = await request(app)
                .get("/checkSession")
                .set("bid", "b1")
            //.set("Authorization", "Bearer token");

            expect(res.statusCode).toBe(200);
            expect(res.body.isActiveSession).toBe(true);
        });

        it("should return 401 if session not found", async () => {
            db.user_sessions.findOne.mockResolvedValue(null);

            const res = await request(app)
                .get("/session")
                .set("bid", "b1")
            //.set("Authorization", "Bearer token");

            expect(res.statusCode).toBe(401);
            expect(res.body.isActiveSession).toBe(false);
        });
    });
});
