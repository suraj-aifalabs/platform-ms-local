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
            allowNull: true,
            defaultValue: ""
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        bid: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
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