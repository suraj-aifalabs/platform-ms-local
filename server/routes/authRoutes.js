const express = require("express");
const { authAction, getUsers, createUsers, getLoginLogs, checkSession, getPermissions, exportLoginLogs } = require("../controllers/authController");
// const { PERMISSION_LIST } = require("../utils/permissionUtils");
const router = express.Router();

// const middlewares = {
//     permissionMiddleware: require("../middlewares/permissionMiddleware").permissionMiddleware,
// };

router.get("/get_users", getUsers);
router.get("/create_users", createUsers);
router.post("/auth_action", authAction);
router.get("/get_login_logs", getLoginLogs);
router.get("/export_login_logs", exportLoginLogs);
router.get("/session", checkSession);
// router.get("/session", middlewares.permissionMiddleware(PERMISSION_LIST.PII_READ), checkSession);
router.get("/get_permission", getPermissions);

module.exports = router;
