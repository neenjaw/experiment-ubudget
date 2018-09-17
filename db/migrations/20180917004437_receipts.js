const tableName = 'receipts';

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable(tableName, (table) => {
            table.integer('transaction_id').unsigned().primary()
                .references('transactions.transaction_id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.integer('payee_id').unsigned()    
                .references('payees.payee_id')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT'); 
                
            table.decimal('receipt_amount', 12, 2)
                .defaultTo(0)
                .notNullable();

            table.string('comment')
                .defaultTo('');

            table.timestamps(true, true);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
