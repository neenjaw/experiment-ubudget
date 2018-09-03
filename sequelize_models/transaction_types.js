module.exports = function(sequelize, DataTypes) {
    return sequelize.define('transaction_types', {
        transaction_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_type_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        transaction_type_table_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'transaction_types',
        timestamps: false
    });
};
