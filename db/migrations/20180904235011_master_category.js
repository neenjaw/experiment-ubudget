
exports.up = function(knex, Promise) {
    return knex.schema.createTable('master_categories', function(table) {
        table.increments('master_category_id').primary();

        table.string('master_category_name').notNullable();
        table.string('master_category_description');

        table.integer('budget_id').notNullable().unsigned();
        table.foreign('budget_id')
            .references('budgets.budget_id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('master_category_order').unsigned();

        table.unique(['budget_id', 'master_category_order']);

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('master_categories');
};
