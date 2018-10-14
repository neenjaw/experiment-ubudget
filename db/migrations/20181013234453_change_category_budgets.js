const oldTableName = 'monthly_category_budgets';
const newTableName = 'category_budgets';

exports.up = function(knex, Promise) {
    return knex.schema.renameTable(oldTableName, newTableName);
};

exports.down = function(knex, Promise) {
    return knex.schema.renameTable(newTableName, oldTableName);
};
