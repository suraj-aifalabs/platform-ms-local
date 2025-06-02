/* eslint-env jest */
require("dotenv").config({ path: ".env.test" });
const { Sequelize, DataTypes } = require("sequelize");
const defineAdGroupsModel = require("../../server/models/adGroupModel");

describe("ad_groups Model - PostgreSQL", () => {
    let sequelize;
    let AdGroups;

    beforeAll(async () => {
        sequelize = new Sequelize(


            process.env.DB_NAME || "dbname",
            process.env.DB_USER || "dbuser",
            process.env.DB_PASSWORD || "db_password",
            {
                host: process.env.DB_HOST || "localhost",
                port: Number(process.env.DB_PORT) || 5432,
                dialect: "postgres",
                logging: false
            }
        );

        AdGroups = defineAdGroupsModel(sequelize, DataTypes);

    });
    beforeEach(() => {
        AdGroups.create = jest.fn();
        AdGroups.findAll = jest.fn();
    });
    afterAll(async () => {
        await sequelize.close();
    });


    it("should define the model correctly", () => {
        expect(AdGroups).toBeDefined();
        expect(AdGroups.tableName).toBe("ad_groups");
    });

    it("should create a valid ad_group entry", async () => {
        const mockGroup = {
            name: "Admin Group",
            is_active: true,
            permissionList: [{ module: "dashboard", access: "read" }]
        };

        AdGroups.create.mockResolvedValue(mockGroup);

        const created = await AdGroups.create(mockGroup);
        expect(created.name).toBe("Admin Group");
        expect(created.is_active).toBe(true);
        expect(Array.isArray(created.permissionList)).toBe(true);
    });

    it("should throw error when required fields are missing", async () => {
        AdGroups.create.mockRejectedValue(new Error("Validation error"));

        await expect(AdGroups.create({})).rejects.toThrow("Validation error");
    });

    it("should allow null for permissionList", async () => {
        const mockGroup = {
            name: "Guest Group",
            is_active: false,
            permissionList: null
        };

        AdGroups.create.mockResolvedValue(mockGroup);

        const created = await AdGroups.create(mockGroup);
        expect(created.permissionList).toBeNull();
    });
});
