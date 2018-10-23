const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateSafeId = require('generate-safe-id');

const Knex = require('knex');
const connection = require('../../knexfile')[process.env.NODE_ENV];
const knexConnection = Knex(connection);

const passwordOptions = {
    passwordField: 'user_password'
};

const Password = require('objection-password')(passwordOptions);
const { Model } = require('objection');

Model.knex(knexConnection);

class BaseModel extends Model {
    $beforeInsert() {
        // get timestamp in MariaDB Timestamp format
        // ex) YYYY-MM-DD HH:MM:SS
        const t = new Date().toISOString().split(/[T:Z.-]/);
        const timestamp = `${t[0]}-${t[1]}-${t[2]} ${t[3]}:${t[4]}:${t[5]}`;
        this.created_at = timestamp;
        this.updated_at = timestamp;
    }

    $beforeUpdate() {
        // get timestamp in MariaDB Timestamp format
        // ex) YYYY-MM-DD HH:MM:SS
        const t = new Date().toISOString().split(/[T:Z.-]/);
        const timestamp = `${t[0]}-${t[1]}-${t[2]} ${t[3]}:${t[4]}:${t[5]}`;
        this.updated_at = timestamp;
    }
}

class UserAuthorizationRole extends BaseModel {
    static get tableName () {
        return 'user_authorization_roles';
    }

    static get idColumn() {
        return 'role_name';
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

    static get jsonSchema () {
        return {
            type: 'object',
            required: ['role_name'],
    
            properties: {
                role_name: {
                    type: 'string', 
                    minLength: 1, 
                    maxLength: 255,
                },
            }
        };
    }
}

class UserActivation extends BaseModel {
    static get tableName () {
        return 'users_awaiting_activation';
    }

    static get idColumn() {
        return 'user_name';
    }

    static get relationMappings () {
        return {
            activation: {
                relation: Model.BelongsToOneRelation,
                modelClass: User, 
                join: {
                    from: 'users_awaiting_activation.user_name',
                    to: 'users.user_name'
                }
            }
        };
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: [
                'user_name',
                'user_activation_code'
            ],
            properties: {
                user_name: {
                    type: 'string'
                },
                user_activation_code: {
                    type: 'string'
                }
            }
        };
    }
}

class User extends Password(BaseModel) {
    static get tableName () {
        return 'users';
    }

    static get idColumn() {
        return 'user_name';
    }

    /* jshint ignore:start */
    async $afterInsert(queryContext) {
        await super.$afterInsert(queryContext);

        if (!this.user_is_active) {
            await UserActivation.query().insert({
                user_name: this.user_name,
                user_activation_code: generateSafeId()
            });   
        }
    }
    /* jshint ignore:end */

    static get relationMappings () {
        return {
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserAuthorizationRole,
                join: {
                    from: 'users.users_authorization_role',
                    to: 'user_authorization_roles.role_name'
                }
            },
            activation: {
                relation: Model.HasManyRelation,
                modelClass: UserActivation,
                join: {
                    from: 'users.user_name',
                    to: 'users_awaiting_activation.user_name'
                }
            }
        };
    }

    static get jsonSchema () {
        return {
            type: 'object',
            required: [
                'user_name', 
                'user_first_name', 
                'user_last_name',
                'user_authorization_role'
            ],
    
            properties: {
                user_name: {
                    type: 'string', 
                    minLength: 4, 
                    maxLength: 30,
                },
                user_first_nnme: {
                    type: 'string', 
                    minLength: 4, 
                    maxLength: 30,
                },
                user_last_name: {
                    type: 'string', 
                    minLength: 4, 
                    maxLength: 50,
                },
                user_authorization_role: {
                    type: 'string',
                    default: 'user'
                },
                user_is_active: {
                    type: 'boolean',
                    default: false
                }
            }
        };
    }

    isActive() {
        return this.user_is_active;
    }

    getToken() {
        const payload = { 
            id: this.user_name, 
            authorizedRole: this.user_authorization_role 
        };

        const options = {
            expiresIn: 60 * 60 * 24 * 7 //expires in 1 week
        };

        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }
}

class Budget extends BaseModel {
    static get tableName () {
        return 'budgets';
    }

    static get idColumn() {
        return 'budget_id';
    }
}

module.exports = { BaseModel, UserAuthorizationRole, User };