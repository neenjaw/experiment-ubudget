module.exports = function(sequelize, DataTypes) {
    return sequelize.define('budget_categories', {
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        category_description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        master_category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'budget_master_categories',
                key: 'master_category_id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'budget_categories'
    });
};
