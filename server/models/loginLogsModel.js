module.exports = (sequelize, DataTypes) => {
    const LoginLogs = sequelize.define("login_logs", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessToken: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bid: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        schema: "public",
        tableName: "login_logs",
        timestamps: true,
        underscored: true,
        freezeTableName: true
    });

    return LoginLogs;
};