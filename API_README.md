# uBudget API Documentation

## Authentication Model

uBudget at this time uses password hash verification (via bcryptjs) to check passwords.  When a password is verified as matching, a json web token [jwt] is signed with the current user's id, and their authorization role.  The jwt can then sent to the API in the request in the 'x-access-token' header.

### Authentication Routes

`/api/auth/register`    `POST`  Required Parameters

`/api/auth/login`       `POST`

`/api/auth/me`          `GET`

## API Routes

### User Authorization Roles

### Users

### Budgets

### Categories

### Accounts

### Transactions

### Payees