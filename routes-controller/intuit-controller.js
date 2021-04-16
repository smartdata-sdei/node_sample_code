let AuthToken = require('../models/AuthToken');

let socket_controller = require('./socket-controller');
let constant = require('../constants/constant');

let OAuthClient = require('intuit-oauth');
let oauthClient = new OAuthClient({
    clientId: constant.intuitCredentials.clientId,
    clientSecret: constant.intuitCredentials.clientSecret,
    environment: constant.intuitCredentials.environment,
    redirectUri: constant.intuitCredentials.redirectUri,
});

let QuickBooks = require('node-quickbooks');

exports.makeTokenInvalidAtAppStart = async ()=>{
    try {
        let getToken = await AuthToken.findOneAndUpdate({}, { $set: { isValid: false } }, { new: true });
        if(getToken){            
            // setTimeout(() => {
            //     socket_controller.sendDashboardDataForAdmin();
            // }, 20000);
            // console.log('Token is invalid now', getToken);
        }
        else{
            console.log('Error finding Quickbooks token from database to make token invalid');
        }
    } catch (err) {
        console.log('Server error updating AuthToken to invalid at app start', err);
    }
}

exports.updateCustomerQuickbooksList = async (data)=>{
    try {
        // console.log(data, '     user data in intuit-controller');
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = new QuickBooks(
                constant.intuitCredentials.clientId,
                constant.intuitCredentials.clientSecret,
                getToken.access_token,
                false, // no token secret for oAuth 2.0
                constant.intuitCredentials.companyId, // RealmId, ie company id
                true, // use the sandbox? - true for sandbox
                true, // enable debugging?
                null, // set minorversion, or null for the latest version
                '2.0', //oAuth version
                getToken.refresh_token
            );

            let customerData = {
                FullyQualifiedName: 'King Groceries',
                PrimaryEmailAddr: {
                  Address: 'jdrew@myemail.com'
                },
                DisplayName: 'Test user@12345',
                Suffix: 'Br',
                Title: 'Mrrr',
                MiddleName: '',
                Notes: 'Here are other details.',
                FamilyName: 'KingOoo',
                PrimaryPhone: {
                    FreeFormNumber: '(123) 456-7890'
                },
                CompanyName: 'King Groceries test',
                BillAddr: {
                    CountrySubDivisionCode: 'CA',
                    City: 'Mountain View test',
                    PostalCode: '44444',
                    Line1: '123@1122 Main Street',
                    Country: 'USA'
                }, 
                GivenName: 'James'
            };

            qbo.createCustomer(customerData, function(err, attachable){
                if(err){
                    console.log(err, '   err in createCustomer in intuit controller');
                }
                else{
                    console.log(attachable, '   attachable');
                    console.log(attachable.Id, '   attachable.Id');
                }
              });

        }
        else{
            console.log('Error finding Quickbooks token from database');
        }
    } catch (err) {
        console.log('Server error updateCustomerQuickbooksList in intuit_controller', err);
        
    }
}
