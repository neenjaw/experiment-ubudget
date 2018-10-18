const bookshelf = require('../bookshelf.js');

const UserAuthorizationState = bookshelf.Model.extend({
    tableName: 'user_authorization_states',
    
    hasTimestamps: true
},
{
    getDefaultAuthorizationState: function() {
        return this.forge()
            .query({where: {user_authorization_state_title: 'user'}})
            .fetch()
            .then(result => {
                if (!result) return undefined;
                
                return result.get('user_authorization_state_id');
            });
    }
});

module.exports = bookshelf.model('UserAuthorizationState', UserAuthorizationState);