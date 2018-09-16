
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transfers', (table) => {
        table.integer('transaction_id').unsigned().primary()
            .references('transactions.transaction_id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('transfers');
};
