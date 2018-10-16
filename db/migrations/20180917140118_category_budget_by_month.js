const tableName = 'monthly_category_budgets';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(tableName, (table) => {
        table.primary(['category_id', 'year_month']);

        table.integer('category_id').unsigned()
            .references('categories.category_id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.date('year_month')
            .notNullable();
            
        table.decimal('budget_amount', 12, 2)
            .notNullable();

        table.string('comment')
            .notNullable()
            .defaultTo('');

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
