let nodemailer = require('nodemailer');
let twilio = require('twilio');

let twilioAccountSid = '';
let twilioAuthToken = '';
let twilioNumber = '';

let environment = {

    app_name: process.env.NODE_ENV === 'production' ? 'Management' : 'Management',

    api_url: 'http://localhost:4584/',
    web_url: 'http://localhost:4585/',
    db_url: process.env.NODE_ENV === 'production' ? 'mongodb://localhost:27017/testdb' : 'mongodb://localhost:27017/testdb',
    nodemailer: {
        transporter: nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: '', // SMTP username
                pass: '' // SMTP password
            }
        }),
        from: ''
    },
    twilio: {
        client: new twilio(twilioAccountSid, twilioAuthToken),
        from: twilioNumber
    }

};

module.exports = environment;
