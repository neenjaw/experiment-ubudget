/* jshint ignore:start */

exports.up = async function(knex, Promise) {
    await knex.schema.table('users', function(table) {
        table.boolean('user_is_active').notNullable().defaultTo(false);
    });
    await knex('users').where('user_authorization_role', '=', 'admin')
        .orWhere('user_authorization_role', '=', 'system')
        .update({
            user_is_active: true
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('user_is_active');
    });
};
