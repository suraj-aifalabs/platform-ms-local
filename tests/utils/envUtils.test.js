/* eslint-env jest */
jest.mock('../../server/utils/ssm');

const { getParam } = require('../../server/utils/ssm');
const {
    getDBHost,
    getDBUser,
    getDBPassword,
    getDBName,
    getMSALTenantID,
    getMSALClientID,
    getMSALClientSecret
} = require('../../server/utils/envUtils');

describe('Parameter utility functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env = {
            POSTGRESQL_HOST: '/dev/db/host',
            POSTGRESQL_DB_USER: '/dev/db/user',
            POSTGRESQL_DB_PASSWORD: '/dev/db/password',
            POSTGRESQL_DB_NAME: '/dev/db/name',
            MSAL_TENANT_ID: '/dev/msal/tenant',
            MSAL_CLIENT_ID: '/dev/msal/client',
            MSAL_CLIENT_SECRET: '/dev/msal/secret'
        };
    });

    describe('successful parameter retrieval', () => {
        it('should return DB Host', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'db-host' } });
            const result = await getDBHost();
            expect(result).toBe('db-host');
            expect(getParam).toHaveBeenCalledWith('/dev/db/host');
        });

        it('should return DB User', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'db-user' } });
            const result = await getDBUser();
            expect(result).toBe('db-user');
            expect(getParam).toHaveBeenCalledWith('/dev/db/user');
        });

        it('should return DB Password', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'db-password' } });
            const result = await getDBPassword();
            expect(result).toBe('db-password');
            expect(getParam).toHaveBeenCalledWith('/dev/db/password');
        });

        it('should return DB Name', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'db-name' } });
            const result = await getDBName();
            expect(result).toBe('db-name');
            expect(getParam).toHaveBeenCalledWith('/dev/db/name');
        });

        it('should return MSAL Tenant ID', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'tenant-id' } });
            const result = await getMSALTenantID();
            expect(result).toBe('tenant-id');
            expect(getParam).toHaveBeenCalledWith('/dev/msal/tenant');
        });

        it('should return MSAL Client ID', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'client-id' } });
            const result = await getMSALClientID();
            expect(result).toBe('client-id');
            expect(getParam).toHaveBeenCalledWith('/dev/msal/client');
        });

        it('should return MSAL Client Secret', async () => {
            getParam.mockResolvedValue({ Parameter: { Value: 'client-secret' } });
            const result = await getMSALClientSecret();
            expect(result).toBe('client-secret');
            expect(getParam).toHaveBeenCalledWith('/dev/msal/secret');
        });
    });

    describe('error handling', () => {
        it('should handle error when getting DB Host', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getDBHost();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret POSTGRESQL_HOST',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting DB User', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getDBUser();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret POSTGRESQL_DB_USER',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting DB Password', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getDBPassword();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret POSTGRESQL_DB_PASSWORD',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting DB Name', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getDBName();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret POSTGRESQL_DB_NAME',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting MSAL Tenant ID', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getMSALTenantID();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret MSAL_TENANT_ID',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting MSAL Client ID', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getMSALClientID();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret MSAL_CLIENT_ID',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('should handle error when getting MSAL Client Secret', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
            getParam.mockRejectedValue(new Error('SSM Error'));

            const result = await getMSALClientSecret();

            expect(result).toBeUndefined();
            expect(consoleSpy).toHaveBeenCalledWith(
                'error getting ssm secret MSAL_CLIENT_SECRET',
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });
    });

    describe('environment variable handling', () => {
        it('should handle missing POSTGRESQL_HOST environment variable', async () => {
            delete process.env.POSTGRESQL_HOST;
            const result = await getDBHost();
            expect(result).toBeUndefined();
        });

        it('should handle missing POSTGRESQL_DB_USER environment variable', async () => {
            delete process.env.POSTGRESQL_DB_USER;
            const result = await getDBUser();
            expect(result).toBeUndefined();
        });

        it('should handle missing POSTGRESQL_DB_PASSWORD environment variable', async () => {
            delete process.env.POSTGRESQL_DB_PASSWORD;
            const result = await getDBPassword();
            expect(result).toBeUndefined();
        });

        it('should handle missing POSTGRESQL_DB_NAME environment variable', async () => {
            delete process.env.POSTGRESQL_DB_NAME;
            const result = await getDBName();
            expect(result).toBeUndefined();
        });

        it('should handle missing MSAL_TENANT_ID environment variable', async () => {
            delete process.env.MSAL_TENANT_ID;
            const result = await getMSALTenantID();
            expect(result).toBeUndefined();
        });

        it('should handle missing MSAL_CLIENT_ID environment variable', async () => {
            delete process.env.MSAL_CLIENT_ID;
            const result = await getMSALClientID();
            expect(result).toBeUndefined();
        });

        it('should handle missing MSAL_CLIENT_SECRET environment variable', async () => {
            delete process.env.MSAL_CLIENT_SECRET;
            const result = await getMSALClientSecret();
            expect(result).toBeUndefined();
        });
    });
});