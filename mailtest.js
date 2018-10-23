require('dotenv').config();


var DOMAIN = 'mg.neenjaw.com';
var mailgun = require('mailgun-js')({apiKey: process.env.MG_API_KEY, domain: DOMAIN});

var data = {
    from: 'Excited User <me@mg.neenjaw.com>',
    to: 'ubudget_user01@neenjaw.com, tim@neenjaw.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});