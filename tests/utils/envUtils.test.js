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
    });

    it('should return DB Host', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'db-host' } });
        const result = await getDBHost();
        expect(result).toBe('db-host');
        expect(getParam).toHaveBeenCalledWith(process.env.POSTGRESQL_HOST);
    });

    it('should return DB User', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'db-user' } });
        const result = await getDBUser();
        expect(result).toBe('db-user');
        expect(getParam).toHaveBeenCalledWith(process.env.POSTGRESQL_DB_USER);
    });

    it('should return DB Password', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'db-password' } });
        const result = await getDBPassword();
        expect(result).toBe('db-password');
        expect(getParam).toHaveBeenCalledWith(process.env.POSTGRESQL_DB_PASSWORD);
    });

    it('should return DB Name', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'db-name' } });
        const result = await getDBName();
        expect(result).toBe('db-name');
        expect(getParam).toHaveBeenCalledWith(process.env.POSTGRESQL_DB_NAME);
    });

    it('should return MSAL Tenant ID', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'tenant-id' } });
        const result = await getMSALTenantID();
        expect(result).toBe('tenant-id');
        expect(getParam).toHaveBeenCalledWith(process.env.MSAL_TENANT_ID);
    });

    it('should return MSAL Client ID', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'client-id' } });
        const result = await getMSALClientID();
        expect(result).toBe('client-id');
        expect(getParam).toHaveBeenCalledWith(process.env.MSAL_CLIENT_ID);
    });

    it('should return MSAL Client Secret', async () => {
        getParam.mockResolvedValue({ Parameter: { Value: 'client-secret' } });
        const result = await getMSALClientSecret();
        expect(result).toBe('client-secret');
        expect(getParam).toHaveBeenCalledWith(process.env.MSAL_CLIENT_SECRET);
    });
});
