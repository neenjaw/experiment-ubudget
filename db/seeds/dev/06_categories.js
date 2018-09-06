const categoryData = [
    {
        master_category_name: 'General',
        category_name: 'Groceries',
        category_description: 'Food spending',
        category_order: 1
    },
    {
        master_category_name: 'Monthly Expenses',
        category_name: 'Utilities',
        category_description: 'Electricity, Hydro, Water, Etc..',
        category_order: 1
    },
    {
        master_category_name: 'Monthly Expenses',
        category_name: 'Rental Insurance',
        category_description: 'In case something happens',
        category_order: 2
    },
    {
        master_category_name: 'Savings Goals',
        category_name: 'Vehicle Replacement',
        category_description: 'Savin\' up for that Camero',
        category_order: 1
    }
];


exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('categories').del()
        .then(function () {

            return knex
                .from('master_categories')
                .select('master_category_id', 'master_category_name')
                .then(records => {
                    /*
                    const categoryPromises = [];
        
                    for (let recordIndex = 0; recordIndex < records.length; recordIndex++) {
                        const record = records[recordIndex];
                        
                        for (let categoryIndex = 0; categoryIndex < categoryData.length; categoryIndex++) {
                            const category = categoryData[categoryIndex];
                            
                            if (record.master_category_name === category.master_category_name) {
                                const newCategoryRecord = {
                                    category_name: category.category_name,
                                    category_description: category.category_description,
                                    master_category_id: record.master_category_id,
                                    category_order: category.category_order
                                };

                                categoryPromises.push(knex('categories').insert(newCategoryRecord));
                            }
                        }
                    }

                    return Promise.all(categoryPromises);
                    */

                    return Promise.all(records.reduce(function (accumulatedPromises, currentRecord) {
                        return accumulatedPromises.concat(categoryData.reduce(function(accumulatedPromises, currentCategory) {
                            if (currentRecord.master_category_name === currentCategory.master_category_name) {
                                const newCategoryRecord = {
                                    category_name: currentCategory.category_name,
                                    category_description: currentCategory.category_description,
                                    master_category_id: currentRecord.master_category_id,
                                    category_order: currentCategory.category_order
                                };

                                accumulatedPromises.push(knex('categories').insert(newCategoryRecord));
                            }

                            return accumulatedPromises;
                        },[]));
                    },[]));
                });
        });
};

const createCategory = (knex, category, masterCategoryName) => {

};