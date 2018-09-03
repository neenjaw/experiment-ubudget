module.exports = function(sequelize, DataTypes) {
    return sequelize.define('budgets', {
        budget_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        budget_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        created_by_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp')
        },
        updated_by_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'budgets',
        createdAt: 'created',
        updatedAt: 'updated'
    });
};
