module.exports = function(sequelize, DataTypes) {
    return sequelize.define('payees', {
        payee_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        payee_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'payees',
        timestamps: false
    });
};
