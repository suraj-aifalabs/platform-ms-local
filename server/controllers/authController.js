const Joi = require("joi");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { db } = require("../config/db");
const { sanitizeInput } = require("../utils/sanitizeRules");

exports.authAction = catchAsyncError(async (req, res) => {
    const reqbody = sanitizeInput(req.method === "GET" ? req.query : req.body);
    const { action, accessToken, ipAddress, bid, timeZone, userAgent } = reqbody;
    const email = req?.user?.email ?? "";
    const name = req?.user?.name ?? "";
    const username = req.user?.username || "system";

    const reqBodyValidation = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().trim().required(),
        username: Joi.string().trim().required(),
        action: Joi.string().valid("login", "logout").required(),
        accessToken: Joi.string().trim().required(),
        ipAddress: Joi.string().trim().required(),
        timeZone: Joi.string().trim().required(),
        userAgent: Joi.string().trim().required(),
        bid: Joi.string().trim().required(),
    });

    const validationBody = {
        email,
        name,
        action,
        username,
        accessToken,
        ipAddress,
        timeZone,
        userAgent,
        bid
    };

    const validationResult = reqBodyValidation.validate(validationBody);
    if (validationResult.error) {
        return res.status(400).json({
            flag: "error",
            message: "fail",
            error: validationResult.error?.message.replace(
                /"([^"]+)"/,
                (match, p1) =>
                    p1
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replace(/^\w/, (c) => c.toUpperCase())
            ),
        });
    }

    await db.login_logs.create({
        email: email,
        name: name,
        username: username,
        action: action,
        accessToken: accessToken,
        ipAddress: ipAddress,
        timeZone: timeZone,
        userAgent: userAgent,
        bid: bid
    });

    if (action === "login") {
        await db.user_sessions.update(
            { is_active: false },
            { where: { username: username, is_active: true } }
        );

        const existingSession = await db.user_sessions.findOne({
            where: { username: username, bid: bid }
        });

        if (existingSession) {
            await db.user_sessions.update(
                { is_active: true },
                { where: { username: username, bid: bid } }
            );
        } else {
            await db.user_sessions.create({
                username: username,
                bid: bid,
                is_active: true
            });
        }
    } else if (action === "logout") {
        await db.user_sessions.update(
            { is_active: false },
            { where: { username: username, bid: bid } }
        );
    }


    return res.status(200).json({
        flag: "success",
        message: "API Executed Successfully",
        userInfo: req?.user ?? {},
        isActiveSession: true // This session is now active
    });
});

exports.getLoginLogs = catchAsyncError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;

    const { count, rows: logs } = await db.login_logs.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        attributes: {
            exclude: ["accessToken"]
        }
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
        success: true,
        data: logs,
        pagination: {
            currentPage: page,
            totalPages,
            totalRecords: count,
            recordsPerPage: limit,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        },
    });
});

exports.createUsers = catchAsyncError(async (req, res) => {
    const istDate = new Date();

    const users = await db.users.create({
        userName: "user1",
        email: "user1@example.com"
    });

    res.status(200).json({
        message: "success",
        time: istDate,
        users
    });
});

exports.getUsers = catchAsyncError(async (req, res) => {
    const istDate = new Date();

    const users = await db.users.findAll({});

    res.status(200).json({
        message: "success",
        time: istDate,
        users
    });
});

exports.checkSession = catchAsyncError(async (req, res) => {

    const bid = req.headers.bid;
    const username = req.user?.username;

    if (!username || !bid) {
        return res.status(401).json({
            flag: "error",
            message: "No ID or username found",
            isActiveSession: false
        });
    }

    const activeSession = await db.user_sessions.findOne({
        where: {
            username: username,
            bid: bid,
            is_active: true
        }
    });

    if (!activeSession) {
        return res.status(401).json({
            flag: "error",
            message: "Session expired",
            isActiveSession: false
        });
    }

    return res.status(200).json({
        flag: "success",
        message: "API Executed Successfully",
        isActiveSession: true
    });
});
