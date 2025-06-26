const { db } = require("../config/db");
const { PERMISSION_CONST } = require("../utils/permissionUtils");

module.exports.permissionMiddleware = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const { username } = req.user;

            const userData = await db.users.findOne({
                where: { jnjUsername: username },
                attributes: ["memberOf", "jnjUsername", "name", "sub"],
                raw: true
            });

            if (!userData) {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "User not found.",
                });
            }

            const adgroupResList = PERMISSION_CONST.filter((e) => userData?.memberOf?.includes(e?.name));

            // Extract user permissions from the AD groups
            const userPermissions = adgroupResList.flatMap((group) =>
                group.permissionList
                    ? group.permissionList.flatMap((perm) =>
                        perm.permissions
                            .filter((p) => p.hasAccess)
                            .map((p) => p.label)
                    )
                    : []
            );

            const hasPermission = userPermissions.includes(requiredPermission);

            if (!hasPermission) {
                return res.status(403).json({
                    success: false,
                    statusCode: 403,
                    message: `Access denied. Required permission: ${requiredPermission}`,
                });
            }
            req.userPermissions = userPermissions;
            next();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Permission Middleware error: ${error}`);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal server error.",
            });
        }
    };
};