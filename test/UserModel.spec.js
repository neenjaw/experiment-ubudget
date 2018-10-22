/* eslint-env node, mocha */

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret';

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
                    return user.verifyPassword(password)
                        .then(result => {
                            expect(result).to.equal(true);
                            done();
                        });
                });
        });

        it('should return a null token when the password supplied to login() is wrong', function(done) {
            const email = 'jack@cia.gov';
            const password = 'wrong_password';

            User.query().first().where({ user_email: email })
                .then(user => {
                    return user.login(password)
                        .then(result => {
                            expect(result.token).to.equal(null);
                            done();
                        });
                });
        });

        it('should return a valid token when the password supplied to login() is correct', function(done) {
            const email = 'jack@cia.gov';
            const password = 'password';

            User.query().first().where({ user_email: email })
                .then(user => {
                    return user.login(password)
                        .then(result => {
                            expect(result.token).to.not.equal(null);
                            done();
                        });
                });
        });

        it('should return a token with the userName, authorized flag, authorizedRole as the payload', function(done) {
            const email = 'jack@cia.gov';
            const password = 'password';
            
            User.query().first().where({ user_email: email })
                .then(user => {
                    return user.login(password)
                        .then(result => {
                            const token = result.token;

                            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                                expect(err).to.not.be.ok; // jshint ignore:line

                                expect(decoded.id).to.equal('jackryan');
                                expect(decoded.authorized).to.equal(true);
                                expect(decoded.authorizedRole).to.equal('user');
                        
                                done();
                            });
                        });
                });
        });

        after(function () {
            return knex.migrate.rollback();
        });
    });
});
