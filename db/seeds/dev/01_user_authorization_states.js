
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_authorization_states').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_authorization_states').insert([
                {user_authorization_state_id: 1, user_authorization_state_title: 'root'},
                {user_authorization_state_id: 2, user_authorization_state_title: 'admin'},
                {user_authorization_state_id: 3, user_authorization_state_title: 'user'},
            ]);
        });
};
