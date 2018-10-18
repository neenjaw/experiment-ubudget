const Uas = require('./server/models/user-authorization-state');

Uas.forge()
    .query({where: {user_authorization_state_title: 'user'}})
    .fetch()
    .then(result => {
        if (!result) return undefined;
        
        return result.get('user_authorization_state_id');
    })
    .then(id => console.log(id));

Uas.getDefaultAuthorizationState()
    .then(id => console.log(id));