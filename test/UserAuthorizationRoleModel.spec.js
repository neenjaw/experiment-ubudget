/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;  
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

const { UserAuthorizationRole } = require('../server/models/schema');

describe('UserAuthorizationRole Route', function() {  
    describe('#empty, create', function() {  
        before(function() {
            return knex.migrate.rollback()
                .then(function() {
                    return knex.migrate.latest();
                });
        });

        it('should not have any models', function(done) {
            UserAuthorizationRole.query()
                .then(result => {
                    expect(result.length).to.equal(0);
                    done();
                });
        });

        it('should save a model to the database', function (done) {
            UserAuthorizationRole.query()
                .insert({ role_name: 'user' })
                .then(() => {
                    UserAuthorizationRole.query()
                        .then(result => {
                            expect(result.length).to.equal(1);
                            done();
                        });
                });
        });


        it('should return an instance of UserAuthorizationRole', function(done) {
            UserAuthorizationRole.query()
                .then(result => {
                    expect(result[0] instanceof UserAuthorizationRole).to.equal(true);
                    done();
                });
        });

        it('the role_name field should be "user"', function(done) {
            UserAuthorizationRole.query()
                .then(result => {
                    expect(result[0].role_name).to.equal('user');
                    done();
                });
        });

        after(function () {
            return knex.migrate.rollback();
        });
    });
});
