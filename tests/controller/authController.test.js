const request = require("supertest");
const express = require('express');
const app = express();
app.use(express.json());
const { db } = require("../../server/config/db");
const {
    authAction,
    getUsers,
    createUsers,
    getLoginLogs,
    checkSession,
    getPermissions,
    exportLoginLogs
} = require("../../server/controllers/authController");

// Mock dependencies
jest.mock("../../server/config/db", () => ({
    dbConnection: jest.fn(),
    db: {
        login_logs: {
            create: jest.fn(),
            findAndCountAll: jest.fn(),
            findAll: jest.fn()
        },
        user_sessions: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn()
        },
        users: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        },
        Sequelize: {
            Op: {
                or: jest.fn()
            },
            fn: jest.fn(),
            col: jest.fn(),
            where: jest.fn()
        }
    }
}));

// Mock permission utils
jest.mock("../../server/utils/permissionUtils", () => ({
    PERMISSION_CONST: [],
    DEFAULT_PERMISSION: []
}));

// Mock graph utils
jest.mock("../../server/utils/graphUtils", () => ({
    graphAPI: jest.fn()
}));

// Add middleware to inject user
app.use((req, res, next) => {
    req.user = {
        username: "test",
        email: "test@example.com",
        name: "Test User"
    };
    next();
});

// Setup routes
app.get('/get_login_logs', getLoginLogs);
app.get('/get_users', getUsers);
app.get('/checkSession', checkSession);
app.get('/get_permissions', getPermissions);
app.get('/export_login_logs', exportLoginLogs);
app.post('/auth_action', authAction);
app.post('/create_users', createUsers);

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
            db.users.findOne.mockResolvedValue({});
            db.users.update.mockResolvedValue([1]);

            const res = await request(app)
                .post("/auth_action")
                .send({
                    action: "login",
                    accessToken: "abc123",
                    ipAddress: "127.0.0.1",
                    bid: "browser1",
                    timeZone: "IST",
                    userAgent: "test-agent",
                    email: "test@example.com",
                    name: "Test User"
                });

            expect(res.statusCode).toBe(200);
            expect(db.login_logs.create).toHaveBeenCalled();
            expect(db.user_sessions.update).toHaveBeenCalled();
        });

        it("should handle logout action", async () => {
            db.login_logs.create.mockResolvedValue({});
            db.user_sessions.update.mockResolvedValue([1]);

            const res = await request(app)
                .post("/auth_action")
                .send({
                    action: "logout",
                    accessToken: "abc123",
                    ipAddress: "127.0.0.1",
                    bid: "browser1",
                    timeZone: "IST",
                    userAgent: "test-agent",
                    email: "test@example.com",
                    name: "Test User"
                });

            expect(res.statusCode).toBe(200);
            expect(db.user_sessions.update).toHaveBeenCalledWith(
                { is_active: false },
                { where: { username: "test", bid: "browser1" } }
            );
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
            expect(res.body.data.length).toBe(1);
            expect(res.body.pagination.totalRecords).toBe(1);
        });

        it("should handle search query", async () => {
            db.login_logs.findAndCountAll.mockResolvedValue({
                count: 1,
                rows: [{ email: "test@example.com", name: "Test", action: "login" }]
            });

            const res = await request(app)
                .get("/get_login_logs")
                .query({ search: "test" });

            expect(res.statusCode).toBe(200);
            expect(db.login_logs.findAndCountAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.any(Object)
                })
            );
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
            expect(res.body.users.length).toBe(1);
        });
    });

    describe("GET /checkSession", () => {
        it("should return session active if valid session exists", async () => {
            db.user_sessions.findOne.mockResolvedValue({ username: "test", bid: "b1", is_active: true });

            const res = await request(app)
                .get("/checkSession")
                .set("bid", "b1");

            expect(res.statusCode).toBe(200);
            expect(res.body.isActiveSession).toBe(true);
        });

        it("should return 401 if session not found", async () => {
            db.user_sessions.findOne.mockResolvedValue(null);

            const res = await request(app)
                .get("/checkSession")
                .set("bid", "b1");

            expect(res.statusCode).toBe(401);
            expect(res.body.isActiveSession).toBe(false);
        });

        it("should return 401 if bid header is missing", async () => {
            const res = await request(app).get("/checkSession");

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("No ID or username found");
        });
    });

    describe("GET /get_permissions", () => {


        it("should handle users with no permissions", async () => {
            db.users.findOne.mockResolvedValue({
                memberOf: [],
                jnjUsername: 'test',
                name: 'Test User',
                sub: '123'
            });

            const res = await request(app).get("/get_permissions");

            expect(res.statusCode).toBe(200);
            expect(res.body.data.hasUserPermission).toBe(false);
        });
    });

    describe("GET /export_login_logs", () => {
        it("should set PDF headers", async () => {
            db.login_logs.findAll.mockResolvedValue([]);

            const res = await request(app)
                .get("/export_login_logs")
                .expect('Content-Type', 'application/pdf')
                .expect('Content-Disposition', /audit-logs-.*\.pdf/);

            expect(res.statusCode).toBe(200);
        });

        it("should handle search query", async () => {
            db.login_logs.findAll.mockResolvedValue([]);

            await request(app)
                .get("/export_login_logs")
                .query({ search: "test" });

            expect(db.login_logs.findAll).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.any(Object)
                })
            );
        });
    });
});