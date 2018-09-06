
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function(table) {
        table.increments('category_id').primary();

        table.string('category_name').notNullable();
        table.string('category_description');

        table.integer('master_category_id').notNullable().unsigned();
        table.foreign('master_category_id')
            .references('master_categories.master_category_id');

        table.integer('category_order').unsigned();

        table.unique(['master_category_id', 'category_order']);

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories');
};
