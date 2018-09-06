
exports.up = function(knex, Promise) {
    return knex.schema.createTable('payees', (table) => {
        table.increments('payee_id').primary();
        table.string('payee_name').notNullable();

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('payees');
};
