/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;  
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

const UserAuthState = require('../server/models/user-authorization-state');

describe('UserAuthState Route', function() {  
    describe('#empty, create', function() {  
        beforeEach(function() {
            return knex.migrate.rollback()
                .then(function() {
                    return knex.migrate.latest();
                });
        });
      
        after(function () {
            return knex.migrate.rollback();
        });

        it('should not have any models', function (done) {
            UserAuthState.forge().fetch().then(function(results){
                expect(results).to.equal(null);
                done();
            });
        });
      
        it('should save a model to the database', function (done) {
            var userAuthState = new UserAuthState({
                user_authorization_state_title: 'user',
            }).save()
                .then(function(){
                    return UserAuthState.where({user_authorization_state_title: 'user'}).fetch();
                })
                .then(function(userAuthState){
                    expect(userAuthState.get('user_authorization_state_title')).to.equal('user');
                    done();
                });
        });
    });
});

// UserAuthState.forge()
//     .query({where: {user_authorization_state_title: 'user'}})
//     .fetch()
//     .then(result => {
//         if (!result) return undefined;
        
//         return result.get('user_authorization_state_id');
//     })
//     .then(id => console.log(id));

// UserAuthState.getDefaultAuthorizationState()
//     .then(id => console.log(id));