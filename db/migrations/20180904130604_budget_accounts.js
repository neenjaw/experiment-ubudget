
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('budgets', function(table) {
            table.increments('budget_id').primary();

            table.string('budget_description');

            table.integer('budget_owner_user_id').notNullable().unsigned();
            table.foreign('budget_owner_user_id')
                .references('users.user_id');

            table.timestamps(true, true);
        }),
    
        knex.schema.createTable('budget_authorized_users', function(table) {
            table.primary(['budget_id', 'user_id']);

            table.integer('budget_id').notNullable().unsigned();
            table.foreign('budget_id')
                .references('budgets.budget_id');

            table.integer('user_id').notNullable().unsigned();
            table.foreign('user_id')
                .references('users.user_id');

            table.integer('user_added_by_user_id').notNullable().unsigned();
            table.foreign('user_added_by_user_id')
                .references('users.user_id');

            table.timestamps(true, true);
        }),

        knex.schema.createTable('accounts', function(table) {
            table.increments('account_id').primary();
            
            table.string('account_description');

            table.integer('account_budget_id').notNullable().unsigned();
            table.foreign('account_budget_id')
                .references('budgets.budget_id');
    
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('accounts'),
        knex.schema.dropTable('budget_authorized_users'),
        knex.schema.dropTable('budgets')
    ]);
};
