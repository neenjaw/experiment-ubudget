/**
 * 
 * Account backend
 * 
 */

const bookshelf = require('./bookshelf');
const User = require('./models/user');

new User()
    .fetchAll()
    .then(user => {
        console.log(user.toJSON());
    })
    .catch(err => {
        console.log(err);
    });