module.exports = function(sequelize, DataTypes) {
    return sequelize.define('budget_master_categories', {
        master_category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        master_category_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        budget_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'budgets',
                key: 'budget_id'
            }
        },
        order: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'budget_master_categories'
    });
};
