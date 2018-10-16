# Database Design

## MariaDB

MariaDB has been chosen for this project at this time.  This is because of a few reasons:

1. It was the instance we had running
2. Well documented in stackexchange, etc for learning
3. Compatability with knex.js

I have made a few changes from the schema defaults.  `utf8mb4` was selected as it is actually the utf8 standard as opposed to the `utf8` character set encoding which is a proprietary non-conforming standard.

## Knex.js

Knex.js has been used as an SQL Builder and migration manager to be able to build, taken down, and rebuild the database reliably.  At this point, it is not being used as the base for an ORM but it is compatible with bookshelf.js (and others) if that becomes a future design decision.

### Migrations

after configuring `knexfile.js` to the installation enviroment specifications, run from the commandline `knex migrate:latest` to bring the database up to the latest schema.

I have also been using a supplementary knex library `knex-migrate` for more granularity in the migration process.  It allows to migrate up or down a single time or all the way to the start.

### Seeds

A series of dummy data, which first cleans the database of old data, then sequentially inserts data to the tables keeping in mind foreign key restrictions.

## SQL scripts

A few sql scripts have been maintained in order to standardize the creation of the database and the stock user.  Please change the passwords specified if reproducing for your own use.

### createdb.sql

This is the database schema create command, creating a collection with the utf8mb4 character set encoding with related collation.

### droptables.sql

**DANGER** This will drop all tables, triggers, and procedures.

