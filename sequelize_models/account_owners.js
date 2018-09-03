module.exports = function(sequelize, DataTypes) {
    return sequelize.define('account_owners', {
        account_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'accounts',
                key: 'account_id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        added_by_user_id: {
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
        tableName: 'account_owners',
        createdAt: 'created',
        updatedAt: false
    });
};
