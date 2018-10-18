
// TODO: ADD fields:
// -user_email
// -user_password

exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('user_email').notNullable();
        table.unique('user_email');
        table.string('user_password').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('user_email');
        table.dropColumn('user_password');
    });
};
