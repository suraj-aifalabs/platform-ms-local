const axios = require("axios");

async function graphAPI({ userEmail, accessToken }) {
    try {
        if (!accessToken) {
            throw new Error("Please provide Token");
        }

        if (!userEmail) {
            throw new Error("Please provide email");
        }

        const selectFields = "displayName,givenName,employeeId,jobTitle,surname,mail,streetAddress,country,region,postalCode";
        const userUrl = `https://graph.microsoft.com/v1.0/users/${userEmail}?$select=${selectFields}`;
        const memberOfSelectFields = "displayName"; // Only fetch the displayName field
        const memberOfUrl = `https://graph.microsoft.com/v1.0/users/${userEmail}/memberOf?$select=${memberOfSelectFields}&$top=999`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const userResponse = await axios.get(userUrl, { headers });
        const userData = userResponse.data;

        const memberOfResponse = await axios.get(memberOfUrl, { headers });
        const memberOfData = memberOfResponse.data?.value;

        const filteredGroups = memberOfData.filter(group => group?.displayName.startsWith("JAN-APP")).map(group => group?.displayName);

        userData.memberOf = filteredGroups;

        return userData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error in graphAPI:", error.message);
        throw error;
    }
}

module.exports = {
    graphAPI,
};
