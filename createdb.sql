create database ubudget default character set utf8 default collate utf8_bin;

-- commented out user create for outside machine access
-- GRANT ALL PRIVILEGES ON ubudget.* to ubuser@'%' IDENTIFIED BY 'ubuser';
GRANT ALL PRIVILEGES ON ubudget.* to ubuser@'localhost' IDENTIFIED BY 'ubuser';