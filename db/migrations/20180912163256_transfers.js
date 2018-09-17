const tableName = 'transfers';

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable(tableName, (table) => {
            table.integer('transaction_id').unsigned().primary()
                .references('transactions.transaction_id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.integer('from_account_id').unsigned()        
                .references('accounts.account_id')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');

            table.integer('to_account_id').unsigned()       
                .references('accounts.account_id')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');      

            table.decimal('amount', 12, 2).notNullable();

            table.string('comment')
                .defaultTo('');

            table.timestamps(true, true);
        })
        .raw(`ALTER TABLE ${tableName} 
                ADD CONSTRAINT different_accounts 
                    CHECK (from_account_id <> to_account_id)`);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable(tableName);
};
