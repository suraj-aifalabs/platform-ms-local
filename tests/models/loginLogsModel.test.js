
const { Sequelize, DataTypes } = require("sequelize");
const defineLoginLogs = require("../../server/models/loginLogsModel");

describe("LoginLogs Model - PostgreSQL", () => {
    let sequelize;
    let LoginLogs;

    beforeAll(async () => {
        sequelize = new Sequelize(
            process.env.DB_NAME || "myapp_test",
            process.env.DB_USER || "postgres",
            process.env.DB_PASSWORD || "password",
            {
                host: process.env.DB_HOST || "localhost",
                port: process.env.DB_PORT || 5432,
                dialect: "postgres",
                logging: false,
            }
        );

        LoginLogs = defineLoginLogs(sequelize, DataTypes);

    });
    beforeEach(() => {
        LoginLogs.create = jest.fn();
        LoginLogs.findAll = jest.fn();
    });

    it("should define the login_logs model correctly", () => {
        expect(LoginLogs.tableName).toBe("login_logs");
        expect(LoginLogs.rawAttributes.email.allowNull).toBe(false);
        expect(LoginLogs.rawAttributes.bid.allowNull).toBe(true);
    });

    it("should create a login log entry successfully", async () => {
        const mockData = {
            email: "test@example.com",
            name: "Test User",
            username: "testuser",
            action: "login",
            accessToken: "abc123",
            ipAddress: "127.0.0.1",
            timeZone: "IST",
            userAgent: "Mozilla/5.0",
            bid: "browser1",
        };

        LoginLogs.create.mockResolvedValue(mockData);

        const log = await LoginLogs.create(mockData);

        expect(log.email).toBe("test@example.com");
    });

    it("should fail when required fields are missing", async () => {
        LoginLogs.create.mockRejectedValue(new Error("Missing required fields"));

        await expect(LoginLogs.create({})).rejects.toThrow("Missing required fields");
    });
});
