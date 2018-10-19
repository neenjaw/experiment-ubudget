exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user_authorization_roles', function(table) {
            // table.increments('user_authorization_state_id').primary();
            table.string('role_name').primary().notNullable();
    
            table.timestamps(true, true);
        }),
    
        knex.schema.createTable('users', function(table) {
            table.string('user_name').notNullable().primary();
            table.string('user_first_name').notNullable();
            table.string('user_last_name').notNullable();
            table.string('user_authorization_role').notNullable();
            table.foreign('user_authorization_role')
                .references('user_authorization_roles.role_name')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
    
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('user_authorization_roles')
    ]);
};
