# Database Design

## MariaDB

MariaDB has been chosen for this project at this time.  This is because of a few reasons:

1. It was the instance we had running
2. Well documented in stackexchange, etc for learning
3. Compatability with knex.js

I have made a few changes from the schema defaults.  `utf8mb4` was selected as it is actually the utf8 standard as opposed to the `utf8` character set encoding which is a proprietary non-conforming standard.

## Knex.js

Knex.js has been used as an SQL Builder and migration manager to be able to build, taken down, and rebuild the database reliably.  At this point, it is not being used as the base for an ORM but it is compatible with bookshelf.js (and others) if that becomes a future design decision.

## Ideas to try

### Bookshelf.js

This is an ORM library which uses knex.js as a database abstraction layer and can then create models based on existing database tables.

## Tried ideas

### Sequelize.js

At first, thought about using an ORM like squelize for this project, but wanted something that allowed more separation between the database design and the backend.

I really like the idea of the database migration idea because as this concept develops, knex will allow a formal way for the database to evolve and manipulate the data to new forms.

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

## Database Data Design

### Users

Purpose: a table representing user accounts.

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Budgets

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Master Categories

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Categories

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Category Budgets

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Accounts

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Transactions

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Transfers

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Receipts

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |

### Receipt Items

Purpose: ex

- **table name:** users
- **relationships:** ex

| column name | column type | properties |
|-------------|-------------|------------|
| user_id | unsigned int | autoincrement, not null, primary key |