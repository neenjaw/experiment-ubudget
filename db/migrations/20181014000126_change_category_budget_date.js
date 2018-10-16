
exports.up = function(knex, Promise) {
    return knex.schema.table('category_budgets', function (table) {
        table.renameColumn('year_month', 'date_from');
        table.date('date_to')
            .notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('category_budgets', function (table) {
        table.renameColumn('date_from', 'year_month');
        table.dropColumn('date_to');        
    });
};
