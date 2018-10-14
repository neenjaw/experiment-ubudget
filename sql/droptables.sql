ALTER TABLE master_categories
    DROP FOREIGN KEY IF EXISTS master_categories_budget_id_foreign;

ALTER TABLE categories
    DROP FOREIGN KEY IF EXISTS categories_master_category_id_foreign;

DROP TABLE IF EXISTS category_budgets;
DROP TABLE IF EXISTS monthly_category_budgets;
DROP TABLE IF EXISTS receipt_items;
DROP TABLE IF EXISTS receipts;
DROP TABLE IF EXISTS payees;
DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS master_categories;
DROP TABLE IF EXISTS budget_authorized_users;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_authorization_states;
DROP TABLE IF EXISTS knex_migrations_lock;
DROP TABLE IF EXISTS knex_migrations;
