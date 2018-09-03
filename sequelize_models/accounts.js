module.exports = function(sequelize, DataTypes) {
    return sequelize.define('accounts', {
        account_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        account_name: {
            type: DataTypes.STRING(50),
            allowNull: false
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
        tableName: 'accounts',
        createdAt: 'created',
        updatedAt: false
    });
};
