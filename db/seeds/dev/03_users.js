const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    user_name: 'system',
                    user_email: 'system@ubudget.com',
                    user_password: bcrypt.hashSync('metsys', 8),
                    user_first_name: 'system',
                    user_last_name: 'system',
                    user_authorization_role: 'system',
                    user_is_active: true
                },
                {
                    user_name: 'tim',
                    user_email: 'tim@ubudget.com',
                    user_password: bcrypt.hashSync('password', 8),
                    user_first_name: 'Tim',
                    user_last_name: 'Austin',
                    user_authorization_role: 'admin',
                    user_is_active: true
                },
                {
                    user_name: 'dan',
                    user_email: 'dan@ubudget.com',
                    user_password: bcrypt.hashSync('nad', 8),
                    user_first_name: 'Test',
                    user_last_name: 'User',
                    user_authorization_role: 'user',
                    user_is_active: false
                },
            ]);
        });
};