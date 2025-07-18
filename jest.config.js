module.exports = {
    testEnvironment: "node",
    clearMocks: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["server/**/*.{js,ts}"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/src/migrations/",
        "/src/seeders/"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    // setupFilesAfterEnv: ["./tests/setup.js"]
};