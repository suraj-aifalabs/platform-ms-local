module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        jnjUsername: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        familyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        givenName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        membersOf: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: []
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: []
        },
        sub: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        logged_in_at: {
            type: DataTypes.DATE,
            field: "logged_in_at"
        },
        logged_out_at: {
            type: DataTypes.DATE,
            field: "logged_out_at"
        },
        streetAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region: {
            type: DataTypes.STRING,
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
    });

    return User;
};