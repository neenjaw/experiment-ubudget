const periods = [
    {
        from: '2018-09-01',
        to: '2018-09-30',
        amount: 10
    },
    {
        from: '2018-10-01',
        to: '2018-10-31',
        amount: 20
    }
];

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('category_budgets').del()
        .then(function () {
            return knex.select('category_id')
                .table('categories')
                .then(category_records => {
                    const dataForInsert = [];

                    periods.forEach((period, idx) => {
                        category_records.forEach(record => {
                            dataForInsert.push({
                                date_from: period.from,
                                date_to: period.to,
                                category_id: record.category_id,
                                budget_amount: period.amount
                            });
                        });
                    });

                    // Inserts seed entries
                    return knex('category_budgets').insert(dataForInsert);
                });
        });
};
