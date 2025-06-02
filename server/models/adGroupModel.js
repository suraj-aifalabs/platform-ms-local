module.exports = (sequelize, DataTypes) => {
    const AdGroups = sequelize.define("ad_groups", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        permissionList: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: true,
        }

    }, {
        schema: "public",
        tableName: "ad_groups",
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    },);
    return AdGroups;
};