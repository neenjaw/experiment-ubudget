const bcrypt = require('bcryptjs');

const Knex = require('knex');
const connection = require('../../knexfile')[process.env.NODE_ENV];
const knexConnection = Knex(connection);


const { Model } = require('objection');

Model.knex(knexConnection);

class UserAuthorizationRole extends Model {
    static get tableName () {
        return 'user_authorization_roles';
    }

    static get relationMappings () {
        return {
            user: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'user_authorization_roles.role_name',
                    to: 'users.user_authorization_role'
                }
            }
        };
    }
}

class User extends Model {
    static get tableName () {
        return 'users';
    }

    static relationMappings () {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserAuthorizationRole,
                join: {
                    from: 'users.users_authorization_role',
                    to: 'user_authorization_role.role_name'
                }
            }
        };
    }
}

module.exports = { UserAuthorizationRole, User };