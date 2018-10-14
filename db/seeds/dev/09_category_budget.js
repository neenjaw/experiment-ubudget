const dates = ['2018-09-00', '2018-10-00'];
const budget_amounts = [10, 20];

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('category_budgets').del()
        .then(function () {
            return knex.select('category_id')
                .table('categories')
                .then(category_records => {
                    const dataForInsert = [];

                    dates.forEach((date, idx) => {
                        category_records.forEach(record => {
                            dataForInsert.push({
                                year_month: date,
                                category_id: record.category_id,
                                budget_amount: budget_amounts[idx]
                            });
                        });
                    });

                    // Inserts seed entries
                    return knex('category_budgets').insert(dataForInsert);
                });
        });
};
