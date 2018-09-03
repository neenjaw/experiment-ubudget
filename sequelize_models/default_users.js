module.exports = function(sequelize, DataTypes) {
    return sequelize.define('default_users', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false,
        tableName: 'default_users'
    });
};
