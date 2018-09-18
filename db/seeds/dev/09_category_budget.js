const dates = ['2018-09-00', '2018-10-00'];
const budget_amounts = [10, 20];

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('monthly_category_budgets').del()
        .then(function () {
            return knex.select('category_id')
                .table('categories')
                .then(category_ids => {

                    // Inserts seed entries
                    return knex('table_name').insert([
                        {id: 1, colName: 'rowValue1'},
                        {id: 2, colName: 'rowValue2'},
                        {id: 3, colName: 'rowValue3'}
                    ]);
                });
        });
};
