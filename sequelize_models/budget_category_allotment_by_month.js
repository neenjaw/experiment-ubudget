module.exports = function(sequelize, DataTypes) {
    return sequelize.define('budget_category_allotment_by_month', {
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'budget_categories',
                key: 'category_id'
            }
        },
        month: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            primaryKey: true
        },
        allotted_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: '0.00'
        }
    }, {
        timestamps: false,
        tableName: 'budget_category_allotment_by_month'
    });
};
