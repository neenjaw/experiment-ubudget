const payeeData = [
    '7-11',
    'Petrocanada',
    'Walmart',
    'Superstore',
    'Bestbuy',
    'City of Saskatoon',
    'Telus'
];

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('payees').del()
        .then(function () {
            return Promise.all(payeeData.map(payee => {
                return knex('payees').insert({payee_name: payee}); 
            }));
        });
};
