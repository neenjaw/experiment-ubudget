exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_authorization_roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_authorization_roles').insert([
                {role_name: 'root'},
                {role_name: 'admin'},
                {role_name: 'user'},
            ]);
        });
};
