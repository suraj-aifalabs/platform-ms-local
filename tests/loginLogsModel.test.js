/* eslint-env jest */

const { DataTypes, Sequelize } = require('sequelize');
const defineLoginLogsModel = require('../server/models/loginLogsModel');
const { expect } = require('@jest/globals');

describe('LoginLogs Model', () => {
    const sequelize = new Sequelize('sqlite::memory:');
    const LoginLogs = defineLoginLogsModel(sequelize, DataTypes);
    const instance = LoginLogs.build();

    it('should have correct model name', () => {
        expect(LoginLogs.name).toBe('login_logs');
    });

    it('should have expected fields', () => {
        const attributes = LoginLogs.rawAttributes;

        expect(attributes.email).toBeDefined();
        expect(attributes.name).toBeDefined();
        expect(attributes.username).toBeDefined();
        expect(attributes.action).toBeDefined();
        expect(attributes.accessToken).toBeDefined();
        expect(attributes.ipAddress).toBeDefined();
        expect(attributes.timeZone).toBeDefined();
        expect(attributes.userAgent).toBeDefined();
        expect(attributes.bid).toBeDefined();
    });

    it('should have required fields as non-nullable', () => {
        const attrs = LoginLogs.rawAttributes;

        for (const field of [
            'email', 'name', 'username', 'action', 'accessToken',
            'ipAddress', 'timeZone', 'userAgent', 'bid'
        ]) {
            expect(attrs[field].allowNull).toBe(false);
        }
    });

    it('should use correct table name and options', () => {
        expect(LoginLogs.options.tableName).toBe('login_logs');
        expect(LoginLogs.options.schema).toBe('public');
        expect(LoginLogs.options.timestamps).toBe(true);
        expect(LoginLogs.options.underscored).toBe(true);
        expect(LoginLogs.options.freezeTableName).toBe(true);
    });
});
