exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    user_id: 1, 
                    user_name: 'system',
                    user_first_name: 'system',
                    user_last_name: 'system',
                    user_authorization_state_id: 1
                },
                {
                    user_id: 2, 
                    user_name: 'tim',
                    user_first_name: 'Tim',
                    user_last_name: 'Austin',
                    user_authorization_state_id: 2
                },
                {
                    user_id: 3, 
                    user_name: 'dan',
                    user_first_name: 'Test',
                    user_last_name: 'User',
                    user_authorization_state_id: 3
                },
            ]);
        });
};