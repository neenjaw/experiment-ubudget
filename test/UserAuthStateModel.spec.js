/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;  
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

const { UserAuthorizationRole, User } = require('../server/models/schema');

describe('UserAuthState Route', function() {  
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
                .then(userAuthRole => {
                    expect(userAuthRole instanceof UserAuthorizationRole).to.equal(true);
                    expect(userAuthRole.role_name).to.equal('user');

                    done();
                });
        });

        // For bookshelf
      
        // it('should save a model to the database', function (done) {
        //     const data = {
        //         role_name: 'user',
        //     };

        //     UserAuthRole.forge(data)
        //         .save()
        //         .then(function(){
        //             return UserAuthRole.where({role_name: 'user'}).fetch();
        //         })
        //         .then(function(userAuthRole){
        //             expect(userAuthRole.get('role_name')).to.equal('user');
        //             done();
        //         });
        // });

        // it('should not have admin role before it is created', function (done) {
        //     UserAuthRole.where({role_name: 'admin'}).fetch()
        //         .then(result => {
        //             expect(result).to.equal(null);
        //             done();
        //         });
        // });


        // it('should not have a default admin role before it is created', function (done) {
        //     UserAuthRole.getAdminRole()
        //         .then(result => {
        //             expect(result).to.equal(undefined);
        //             done();
        //         });
        // });

        after(function () {
            return knex.migrate.rollback();
        });
    });
});

// UserAuthRole.forge()
//     .query({where: {user_authorization_state_title: 'user'}})
//     .fetch()
//     .then(result => {
//         if (!result) return undefined;
        
//         return result.get('user_authorization_state_id');
//     })
//     .then(id => console.log(id));

// UserAuthRole.getDefaultAuthorizationState()
//     .then(id => console.log(id));