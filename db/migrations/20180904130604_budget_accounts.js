
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('budgets', function(table) {
            table.increments('budget_id').primary();

            table.string('budget_description');

            table.string('budget_owner_user').notNullable();
            table.foreign('budget_owner_user')
                .references('users.user_name')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.timestamps(true, true);
        }),
    
        knex.schema.createTable('budget_authorized_users', function(table) {
            table.primary(['budget_id', 'user_name']);

            table.integer('budget_id').notNullable().unsigned();
            table.foreign('budget_id')
                .references('budgets.budget_id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.string('user_name').notNullable();
            table.foreign('user_name')
                .references('users.user_name')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            table.string('user_added_by_user');
            table.foreign('user_added_by_user')
                .references('users.user_name')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');

            table.timestamps(true, true);
        }),

        knex.schema.createTable('accounts', function(table) {
            table.increments('account_id').primary();
            
            table.string('account_description');

            table.integer('account_budget_id').notNullable().unsigned();
            table.foreign('account_budget_id')
                .references('budgets.budget_id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
    
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
