const express = require("express");
const { authAction, getUsers, createUsers, getLoginLogs, checkSession } = require("../controllers/authController");
const router = express.Router();

router.get("/get_users", getUsers);
router.get("/create_users", createUsers);
router.post("/auth_action", authAction);
router.get("/get_login_logs", getLoginLogs);
router.get("/session", checkSession);

module.exports = router;
