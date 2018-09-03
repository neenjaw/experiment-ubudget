module.exports = function(sequelize, DataTypes) {
    return sequelize.define('default_budget_categories', {
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        master_category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'default_budget_master_categories',
                key: 'master_category_id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'default_budget_categories'
    });
};
