/* eslint-env node, mocha */

var bcrypt = require('bcryptjs');

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;  
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

const { UserAuthorizationRole, User } = require('../server/models/schema');

describe('User Route', function() {  
    describe('#empty, create "Jack Ryan", test', function() {  
        before(function() {
            return knex.migrate.rollback()
                .then(function() {
                    return knex.migrate.latest()
                        .then(function() {
                            return UserAuthorizationRole.query()
                                .insert({ role_name: 'user' });
                        });
                });
        });

        it('should not have any models', function(done) {
            User.query()
                .then(result => {
                    expect(result.length).to.equal(0);
                    done();
                });
        });

        it('should save a model to the database', function (done) {
            User.query()
                .insert({ 
                    user_name:'jackryan',
                    user_email:'jack@cia.gov',
                    user_first_name:'Jack',
                    user_last_name:'Ryan',
                    user_password:'password',
                    user_authorization_role:'user'
                })
                .then(() => {
                    User.query()
                        .then(result => {
                            expect(result.length).to.equal(1);
                            done();
                        });
                });
        });


        it('should return an instance of User', function(done) {
            User.query()
                .then(result => {
                    expect(result[0] instanceof User).to.equal(true);
                    done();
                });
        });

        it('the user_name field should be "jackryan"', function(done) {
            User.query()
                .then(result => {
                    expect(result[0].user_name).to.equal('jackryan');
                    done();
                });
        });

        it('`${row.user_first_name} ${row.user_last_name}`should be "Jack Ryan"', function(done) {
            User.query()
                .then(result => {
                    const row = result[0];

                    expect(`${row.user_first_name} ${row.user_last_name}`).to.equal('Jack Ryan');
                    done();
                });
        });

        it('the user_email field should be "jack@cia.gov"', function(done) {
            User.query()
                .then(result => {
                    expect(result[0].user_email).to.equal('jack@cia.gov');
                    done();
                });
        });

        it('"password" hashed with bcrypt should match the stored hashed password', function(done) {
            User.query()
                .then(result => {
                    expect(bcrypt.compareSync('password', result[0].user_password)).to.equal(true);
                    done();
                });
        });

        it('"objection-password" should be able to verify with prototypal method', function(done) {
            const password = 'password';
            
            User.query().first().where({ user_email: 'jack@cia.gov'})
                .then(user => {
                    user.verifyPassword(password)
                        .then(result => {
                            expect(result).to.equal(true);
                            done();
                        });
                });
        });

        after(function () {
            return knex.migrate.rollback();
        });
    });
});
