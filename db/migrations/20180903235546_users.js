exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('user_authorization_states', function(table) {
            table.increments('user_authorization_state_id').primary();
            table.string('user_authorization_state_title').notNullable();
    
            table.timestamps(true, true);
        }),
    
        knex.schema.createTable('users', function(table) {
            table.increments('user_id').primary();
            table.string('user_name').notNullable();
            table.string('user_first_name').notNullable();
            table.string('user_last_name').notNullable();
            table.integer('user_authorization_state_id').notNullable().unsigned();
            table.foreign('user_authorization_state_id')
                .references('user_authorization_states.user_authorization_state_id')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
    
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('user_authorization_states')
    ]);
};
