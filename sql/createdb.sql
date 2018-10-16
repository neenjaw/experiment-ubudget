CREATE DATABASE ubudget DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;

-- prevent user privileges for outside machine access
-- GRANT ALL PRIVILEGES ON ubudget.* to ubuser@'%' IDENTIFIED BY 'ubuser';
GRANT ALL PRIVILEGES ON ubudget.* to ubuser@'localhost' IDENTIFIED BY 'ubuser';