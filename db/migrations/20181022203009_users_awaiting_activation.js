/* jshint ignore:start */

exports.up = async function(knex, Promise) {
    await knex.schema.createTable('users_awaiting_activation', (table) => {
        table.string('user_name').primary()
            .references('users.user_name')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.string('user_activation_code').notNullable();

        table.timestamps(true, true);
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable('users_awaiting_activation');
};
