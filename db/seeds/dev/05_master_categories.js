const masterCategoriesData = [
    {
        master_category_name: 'General',
        master_category_description: 'General Expenses',
        master_category_order: 1
    },
    {
        master_category_name: 'Monthly Expenses',
        master_category_description: 'Monthly Expenses',
        master_category_order: 3
    },
    {
        master_category_name: 'Savings Goals',
        master_category_description: 'Goals for saving money',
        master_category_order: 2
    }
];

const budgetIdsToPopulate = [1,2];

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('master_categories').del()
        .then(function () {
            // Inserts seed entries
            const categoryPromises = [];
            
            budgetIdsToPopulate.forEach(budget => {
                masterCategoriesData.forEach((category) => {
                    const entry = {
                        master_category_name: category.master_category_name,
                        master_category_description: category.master_category_description,
                        master_category_order: category.master_category_order,
                        budget_id: budget
                    };
                    
                    categoryPromises.push(knex('master_categories').insert(entry));
                });
            });

            return Promise.all(categoryPromises);
        });
};
