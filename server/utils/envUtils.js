require("dotenv").config();
const { getParam } = require("./ssm.js");

const getDBHost = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.POSTGRESQL_HOST);
    return res.Parameter.Value;
};

const getDBUser = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.POSTGRESQL_DB_USER);
    return res.Parameter.Value;
};

const getDBPassword = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.POSTGRESQL_DB_PASSWORD);
    return res.Parameter.Value;
};

const getDBName = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.POSTGRESQL_DB_NAME);
    return res.Parameter.Value;
};

const getMSALTenantID = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.MSAL_TENANT_ID);
    return res.Parameter.Value;
};

const getMSALClientID = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.MSAL_CLIENT_ID);
    return res.Parameter.Value;
};

const getMSALClientSecret = async () => {
    // eslint-disable-next-line no-undef
    const res = await getParam(process.env.MSAL_CLIENT_SECRET);
    return res.Parameter.Value;
};

module.exports = {
    getDBHost,
    getDBUser,
    getDBPassword,
    getDBName,
    getMSALTenantID,
    getMSALClientID,
    getMSALClientSecret
};
