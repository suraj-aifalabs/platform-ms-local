module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        schema: "public",
        tableName: "users",
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },);
    return User;
};