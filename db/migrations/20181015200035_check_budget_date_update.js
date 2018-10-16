const triggerName = 'check_category_budget_date_on_update';  
const budgetCategoriesTable = 'category_budgets';

exports.up = function(knex, Promise) {
    return knex.schema.raw(`
        CREATE OR REPLACE 
            DEFINER=CURRENT_USER
        TRIGGER 
            ${triggerName} 
        BEFORE UPDATE ON ${budgetCategoriesTable} FOR EACH ROW
        BEGIN
            IF NEW.date_from >= NEW.date_to THEN
                SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Cannot add or update row; date_from must be less than date_to';
            END IF;
        END;
    `);
};

exports.down = function(knex, Promise) {
    return knex.schema.raw(`DROP TRIGGER IF EXISTS ${triggerName}`);
};
