module.exports = (sequelize, DataTypes) => {
    const UserSession = sequelize.define("user_sessions", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        schema: "public",
        tableName: "user_sessions",
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },);
    return UserSession;
};