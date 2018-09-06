
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('transaction_id').primary();
        table.date('transaction_date').notNullable();
        
        table.integer('transaction_account_id').unsigned();
        table.foreign('transaction_account_id', 'fk_transaction_acct')
            .references('accounts.account_id');

        table.integer('transaction_created_by_user_id').unsigned();
        table.foreign('transaction_created_by_user_id', 'fk_transaction_user')
            .references('users.user_id');

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('transactions');
};
