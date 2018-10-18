
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('transaction_id').primary();
        table.date('transaction_date').notNullable();
        
        table.integer('transaction_account_id').unsigned();
        table.foreign('transaction_account_id', 'fk_transaction_acct')
            .references('accounts.account_id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.string('transaction_created_by_user');
        table.foreign('transaction_created_by_user', 'fk_transaction_user')
            .references('users.user_name')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('transactions');
};
