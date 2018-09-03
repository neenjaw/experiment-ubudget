module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        created_by_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp')
        }
    }, {
        tableName: 'users',
        createdAt: 'created',
        updatedAt: false
    });
};
