const generateSafeId = require('generate-safe-id');
const activation = {
    user_name: 'dan',
    user_activation_code: generateSafeId()
};

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users_awaiting_activation').del()
        .then(function () {
            return knex('users_awaiting_activation').insert(activation);
        });
};
