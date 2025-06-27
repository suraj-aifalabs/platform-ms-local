const { graphAPI } = require('../../server/utils/graphUtils');
const axios = require('axios');

jest.mock('axios');

describe('graphAPI', () => {
    const mockAccessToken = 'mock-access-token';
    const mockUserEmail = 'user@example.com';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('error cases', () => {
        it('should throw error when no access token is provided', async () => {
            await expect(graphAPI({ userEmail: mockUserEmail }))
                .rejects
                .toThrow('Please provide Token');
        });

        it('should throw error when no email is provided', async () => {
            await expect(graphAPI({ accessToken: mockAccessToken }))
                .rejects
                .toThrow('Please provide email');
        });

        it('should throw error when Graph API returns error', async () => {
            axios.get.mockRejectedValue(new Error('API Error'));

            await expect(graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            }))
                .rejects
                .toThrow('API Error');
        });
    });

    describe('success cases', () => {
        const mockUserData = {
            displayName: 'John Doe',
            givenName: 'John',
            employeeId: '12345',
            jobTitle: 'Developer',
            surname: 'Doe',
            mail: 'john.doe@example.com',
            streetAddress: '123 Main St',
            country: 'USA',
            region: 'WA',
            postalCode: '98001'
        };

        const mockGroupsData = {
            value: [
                { displayName: 'JAN-APP-Developers' },
                { displayName: 'JAN-APP-Admins' },
                { displayName: 'OTHER-GROUP' } // Should be filtered out
            ]
        };

        beforeEach(() => {
            axios.get.mockImplementation((url) => {
                if (url.includes('/memberOf')) {
                    return Promise.resolve({ data: mockGroupsData });
                }
                return Promise.resolve({ data: mockUserData });
            });
        });

        it('should fetch user data with selected fields', async () => {
            const result = await graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            });

            expect(axios.get).toHaveBeenCalledTimes(2);
            expect(axios.get).toHaveBeenCalledWith(
                `https://graph.microsoft.com/v1.0/users/${mockUserEmail}?$select=displayName,givenName,employeeId,jobTitle,surname,mail,streetAddress,country,region,postalCode`,
                { headers: { Authorization: `Bearer ${mockAccessToken}` } }
            );
        });

        it('should fetch memberOf data with selected fields', async () => {
            const result = await graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            });

            expect(axios.get).toHaveBeenCalledWith(
                `https://graph.microsoft.com/v1.0/users/${mockUserEmail}/memberOf?$select=displayName&$top=999`,
                { headers: { Authorization: `Bearer ${mockAccessToken}` } }
            );
        });

        it('should return user data with filtered groups', async () => {
            const result = await graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            });

            expect(result).toEqual({
                ...mockUserData,
                memberOf: ['JAN-APP-Developers', 'JAN-APP-Admins']
            });
        });

        it('should handle empty groups response', async () => {
            axios.get.mockImplementation((url) => {
                if (url.includes('/memberOf')) {
                    return Promise.resolve({ data: { value: [] } });
                }
                return Promise.resolve({ data: mockUserData });
            });

            const result = await graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            });

            expect(result.memberOf).toEqual([]);
        });

        it('should handle no JAN-APP groups', async () => {
            axios.get.mockImplementation((url) => {
                if (url.includes('/memberOf')) {
                    return Promise.resolve({
                        data: {
                            value: [
                                { displayName: 'OTHER-GROUP-1' },
                                { displayName: 'OTHER-GROUP-2' }
                            ]
                        }
                    });
                }
                return Promise.resolve({ data: mockUserData });
            });

            const result = await graphAPI({
                accessToken: mockAccessToken,
                userEmail: mockUserEmail
            });

            expect(result.memberOf).toEqual([]);
        });
    });
});