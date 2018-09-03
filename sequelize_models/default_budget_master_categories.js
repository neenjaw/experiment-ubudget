module.exports = function(sequelize, DataTypes) {
    return sequelize.define('default_budget_master_categories', {
        master_category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true
        },
        master_category_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'default_budget_master_categories'
    });
};
