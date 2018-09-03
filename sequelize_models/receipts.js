module.exports = function(sequelize, DataTypes) {
    return sequelize.define('receipts', {
        receipt_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'transactions',
                key: 'transaction_id'
            }
        },
        payee_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'payees',
                key: 'payee_id'
            }
        }
    }, {
        tableName: 'receipts',
        timestamps: false
    });
};
