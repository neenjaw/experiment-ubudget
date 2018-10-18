
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('transactions').del()
        .then(function () {
            // Inserts seed entries
            return knex('transactions')
                .insert([
                    {
                        transaction_id: 1, 
                        transaction_date: '2018-01-01',
                        transaction_account_id: 1,
                        transaction_created_by_user: 'tim'
                    },
                    {
                        transaction_id: 2, 
                        transaction_date: '2018-01-02',
                        transaction_account_id: 3,
                        transaction_created_by_user: 'dan'
                    }
                ])
                .then(function() {
                    return knex('transfers').insert([
                        {
                            transaction_id: 1,
                            from_account_id: 1,
                            to_account_id: 2,
                            transfer_amount: 60.25,
                            comment: 'An example transfer'
                        }
                    ]);
                })
                .then(function() {
                    return knex('receipts').insert([
                        {
                            transaction_id: 2,
                            payee_id: 3
                        }
                    ]);
                })
                .then(function() {
                    return knex
                        .select(['category_id'])
                        .from('categories')
                        .innerJoin('master_categories', 'categories.master_category_id', 'master_categories.master_category_id')
                        .where('master_categories.master_category_id', '=', 2)
                        .then(records => {
                            const inserts = [
                                {
                                    line_amount: 6.00,
                                    comment: '$6 category line'
                                },
                                {
                                    line_amount: 12.00,
                                    comment: '$12 category line'
                                },
                            ];

                            return knex('receipt_items')
                                .insert(inserts.map((item, idx) => {
                                    item.transaction_id = 2;
                                    item.category_id = records[idx].category_id;

                                    return item;
                                }));
                        });
                });
        });
};
