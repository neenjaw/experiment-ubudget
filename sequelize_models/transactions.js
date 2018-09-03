module.exports = function(sequelize, DataTypes) {
    return sequelize.define('transactions', {
        transaction_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'transaction_types',
                key: 'transaction_type_id'
            }
        },
        transaction_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        transaction_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        transaction_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        account_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'account_id'
            }
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
        },
        updated_by_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'transactions',
        createdAt: 'created',
        updatedAt: 'updated'
    });
};
