module.exports = function (sequelize, DataTypes) {
    return sequelize.define('transfers', {
        transfer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        from_transaction_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'transactions',
                key: 'transaction_id'
            }
        },
        from_account_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'account_id'
            }
        },
        to_transaction_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'transactions',
                key: 'transaction_id'
            }
        },
        to_account_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'account_id'
            }
        }
    }, {
        tableName: 'transfers',
        timestamps: false
    });
};
