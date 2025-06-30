const express = require("express");
const { authAction, getLoginLogs, checkSession, getPermissions, exportLoginLogs } = require("../controllers/authController");
const { PERMISSION_LIST } = require("../utils/permissionUtils");
const router = express.Router();

const middlewares = {
    permissionMiddleware: require("../middlewares/permissionMiddleware").permissionMiddleware,
};

router.post("/auth_action", authAction);
router.get("/get_login_logs", middlewares.permissionMiddleware(PERMISSION_LIST.CONFIGURATION_AUDIT_LOGS_READ), getLoginLogs);
router.get("/export_login_logs", middlewares.permissionMiddleware(PERMISSION_LIST.CONFIGURATION_AUDIT_LOGS_READ), exportLoginLogs);
router.get("/session", checkSession);
router.get("/get_permission", getPermissions);

module.exports = router;
