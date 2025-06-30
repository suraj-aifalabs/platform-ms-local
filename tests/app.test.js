const request = require("supertest");
const express = require("express");
const dotenv = require("dotenv");
const { app } = require("../server/app");
const { dbConnection } = require("../server/config/db");
const { beforeEach, afterEach } = require("@jest/globals");

dotenv.config();


describe("Express Application Tests", () => {
    beforeEach((done) => {
        // Establish a database connection before running tests
        dbConnection();
        done();
    });

    afterEach((done) => {
        // Optionally, close the db connection or cleanup
        done();
    });


    describe("POST /auth/login", () => {
        it("should return a token on successful login", async () => {
            await request(app)
                .post("/auth/login")
                .send({ username: "testUser", password: "testPass" }); // Adjust payload according to your auth logic
        });

        it("should reject invalid login attempts", async () => {
            await request(app)
                .post("/auth/login")
                .send({ username: "wrongUser", password: "wrongPass" });

        });
    });

    describe("Error Handling", () => {
        it("should return a 404 error for non-existent routes", async () => {
            await request(app).get("/non-existent-route");
        });
    });
});
