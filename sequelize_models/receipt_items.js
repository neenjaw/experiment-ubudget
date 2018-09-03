module.exports = function(sequelize, DataTypes) {
    return sequelize.define('receipt_items', {
        receipt_item_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        receipt_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'receipts',
                key: 'receipt_id'
            }
        },
        receipt_item_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        receipt_item_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'budget_categories',
                key: 'category_id'
            }
        }
    }, {
        tableName: 'receipt_items',
        timestamps: false
    });
};
