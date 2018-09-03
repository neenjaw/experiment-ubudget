module.exports = function(sequelize, DataTypes) {
    return sequelize.define('budget_owners', {
        budget_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'budgets',
                key: 'budget_id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        added_by_user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'budget_owners'
    });
};
