const tableName = 'receipt_items';

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable(tableName, (table) => {
            table.increments('receipt_item_id').primary();         

            table.integer('transaction_id').unsigned().notNullable()
                .references('transactions.transaction_id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.integer('category_id').unsigned().notNullable()
                .references('categories.category_id')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');

            table.decimal('line_amount', 12, 2)
                .notNullable();

            table.string('comment')
                .notNullable()
                .defaultTo('');

            table.timestamps(true, true);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable(tableName);
};
