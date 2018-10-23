var mailgun = require('mailgun-js')({
    apiKey: process.env.MG_API_KEY, 
    domain: process.env.MG_MAILING_DOMAIN
});

// var data = {
//     from: 'Tim from Neenjaw Business Intelligence <tim@mg.neenjaw.com>',
//     to: 'ubudget_user01@neenjaw.com',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
// };

module.exports = {
    mailDomain: mailgun.apiKey,
    sendMail: function(data) {
        if (!data || !data.from || !data.to || !data.subject || !data.text) return undefined;

        mailgun.messages().send(data, function(error, body) {
            if (error) {
                console.error(error);
                return { errors: [{ 
                    title: 'An error occurred.', 
                    description: 'Unable to send mail.'
                }]};
            }

            console.log({status: 'sent', body});
            return {
                data: {
                    messageId: body.id,
                    message: body.message
                }
            };
        });
    } 
};