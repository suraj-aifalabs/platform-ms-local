const Joi = require("joi");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { db } = require("../config/db");
const { fn, col, where } = require("sequelize");
const { sanitizeInput } = require("../utils/sanitizeRules");
const { graphAPI } = require("../utils/graphUtils");
const { PERMISSION_CONST, DEFAULT_PERMISSION } = require("../utils/permissionUtils");
const PDFDocument = require("pdfkit");

exports.authAction = catchAsyncError(async (req, res) => {
    const reqbody = sanitizeInput(req.method === "GET" ? req.query : req.body);
    const { action, accessToken, ipAddress, bid, timeZone, userAgent } = reqbody;
    const email = req?.user?.email ?? "";
    const name = req?.user?.name ?? "";
    const username = req.user?.username?.toLowerCase() || "system";

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

    const userData = await graphAPI({ userEmail: email, accessToken: accessToken });

    const userObj = {
        streetAddress: userData?.streetAddress ?? "",
        country: userData?.country ?? "",
        region: userData?.region ?? "",
        email: email.toLowerCase() ?? userData?.mail?.toLowerCase(),
        familyName: userData?.surname ?? "",
        givenName: userData?.givenName ?? "",
        memberOf: userData?.memberOf ?? [],
        name,
        sub: userData?.employeeId ?? "",
        jnjUsername: username.toLowerCase(),
    };

    // eslint-disable-next-line no-undef
    if (process.env.MOCK_GROUP) {
        userObj.memberOf = ["JAN-APP-ATARA-DEV-SYSTEMADMIN"];
    }

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

        const isUserExists = await db.users.findOne({
            where: { jnjUsername: username?.toLowerCase() }
        });

        if (isUserExists) {
            await db.users.update(
                userObj,
                { where: { jnjUsername: username } }
            );
        } else {
            await db.users.create(userObj);
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
        isActiveSession: true
    });
});

exports.getLoginLogs = catchAsyncError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const whereClause = {};
    if (search !== "") {
        whereClause[db.Sequelize.Op.or] = [
            where(
                fn("LOWER", col("username")),
                "LIKE",
                `%${search.toLowerCase()}%`
            ),
            where(
                fn("LOWER", col("name")),
                "LIKE",
                `%${search.toLowerCase()}%`
            )
        ];
    }
    const { count, rows: logs } = await db.login_logs.findAndCountAll({
        where: whereClause,
        order: [[sortBy, sortOrder]],
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

exports.exportLoginLogs = catchAsyncError(async (req, res) => {
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const userDetails = req.user || {};
    const exportedBy = userDetails.name || userDetails.username || "System";
    const exportedAt = new Date().toLocaleString();

    const whereClause = {};
    if (search !== "") {
        whereClause[db.Sequelize.Op.or] = [
            where(fn("LOWER", col("username")), "LIKE", `%${search.toLowerCase()}%`),
            where(fn("LOWER", col("name")), "LIKE", `%${search.toLowerCase()}%`)
        ];
    }

    const logs = await db.login_logs.findAll({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        attributes: {
            exclude: ["accessToken"]
        }
    });


    const doc = new PDFDocument({ margin: 30, size: "A4" });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `audit-logs-${timestamp}.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    let pageNumber = 1;
    const FOOTER_RESERVED_SPACE = 70;
    const addFooter = (currentPageNumber) => {
        const footerStartY = doc.page.height - 60;

        doc.strokeColor("#366092")
            .lineWidth(1)
            .moveTo(30, footerStartY)
            .lineTo(doc.page.width - 30, footerStartY)
            .stroke();

        doc.fontSize(8)
            .fillColor("#666");

        doc.text(`Exported by ${exportedBy} on ${exportedAt}`,
            30, footerStartY + 8, { continued: false });

        doc.text(`Page ${currentPageNumber}`,
            doc.page.width - 100, footerStartY + 8,
            { align: "right", continued: false });
    };

    const addNewPage = () => {
        doc.addPage();
        pageNumber++;

        const currentY = 30;
        let headerX = startX;
        headers.forEach((header, i) => {
            doc
                .font("Helvetica-Bold")
                .fontSize(10)
                .fillColor("white")
                .rect(headerX, currentY, columnWidths[i], rowHeight)
                .fill("#366092")
                .fillColor("white")
                .text(header, headerX + 5, currentY + 6, {
                    width: columnWidths[i] - 10,
                    align: "left",
                    continued: false,
                });
            headerX += columnWidths[i];
        });

        return currentY + rowHeight;
    };

    doc.fontSize(16).fillColor("#333").text("Audit Logs", { align: "center" });

    const headers = ["Name", "Username", "Event", "Time Zone", "Timestamp"];
    const columnWidths = [120, 100, 80, 120, 180];
    const rowHeight = 22;
    const startX = 30;
    let currentY = doc.y + 20;

    let x = startX;
    headers.forEach((header, i) => {
        doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .fillColor("white")
            .rect(x, currentY, columnWidths[i], rowHeight)
            .fill("#366092")
            .fillColor("white")
            .text(header, x + 5, currentY + 6, {
                width: columnWidths[i] - 10,
                align: "left",
                continued: false,
            });
        x += columnWidths[i];
    });

    currentY += rowHeight;

    logs.forEach((log) => {
        const row = [
            log.name || "N/A",
            log.username || "N/A",
            log.action ? log.action.charAt(0).toUpperCase() + log.action.slice(1) : "N/A",
            log.timeZone || "N/A",
            log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A",
        ];

        // Check if we need a new page - reserve space for footer
        if (currentY + rowHeight > doc.page.height - FOOTER_RESERVED_SPACE) {
            addFooter(pageNumber);
            currentY = addNewPage();
        }

        let x = startX;
        row.forEach((cell, i) => {
            doc
                .font("Helvetica")
                .fontSize(9)
                .fillColor("black")
                .text(cell, x + 5, currentY + 6, {
                    width: columnWidths[i] - 10,
                    align: "left",
                    continued: false,
                });
            x += columnWidths[i];
        });

        currentY += rowHeight;
    });

    addFooter(pageNumber);

    doc.end();
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

exports.getPermissions = catchAsyncError(async (req, res) => {
    const user = req.user;

    const userData = await db.users.findOne({
        where: { jnjUsername: user?.username },
        attributes: ["memberOf", "jnjUsername", "name", "sub"],
        raw: true
    });

    const memberOfArray = userData?.memberOf ?? [];

    const allPermission = PERMISSION_CONST.filter((permission) =>
        memberOfArray.some(member => permission.name.includes(member))
    );

    const defaultPermissions = JSON.parse(JSON.stringify(DEFAULT_PERMISSION));

    let hasUserPermission = false;
    // Merge adgroup permissions with default permissions

    allPermission.forEach((adgroupRes) => {
        adgroupRes?.permissionList?.forEach((permission) => {
            const moduleEntry = defaultPermissions.find(
                (entry) => entry.module === permission.module
            );

            if (moduleEntry) {
                moduleEntry.permissions.forEach((perm) => {
                    const updatedPermission = permission.permissions.find(
                        (p) => p.label === perm.label
                    );
                    if (updatedPermission) {
                        perm.hasAccess = perm.hasAccess || updatedPermission.hasAccess;
                    }
                });
                moduleEntry.hasAccess = moduleEntry.permissions.some((perm) => perm.hasAccess);
            }
        });
    });

    hasUserPermission = defaultPermissions.some(module => module.hasAccess);

    if (!hasUserPermission) {
        await db.login_logs.create({
            email: user?.email ?? "",
            name: user?.name ?? "",
            username: user?.username,
            action: "unauthorized",
            accessToken: "",
            ipAddress: "",
            timeZone: "",
            userAgent: "",
            bid: ""
        });
    }
    userData.userPermission = defaultPermissions;
    userData.hasUserPermission = hasUserPermission;

    res.status(200).json({
        message: "success",
        data: userData,
        allPermission,
        user,
    });
});
