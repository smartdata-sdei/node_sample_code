let User = require('../models/User');
let WalletHistory = require('../models/WalletHistory');
let ParkingLot = require('../models/ParkingLot');
let PatrollerLogs = require('../models/PatrollerLogs');
let Transaction = require('../models/Transaction');
let ShortUrl = require('../models/ShortUrl');
let Wnine = require('../models/Wnine');
let Violation = require('../models/Violation');
let Tax = require('../models/Tax');
let Contact = require('../models/Contact');
let AuthToken = require('../models/AuthToken');

let crypto = require('crypto');

let mongoose = require('mongoose');
let request = require('request');
let path = require('path');
let moment = require('moment');
let bcrypt = require('bcrypt');

let constant = require('../constants/constant');
let environment = require('../environments/environment');
let emailService = require('../emailService/emailService');
let pdfService = require('../pdfService/pdfService');
let validate = require('../validate/validate');

let Cryptr = require('cryptr');
let cryptr = new Cryptr(constant.secretKeys.cryptrSecretKey);

let fetch = require('node-fetch');
let QRCode = require('qrcode');

let socket = require('../socket/socketEvents');
let socket_controller = require('./socket-controller');
let intuit_controller = require('./intuit-controller');
let mongo_backup_controller = require('./mongo_backup-controller');

let braintree = require('braintree');
let gateway = new braintree.BraintreeGateway({
    environment: constant.braintreeCredentials.environment,
    merchantId: constant.braintreeCredentials.merchantId,
    publicKey: constant.braintreeCredentials.publicKey,
    privateKey: constant.braintreeCredentials.privateKey
});

let aws = require('aws-sdk');
let s3 = new aws.S3({
    accessKeyId: constant.awsCredentials.accessKeys.accessKeyId,
    secretAccessKey: constant.awsCredentials.accessKeys.secretAccessKey
});

// let gateway = new braintree.BraintreeGateway({
//     environment: constant.braintreeCredentials.environment,
//     merchantId: process.env.merchantId,
//     publicKey: process.env.publicKey,
//     privateKey: process.env.privateKey
// });

let fs = require('fs');

let OAuthClient = require('intuit-oauth');
let oauthClient = new OAuthClient({
    clientId: constant.intuitCredentials.clientId,
    clientSecret: constant.intuitCredentials.clientSecret,
    environment: constant.intuitCredentials.environment,
    redirectUri: constant.intuitCredentials.redirectUri,
});
let QuickBooks = require('node-quickbooks');

const Nylas = require('nylas');
Nylas.config({
    clientId: '874142904662-gorp70mn1lenq2egs8574dqgprt9tpj8.apps.googleusercontent.com',
    clientSecret: 'BeJSmZjE9jViSBzNzEBSyLYM',
});
const nylas = Nylas.with('RaGwAuWygpSR8GWLiKIMLojQSmKZhF');
let conversion = require("phantom-html-to-pdf")();

let { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
let base64Img = require('base64-img');

const transactions_locations_update_controller = require('./transactions_locations_update-controller');

exports.test = async (req, res) => {
    try {

        // let updatedJson = {
        //     patrollerAssignedStatus: 'none',
        //     isPatrollerRequested: false,
        //     isPatrollerPending: false,
        //     isPatrollerActive: false,
        //     patroller: null,

        //     patrollerLogs: [],
        //     patrollerHistory: []
        // };

        // let updateOneLocation = await ParkingLot.updateMany({}, { $set: updatedJson }, { new: true });
        // console.log(updateOneLocation, '     updateOneLocation in test api');

        // mongo_backup_controller.autoBackupMongoDatabase();

        // intuit_controller.updateCustomerQuickbooksList({});

        // let result = await gateway.transaction.refund('m48716nd');
        // console.log(result,'       result');


        // let findTransaction = await gateway.transaction.find('1megzjzb');
        // console.log(findTransaction, '       findTransaction');


        // let result = await gateway.transaction.sale({
        //     amount: req.body.chargeAmount,
        //     paymentMethodNonce: nonce,
        //     // customerId: "", // For existing customer
        //     // customer: { // For new customer
        //     //     id: ""
        //     // },
        //     options: {
        //         storeInVaultOnSuccess: true,
        //         submitForSettlement: true
        //     }
        // });


        let getToken = await AuthToken.findOne({});
        if(getToken){

            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

            // console.log(qbo, '      qbo');

            // let vendorBillData = constant.function.createVendorBillInQuickBooks({}, {}, {}, {});

            // qbo.createBill(vendorBillData, function(err, attachable){
            //     if(err){
            //         console.log(err, '   err in createBill in test api');
            //     }
            //     else{
            //         console.log(attachable.Id, '   attachable.Id of createBill');
            //         // newAdmin.update({ $set: { attachableId: attachable.Id } }, (reject, resolve) => {
            //         //     if(resolve){
            //         //         return;
            //         //     }
            //         //     else{
            //         //         return;
            //         //     }
            //         // });
            //     }
            // });



            // let directTransactionData = constant.function.createSalesReceiptForParkingWithCreditCardPaymentInQuickBooks({}, {}, {});

            // qbo.createSalesReceipt(directTransactionData, function(err, attachable){
            //     if(err){
            //         console.log(err, '   err in createSalesReceipt in test api');
            //     }
            //     else{
            //         console.log(attachable.Id, '   attachable.Id of createSalesReceipt');
            //         // newAdmin.update({ $set: { attachableId: attachable.Id } }, (reject, resolve) => {
            //         //     if(resolve){
            //         //         return;
            //         //     }
            //         //     else{
            //         //         return;
            //         //     }
            //         // });
            //     }
            // });



            // let newParkingLot = { zone: 100011, state: 'New York' };
            // let locationData = constant.function.createLocationDataForQuickBooks(newParkingLot);

            // qbo.createClass(locationData, function(err, attachable){
            //     if(err){
            //         console.log(err, '   err in createClass in user controller test api');
            //     }
            //     else{
            //         console.log(attachable.Id, '   attachable.Id of create class test');
            //     }
            // });


            // qbo.createDepartment(locationData, function(err, attachable){
            //     if(err){
            //         console.log(err, '   err in createDepartment in user controller test');
            //     }
            //     else{
            //         console.log(attachable.Id, '   attachable.Id test');
            //     }
            // });



            // let newUser = {
            //     firstName: 'test',
            //     lastName: 'testTwo',
            //     email: 'test@test.com',
            //     userId: '11223',
            //     countryCode: '+1',
            //     mobileNumber: '1234567890',
            // };

            // let customerData = constant.function.createCustomerDataForQuickBooks(newUser);

            // let attachable = await qbo.createCustomer(customerData);
            // if(attachable){
            //     console.log(attachable, '   attachable');
            //     console.log(attachable.Id, '   attachable.Id');
            //     newUser.update({ $set: { attachableId: attachable.Id } }, (reject, resolve) => {
            //         if(resolve){
            //             return;
            //         }
            //         else{
            //             return;
            //         }
            //     });
            // }
            // else{
            //     console.log('Err in createCustomer in userSignUp');
            // }



            // qbo.getVendor('64', function(err, vendor){
            //     console.log(vendor, '    vendor 2233');

            //     console.log(err, '    err in vendor 2233');
            // });



            // qbo.updateCustomer({
            //     SyncToken: '0',
            //     Id: '59',
            //     sparse: true,
            //     PrimaryEmailAddr: {Address: 'customer2255@example.com'}
            // }, function(err, customer){
            //     if(err){
            //         console.log(err, '   err in update customer');
            //     }
            //     else{
            //         console.log(customer, '   update customer');
            //     }
            // });


            // qbo.findTerms({
            //     fetchAll: true
            //   }, function(e, terms){
            //     // console.log('Start---', terms, '    ---end customers');
            //     terms.QueryResponse.Term.forEach(element => {
            //         console.log(element, '    element term');
            //     });
            // });


            // qbo.findCustomers({
            //     fetchAll: true
            //   }, function(e, customers){
            //     console.log('Start---', customers, '    ---end customers');
            //     customers.QueryResponse.Customer.forEach(element => {
            //         console.log(element, '    element');
            //     });
            // });



            // qbo.findDepartments({ fetchAll: true }, function(e, departments){
            //     if(departments){
            //         // console.log('Start departments---', departments, '    ---end departments');
            //         // departments.QueryResponse.Department.forEach(element => {
            //         //     console.log(element, '    element department');
            //         // });
            //     }
            //     else{
            //         console.log(e, '     error finding departments');
            //     }
            // });


            // qbo.getVendor('109', function(err, vendor){
            //     if(vendor){
            //         console.log(vendor, '    result of getVendor');
            //     }
            //     else{
            //         console.log(err, '    err in getVendor');
            //     }
            // });


            // qbo.getVendor({ fetchAll: true }, function(err, vendors){
            //     if(vendors){
            //         console.log('Start vendors---', vendors, '    ---end vendors');
            //         // vendors.QueryResponse.Vendor.forEach(element => {
            //         //     console.log(element, '    element vendor');
            //         // });
            //     }
            //     else{
            //         console.log(err, '     error finding vendors');
            //     }
            // });


            // qbo.findPaymentMethods({ fetchAll: true }, function(e, paymentMethods){
            //     if(paymentMethods){
            //         // console.log('Start payment methods---', paymentMethods, '    ---end payment methods');
            //         paymentMethods.QueryResponse.PaymentMethod.forEach(element => {
            //             console.log(element, '    element payment method');
            //         });
            //     }
            //     else{
            //         console.log(e, '     error finding payment methods');
            //     }
            // });


            // qbo.findClasses({ fetchAll: true }, function(err, classes) {
            //     console.log(classes, '     classes');
            //     classes.QueryResponse.Class.forEach(element => {
            //         console.log(element, '     element class');
            //     });
            // });

            // qbo.findAccounts(function(_, accounts) {
            //     accounts.QueryResponse.Account.forEach(function(account){
            //         console.log(account, '     element account');
            //     })
            // });



            // qbo.findItems({ fetchAll: true }, function(e, items){
            //     if(items){
            //         // console.log('Start items---', items, '    ---end items');
            //         items.QueryResponse.Item.forEach(element => {
            //             console.log(element, '    element items');
            //         });
            //     }
            //     else{
            //         console.log(e, '     error finding items');
            //     }
            // });


        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

        // let dataToUpload = {
        //     email: 'test@yopmail.com',
        //     password: 'Qwerty@12345'
        // };
        // let filePath = path.join(__dirname, '../../mongo_backup/');
        // let filePath = '../../mongo_backup/';

        // console.log(fs.readdirSync(filePath,{encoding:'buffer'})[0], '    lllllllllllllll');

        // await s3.putObject({
        //     Bucket: constant.awsCredentials.s3.bucketName,
        //     Key: '.park_database-backup.zip',
        //     // Body: JSON.stringify(dataToUpload),
        //     // Body: fs.readFileSync(filePath),
        //     Body: fs.readdirSync(filePath,{encoding:'buffer'})[0],
        // }, function(err, data){
        //     if(data){
        //         console.log(data, '    res of s3 upload');
        //     }
        //     else{
        //         console.log(err, '    err in s3 upload');
        //     }
        //     // return res.send(dataToUpload);
        // });

        // let result = await gateway.plan.all();
        // console.log(result.plans, '     .plans in async');
        // gateway.plan.all(function(err, result){
        //     console.log(result.plans, '    plans result');
        // });

        // let subscribe = await gateway.subscription.create({ paymentMethodToken: "3k3cnq", planId: "psqr" });
        // if(subscribe){
        //     console.log(subscribe.subscription.transactions[0].id, '   result.transactions of auto-reload wallet test API in async await');
        // }
        // else{
        //     console.log('Error in auto-reload wallet test API in async await');
        // }


        // gateway.subscription.create({
        //     paymentMethodToken: "3k3cnq",
        //     planId: "psqr"
        //   }, function (err, result){
        //       if(result){
        //         // console.log(result, '    result of auto-reload wallet test API');
        //         console.log(result.subscription.transactions[0].id, '   result.transactions of auto-reload wallet test API');
        //       }
        //       else{
        //         console.log(err, '    err in auto-reload wallet test API');
        //       }
        // });


        // gateway.subscription.find("psqr", function (err, result){
        //     if(result){
        //         console.log(result, '   result of finding subscriptions');
        //     }
        //     else{
        //         console.log(err, '   error in finding subscriptions');
        //     }
        // });


        // gateway.customer.find("501414661", function(err, customer){
        //     console.log(customer.creditCards.length , '    braintree customer Credit cards length');
        //     // console.log(customer , '    braintree customer');
        // });

        // gateway.paymentMethod.delete("token", function (err,resp){
        //     if(resp){
        //         console.log(resp, '   resp of delete card');
        //     }
        //     else{
        //         console.log(err, '   err in delete card');
        //     }
        // });


        // gateway.paymentMethod.update("token", {
        //     options: {
        //       makeDefault: true
        //     }
        //   }, function (err, result){
        //       console.log(result, '    result of making card default in braintree');
        // });

        // environment.twilio.client.messages.create({
        //     body: 'Hi, welcome to parkingLot',
        //     to: '+917987942883',  // Text this number
        //     from: environment.twilio.from
        // })
        // .then((message) => console.log(message, '  response of message sent from twilio'));

        // console.log(socket.getSocket(), '    socket.id');
        // socket.getSocket().emit('getParkingLotDataById',{
        //     success: false,
        //     code: constant.httpCode.notFound,
        //     message: constant.message.dataNotFound,
        //     data: []
        // });

        // socket_controller.getParkingLot('5de9337d40def340478b91ad');

        // let parkingLot = await ParkingLot.updateMany( {}, { transactions: [] });
        // if(parkingLot){
        //     console.log(parkingLot, '   result');
        // }

        // let user = await User.updateMany( {}, { autoReloadPlanId: 'psqr', autoReloadAmount: '10.00' });
        // if(user){
        //     console.log(user, '   result');
        // }

        function encrypt(text){
            var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
            var crypted = cipher.update(text, 'utf8', 'hex');
            crypted += cipher.final('hex');
            return crypted;
        }

        function decrypt(text){
            var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
            var dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');
            return dec;
        }

        // var hw = encrypt("hello world");
        // var hw2 = encrypt("hello world");
        // let d = decrypt(hw);
        // let d2 = decrypt(hw2);

        // console.log(hw,1, d, 1, hw2, 2, d2,2);

        let localCurrentTime = moment().format();
        let localCurrentTimeInUtc = moment.utc().format();
        let timeZone = moment.parseZone(localCurrentTime);
        let testTime = "2020-01-16T04:00:00+05:30";
        let timeOnlyInUtc = moment.utc().format("HH:MM a");

        // this.refreshQuickBooksToken();

        // console.log(constant.function.formatMobileNumber('1234567890'), '    mobile number');

        // console.log(constant.function.generateSixDigitNumber(), '      generates 6-digit random number');

        // generateNumber();
        // var zoneNumber;
        // async function generateNumber(){
        //     zoneNumber = constant.function.generateSixDigitNumber();
        //     let findZone = await ParkingLot.findOne({ zone: zoneNumber });
        //     if(findZone){
        //         console.log('Fail');
        //         generateNumber();
        //     }
        //     else{
        //         doAnything();
        //     }
        // }

        // function doAnything(){
        //     console.log(zoneNumber, 'Success: Do anything');
        // }


        // function onlyUnique(value, index, self){
        //     return self.indexOf(value) === index;
        // }

        // let array = [9, 1, 2, 3, 4, 3, 1, 2, 1, 1];  //  [{9: 1}, {1: 4}, {2: 2}, {3: 2}, {4: 1}];
        // let unique = array.filter( onlyUnique );
        // console.log(unique, '     unique');
        // let result = [];
        // let count = 0;
        // for(let i=0; i<unique.length; i++){
        //     var test = unique[i];
        //     count = 0;
        //     for(let j=0; j<array.length; j++){
        //         if(test == array[j]){
        //             count = count+1;
        //         }
        //     }
        //     // let obj = {};
        //     // obj[`${test}`] = count;
        //     // result.push(obj);

        //     result.push({ location: test, count: count });
        // }

        // console.log(result, '     result of locations');

        // console.log(constant.function.chargeableMessageForQBO(1, 15, 10), '   kkk');

        let testNum = 0.5400000000000001;
        return res.status(200).json({
            success: true,
            code: 200,
            message: 'test api hit of  park',
            data: [],
            processEnvSecret: process.env.secret,
            // processEnvMerchantId: process.env.merchantId,
            localCurrentTime: localCurrentTime,
            localCurrentTimeInUtc: localCurrentTimeInUtc,
            timeOnlyInUtc: timeOnlyInUtc,
            // cTimeZone: timeZone,
            ip: req.connection.remoteAddress,
            dateParseNewDate: Date.parse(new Date()),
            modulusRoundUp: constant.function.getModulusRoundUp(testNum),
            modulusRoundDown: constant.function.getModulusRoundDown(testNum),
            shortId: constant.function.generateShortId()
        });

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findTerms = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findTerms({
                fetchAll: true
              }, function(e, terms){
                // console.log('Start---', terms, '    ---end customers');
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: 'res of findTerms',
                    data: terms
                });
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findDepartments = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findDepartments({ fetchAll: true }, function(e, departments){
                if(departments){
                    // console.log('Start departments---', departments, '    ---end departments');
                    return res.status(200).json({
                        success: true,
                        code: 200,
                        message: 'res of findDepartments',
                        data: departments
                    });
                }
                else{
                    console.log(e, '     error finding departments');
                }
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findPaymentMethods = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findPaymentMethods({ fetchAll: true }, function(e, paymentMethods){
                if(paymentMethods){
                    // console.log('Start payment methods---', paymentMethods, '    ---end payment methods');
                    return res.status(200).json({
                        success: true,
                        code: 200,
                        message: 'res of findPaymentMethods',
                        data: paymentMethods
                    });
                }
                else{
                    console.log(e, '     error finding payment methods');
                }
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findClasses = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findClasses({ fetchAll: true }, function(err, classes) {
                console.log(classes, '     classes');
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: 'res of findClasses',
                    data: classes
                });
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findAccounts = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findAccounts(function(_, accounts) {
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: 'res of findAccounts',
                    data: accounts
                });
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findItems = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findItems({ fetchAll: true }, function(e, items){
                if(items){
                    // console.log('Start items---', items, '    ---end items');
                    return res.status(200).json({
                        success: true,
                        code: 200,
                        message: 'res of findItems',
                        data: items
                    });
                }
                else{
                    console.log(e, '     error finding items');
                }
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.findVendors = async (req, res) => {
    try {
        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            qbo.findVendors({ fetchAll: true }, function(e, items){
                if(items){
                    // console.log('Start items---', items, '    ---end items');
                    return res.status(200).json({
                        success: true,
                        code: 200,
                        message: 'res of findVendors',
                        data: items
                    });
                }
                else{
                    console.log(e, '     error finding findVendors');
                }
            });
        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.refreshQuickBooksToken = async () => {
    try {
        // let getToken = await AuthToken.findOne({});
        // if(getToken){
        //     console.log(getToken, '      getToken');
        //     oauthClient.refreshUsingToken(getToken.refresh_token)
        //     .then(function(authResponse){
        //         console.log('Tokens refreshed : ' + JSON.parse(authResponse.getJson()));
        //     })
        //     .catch(function(e) {
        //         // console.error("The error message is :"+e.originalMessage);
        //         console.error("The error message is :"+e);
        //         console.error(e.intuit_tid);
        //     });
        // }
        // else{
        //     console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        // }

        oauthClient.refresh()
            .then(function(authResponse){
                let oAuthToken;
                // console.log('1-Tokens refreshed : ' + JSON.stringify(authResponse.getJson()));
                oAuthToken = JSON.parse(JSON.stringify(authResponse.getJson()));
                // console.log('1-oAuthToken refreshed : ', oAuthToken);

                let updatedData = {
                    x_refresh_token_expires_in: oAuthToken.x_refresh_token_expires_in,
                    access_token: oAuthToken.access_token,
                    token_type: oAuthToken.token_type,
                    refresh_token: oAuthToken.refresh_token,
                    expires_in: oAuthToken.expires_in,
                    // id_token: oAuthToken.id_token,
                    isValid: true
                };

                updateQuickBooksToken();

                async function updateQuickBooksToken(){
                    let findAndUpdateToken = await AuthToken.findOneAndUpdate({}, updatedData, { new: true, upsert: true });
                    if(findAndUpdateToken){
                        console.log('Token refreshed in database');
                        // updateTokenFunction();
                        // return res.status(constant.httpCode.success).json({
                        //     success: true,
                        //     code: constant.httpCode.success,
                        //     message: constant.message.quickBooksTokenSaved,
                        //     data: []
                        // });
                    }
                    else{
                        console.log('Error updating refresh token in database');
                        // createTokenFunction();
                    }
                }

            })
            .catch(function(e) {
                // console.error("The error message is :"+e.originalMessage);
                console.error("The error message is :"+e);
                console.error(e.intuit_tid);
            });

        // if(!oauthClient.isAccessTokenValid()){
        //     oauthClient.refresh()
        //         .then(function(authResponse) {
        //             console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
        //         })
        //         .catch(function(e) {
        //             console.error("The error message is :"+e);
        //             console.error(e.intuit_tid);
        //         });
        // }
        // else{
        //     console.log('Access token is valid');
        // }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createTokenForQuickBooks = async (req, res) => {
    try {
        // AuthorizationUri
        let authUri = oauthClient.authorizeUri({ scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId], state: 'testState' }); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
        // console.log(authUri, '     authUri');

        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.createTokenForQuickBooks,
            data: authUri
        });

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createTokenForQuickBooksCallBack = async (req, res) => {
    // console.log(req.url, ' req.url----------------');
    let oAuthToken;
    oauthClient.createToken(req.url)
        .then(function (authResponse){
            oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
            // console.log('The Token is  '+ oauth2_token_json);
            oAuthToken = JSON.parse(oauth2_token_json);
            // console.log(oAuthToken, '     json parse token');

            let updatedData = {
                x_refresh_token_expires_in: oAuthToken.x_refresh_token_expires_in,
                access_token: oAuthToken.access_token,
                token_type: oAuthToken.token_type,
                refresh_token: oAuthToken.refresh_token,
                id_token: oAuthToken.id_token,
                expires_in: oAuthToken.expires_in,
                isValid: true,
                refreshTokenExpiresOnDate: moment.utc().add(oAuthToken.x_refresh_token_expires_in, 'seconds').format()
            };

            updateQuickBooksToken();

            async function updateQuickBooksToken(){
                let findAndUpdateToken = await AuthToken.findOneAndUpdate({}, updatedData, { new: true, upsert: true });
                if(findAndUpdateToken){
                    socket_controller.sendDashboardDataForAdmin();
                    res.send('Token updated successfully');
                    // updateTokenFunction();
                    // return res.status(constant.httpCode.success).json({
                    //     success: true,
                    //     code: constant.httpCode.success,
                    //     message: constant.message.quickBooksTokenSaved,
                    //     data: []
                    // });
                }
                else{
                    res.send('Error in updating Token');
                    // createTokenFunction();
                }
            }


            async function updateTokenFunction(){
                const authTokenQuickBooks = new AuthToken({
                    x_refresh_token_expires_in: oAuthToken.x_refresh_token_expires_in,
                    access_token: oAuthToken.access_token,
                    token_type: oAuthToken.token_type,
                    refresh_token: oAuthToken.refresh_token,
                    id_token: oAuthToken.id_token,
                    expires_in: oAuthToken.expires_in,
                });
                let newAuthToken = await authTokenQuickBooks.save();
                if(!newAuthToken){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorSavingQuickBooksToken,
                        data: []
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.quickBooksTokenSaved,
                        data: []
                    });
                }
            }
            
            async function createTokenFunction(){
                const authTokenQuickBooks = new AuthToken({
                    x_refresh_token_expires_in: oAuthToken.x_refresh_token_expires_in,
                    access_token: oAuthToken.access_token,
                    token_type: oAuthToken.token_type,
                    refresh_token: oAuthToken.refresh_token,
                    id_token: oAuthToken.id_token,
                    expires_in: oAuthToken.expires_in,
                });
                let newAuthToken = await authTokenQuickBooks.save();
                if(!newAuthToken){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorSavingQuickBooksToken,
                        data: []
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.quickBooksTokenSaved,
                        data: []
                    });
                }
            }

        })
        .catch(function (e){
            console.error(e);
        });
        // res.send('Token updated successfully');
}

// Webhook API
exports.disbursementWebhookApiOfBraintree = async (req, res) => {
    try {
        // console.log(req.body, '     req.body of disbursement webhook API of braintree');
        let { bt_signature, bt_payload } = req.body;

        let webhookNotification = await gateway.webhookNotification.parse( bt_signature, bt_payload);
        if(webhookNotification){
            console.log(webhookNotification, '      webhookNotification');
            // console.log(webhookNotification.kind, '     webhookNotification.kind'); // "subscriptionWentPastDue"
            // console.log(webhookNotification.timestamp, '    webhookNotification.timestamp'); // Sun Jan 1 00:00:00 UTC 2012

            if(webhookNotification.kind == 'check'){
                res.status(200).send();
            }

            if(webhookNotification.kind == 'disbursement'){
                let { kind, timestamp, subject, disbursement } = webhookNotification;
                if(disbursement.success){
                    
                    let grossSales = disbursement.amount;
                    let creditCardFundsHoldingAccount = 0;

                    let creditCardProcessingFixed = 0;
                    let creditCardProcessingVariable = 0;

                    let ccFixedDescription = '';
                    let ccVariableDescription = '';

                    let linkedTxnArray = [];

                    let numberOfTransactionsInDisbursementArray = disbursement.transactionIds.length;
                    let number = 0;

                    let getToken = await AuthToken.findOne({});
                    if(getToken){
                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                        // ******Creating One Deposit for All Transactions in Disbursement******
                        for(let i=0;i<disbursement.transactionIds.length;i++){
                            let findTransaction = await Transaction.findOne({ transactionId: disbursement.transactionIds[i], isDeleted: false });
            
                            if(findTransaction){
                                creditCardFundsHoldingAccount = creditCardFundsHoldingAccount + findTransaction.creditCardFundsHoldingAccount;

                                creditCardProcessingFixed = creditCardProcessingFixed + findTransaction.braintreeConvenienceFee;
                                creditCardProcessingVariable = creditCardProcessingVariable + findTransaction.creditCardFee;

                                linkedTxnArray.push(
                                    {
                                        TxnId: findTransaction.attachableId,
                                        TxnType: 'SalesReceipt',
                                        TxnLineId: '0'
                                    }
                                );

                                number = number + 1;

                                if(number == numberOfTransactionsInDisbursementArray){
                                    ccVariableDescription = ccVariableDescription+`$${findTransaction.creditCardFee}`;
                                    createDeposit();
                                }
                                else{
                                    ccVariableDescription = ccVariableDescription+`$${findTransaction.creditCardFee}+`;
                                }
                            }
                            else{
                                console.log('Error finding transaction to make deposit');
                            }
                        }

                        async function createDeposit(){
                            creditCardFundsHoldingAccount = creditCardFundsHoldingAccount.toFixed(2);
                            creditCardFundsHoldingAccount = parseFloat(creditCardFundsHoldingAccount);

                            creditCardProcessingFixed = creditCardProcessingFixed.toFixed(2);
                            creditCardProcessingFixed = parseFloat(creditCardProcessingFixed);
            
                            creditCardProcessingVariable = creditCardProcessingVariable.toFixed(2);
                            creditCardProcessingVariable = parseFloat(creditCardProcessingVariable);

                            ccFixedDescription = `${number} x ($0.30) = $${creditCardProcessingFixed.toFixed(2)}`;

                            console.log(creditCardFundsHoldingAccount, '     creditCardFundsHoldingAccount');
                            console.log(creditCardProcessingFixed, '     creditCardProcessingFixed');
                            console.log(creditCardProcessingVariable, '     creditCardProcessingVariable');

                            let createDepositData = constant.function.createDepositInQuickBooks(disbursement.id, creditCardFundsHoldingAccount, linkedTxnArray, creditCardProcessingFixed, creditCardProcessingVariable, ccFixedDescription, ccVariableDescription);
                            qbo.createDeposit(createDepositData, function(err, attachable){
                                if(err){
                                    console.log(err, '   err in createDeposit');
                                }
                                else{
                                    console.log(attachable.Id, '   attachable.Id of createDeposit');
                                    res.status(200).send();
                                }
                            });
                        }
                    }
                    else{
                        console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    }
                }
                else{
                    console.log('Error in Disbursement Success: false');
                }
            }
        }
        else{
            console.log(webhookNotification, '    err in webhookNotification');
        }
    } catch (err) {
        console.log(err, '    err in disbursement webhook API of braintree');
    }
}

exports.adminSignUp = async (req, res) => {
    try {
        const { value, error } = validate.signup(req.body);
        if(error){
            // console.log(error.details, "error in validation");
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let {
                firstName,
                lastName,
                email,
                password,
                countryCode,
                mobileNumber,
                role,
                isManager
            } = value;
            let braintreeCustomerId;
            let uniqueId = constant.function.generateShortId();
            let userId = `D-` + uniqueId;
            let hostId = `H-` + uniqueId;
            let patrollerId = `P-` + uniqueId;

            // let user = await User.findOne({ email: email, isDeleted: false });
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                // constant.function.emailAlreadyExistFunction(res);
                if(user.length == 0){
                    let result = await gateway.customer.create({ firstName: userId });
                    if(result){
                        braintreeCustomerId = result.customer.id;
                        createNewAdmin();
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingAdmin,
                            data: []
                        });
                    }
                }
                else{
                    if(user.length == 2){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                            constant.function.mobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            constant.function.emailAlreadyExistFunction(res);
                        }
                    }
                }
            }
            else{
                constant.function.serverError(res, {});
            }
            async function createNewAdmin(){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const activationNumber = constant.function.generateActivationNumber();

                let emailVerificationNumber = constant.function.generateActivationNumber();
                let encryptedEmail = cryptr.encrypt(email);
                let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                const Admin = new User({
                    userId: userId,
                    hostId: hostId,
                    patrollerId: patrollerId,
                    braintreeCustomerId: braintreeCustomerId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    emailVerificationNumber: emailVerificationNumber,
                    salt: salt,
                    hash: hashed,
                    countryCode: countryCode,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
                    isVerified: true,
                    role: role,
                    isUser: false,
                    isManager: isManager,
                });
                let newAdmin = await Admin.save();
                if(!newAdmin){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingAdmin,
                        data: []
                    });
                }
                else{

                    constant.function.createCustomerInJira(newAdmin);

                    let getToken = await AuthToken.findOne({});
                    if(getToken){
                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                        let customerData = constant.function.createCustomerDataForQuickBooks(newAdmin);

                        qbo.createCustomer(customerData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createCustomer in adminSignUp');
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id');
                                newAdmin.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });


                        // let attachable = await qbo.createCustomer(customerData);
                        // if(attachable){
                        //     console.log(attachable.Id, '   attachable.Id');
                        //     newUser.update({ $set: { attachableId: attachable.Id } }, (reject, resolve) => {
                        //         if(resolve){
                        //             return;
                        //         }
                        //         else{
                        //             return;
                        //         }
                        //     });
                        // }
                        // else{
                        //     console.log('Err in createCustomer in adminSignUp');
                        // }
                    }
                    else{
                        console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    }


                    let accountType;
                    accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';
                    emailService.createUser(email, password, emailVerificationLink, firstName, accountType, (err, resp) => {
                        if(err){
                            // return res.status(constant.httpCode.success).json({
                            //     success: false,
                            //     code: constant.httpCode.badRequest,
                            //     message: constant.message.errorSendingEmail,
                            //     data: err
                            // });
                        }
                        else{
                            // return res.status(constant.httpCode.success).json({
                            //     success: true,
                            //     code: constant.httpCode.success,
                            //     message: constant.message.accountCreated,
                            //     data: newAdmin
                            // });
                        }
                    });
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.accountCreated,
                        data: newAdmin
                    });
                }
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

// exports.sendOtpForRegister = async (req, res)=>{
//     try {
//         // console.log(req.body, '   req.body of sendOtpForRegister');
//         let { email, countryCode, mobileNumber } = req.body;
//         let newMobileNumber = countryCode+mobileNumber;
//         let user = await User.findOne({ email: email, isDeleted: false });
//         if(user){
//             constant.function.emailAlreadyExistFunction(res);
//         }
//         else{
//             let mobileOtp = constant.function.generateActivationNumber();
//             // let emailOtp = constant.function.generateActivationNumber();

//             const token = jwt.sign({
//                 mobileOtp: mobileOtp,
//                 // emailOtp: emailOtp,
//             }, process.env.secret);

//             // console.log(token, 'token in sendOtpForRegister');

//             environment.twilio.client.messages.create({
//                 body: `'${mobileOtp}' is your 6-digit OTP for  Park`,
//                 to: newMobileNumber,  // Text this number
//                 from: environment.twilio.from
//             })
//             .then((message)=>{
//                 console.log(message.sid, '  response of message sent from twilio for signup otp');
//             });

//             let mailOptions = {
//                 from: environment.nodemailer.from,
//                 to: email,
//                 subject: constant.emailSubject.otpHelp,
//                 html: `'${mobileOtp}' is your 6-digit OTP for  Park`,
//             };

//             environment.nodemailer.transporter.sendMail(mailOptions, function(err, resp){
//                 if(err){
//                     console.log(err, 'err in nodemailer sendOtp');
//                     return res.status(constant.httpCode.success).json({
//                         success: false,
//                         code: constant.httpCode.badRequest,
//                         message: constant.message.errorOccur,
//                         data: []
//                     });
//                 }
//                 else{
//                     console.log(resp, 'resp in nodemailer sendOtp new');
//                     return res.status(constant.httpCode.success).json({
//                         success: true,
//                         code: constant.httpCode.success,
//                         message: constant.message.enterOtpNow,
//                         data: token
//                     });
//                 }
//             });
//         }
//     } catch (err) {
//         constant.function.serverError(res, err);        
//     }
// }

// New API
exports.sendOtpForRegister = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of sendOtpForRegister');
        let { email, countryCode, mobileNumber } = req.body;
        let newMobileNumber = countryCode + mobileNumber;
        let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
        if(user){
            // constant.function.emailAlreadyExistFunction(res);
            if(user.length == 0){
                sendOtp();
            }
            else{
                if(user.length == 2){
                    constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                }
                else{
                    if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                        constant.function.mobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        constant.function.emailAlreadyExistFunction(res);
                    }
                }
            }
        }
        else{
            constant.function.serverError(res, {});
        }

        async function sendOtp(){
            let mobileOtp = constant.function.generateActivationNumber();
            mobileOtp = mobileOtp.toString();

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(mobileOtp, salt);
            let token = { mobileOtp: hashed };
            console.log(mobileOtp, '   mobileOtp in sendOtpForRegister');
            environment.twilio.client.messages.create({
                    body: `Welcome to  Park! Here is your verification code: ${mobileOtp}`,
                    to: newMobileNumber, // Text this number
                    from: environment.twilio.from
                })
                .then((message) => {
                    console.log(message.sid, '  response of message sent from twilio for signup otp');
                    // return res.status(constant.httpCode.success).json({
                    //     success: true,
                    //     code: constant.httpCode.success,
                    //     message: constant.message.enterOtpNow,
                    //     data: token
                    // });
                });

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.enterOtpNow,
                data: token
            });
        }

        // let user = await User.findOne({ email: email, isDeleted: false });
        // if(user){
        //     constant.function.emailAlreadyExistFunction(res);
        // }
        // else{
        //     let mobileOtp = constant.function.generateActivationNumber();
        //     mobileOtp = mobileOtp.toString();

        //     const salt = await bcrypt.genSalt(10);
        //     const hashed = await bcrypt.hash(mobileOtp,salt);
        //     let token = { mobileOtp: hashed };

        //     console.log(mobileOtp, '   mobileOtp in sendOtpForRegister');

        //     environment.twilio.client.messages.create({
        //         body: `Welcome to  Park! Here is your verification code: ${mobileOtp}`,
        //         to: newMobileNumber,  // Text this number
        //         from: environment.twilio.from
        //     })
        //     .then((message)=>{
        //         console.log(message.sid, '  response of message sent from twilio for signup otp');
        //         return res.status(constant.httpCode.success).json({
        //             success: true,
        //             code: constant.httpCode.success,
        //             message: constant.message.enterOtpNow,
        //             data: token
        //         });
        //     });

        //     return res.status(constant.httpCode.success).json({
        //         success: true,
        //         code: constant.httpCode.success,
        //         message: constant.message.enterOtpNow,
        //         data: token
        //     });
        // }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.verifyOtpAndSignup = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of verifyOtpAndSignup');
        let { enteredOtp, otpToCompare } = req.body;
        let result = await bcrypt.compare(enteredOtp, otpToCompare);
        if(result){
            // console.log('OTP matched');
            const { value, error } = validate.signup(req.body.signUpData);
            if(error){
                let errorArray = [];
                error.details.forEach(element => {
                    if(element.message){
                        errorArray.push(element.message);
                    }
                });
                constant.function.validationError(res, errorArray);
            }
            else{
                let { firstName, lastName, email, password, countryCode, mobileNumber, role, isManager } = value;
                let newMobileNumber = countryCode + mobileNumber;
                let braintreeCustomerId;
                let uniqueId = constant.function.generateShortId();
                let userId = `D-` + uniqueId;
                let hostId = `H-` + uniqueId;
                let patrollerId = `P-` + uniqueId;
                let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
                if(user){
                    if(user.length == 0){
                        let result = await gateway.customer.create({ firstName: userId });
                        if(result){
                            braintreeCustomerId = result.customer.id;
                            userSignUp();
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorCreatingUser,
                                data: []
                            });
                        }
                    }
                    else{
                        if(user.length == 2){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                                constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                            }
                            else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                                constant.function.mobileNumberAlreadyExistFunction(res);
                            }
                            else{
                                constant.function.emailAlreadyExistFunction(res);
                            }
                        }
                    }
                }
                else{
                    constant.function.serverError(res, {});
                }

                // let user = await User.findOne({ email: email, isDeleted: false });
                // if(user){
                //     constant.function.emailAlreadyExistFunction(res);
                // }
                // else{
                //     let result = await gateway.customer.create({});
                //     if(result){
                //         braintreeCustomerId = result.customer.id;
                //         userSignUp();
                //     }
                //     else{
                //         return res.status(constant.httpCode.success).json({
                //             success: false,
                //             code: constant.httpCode.badRequest,
                //             message: constant.message.errorCreatingUser,
                //             data: []
                //         });
                //     }
                // }

                async function userSignUp(){
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(password, salt);
                    const activationNumber = constant.function.generateActivationNumber();
                    // const emailOtp = constant.function.generateActivationNumber();
                    // const mobileOtp = constant.function.generateActivationNumber();

                    let emailVerificationNumber = constant.function.generateActivationNumber();
                    let encryptedEmail = cryptr.encrypt(email);
                    let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                    const user = new User({
                        userId: userId,
                        hostId: hostId,
                        patrollerId: patrollerId,
                        braintreeCustomerId: braintreeCustomerId,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        emailVerificationNumber: emailVerificationNumber,
                        salt: salt,
                        hash: hashed,
                        countryCode: countryCode,
                        mobileNumber: mobileNumber,
                        activationNumber: activationNumber,
                        // emailOtp: emailOtp,
                        // mobileOtp: mobileOtp,
                        role: role,
                        isUser: !isManager,
                        isManager: isManager,
                        isVerified: true
                    });
                    let newUser = await user.save();
                    if(!newUser){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingUser,
                            data: []
                        });
                    }
                    else{

                        constant.function.createCustomerInJira(newUser);

                        // intuit_controller.updateCustomerQuickbooksList(newUser);

                        let getToken = await AuthToken.findOne({});
                        if(getToken){
                            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                            let customerData = constant.function.createCustomerDataForQuickBooks(newUser);
                
                            qbo.createCustomer(customerData, function(err, attachable){
                                if(err){
                                    console.log(err, '   err in createCustomer in userSignUp');
                                }
                                else{
                                    console.log(attachable.Id, '   attachable.Id');
                                    newUser.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                        if(resolve){
                                            return;
                                        }
                                        else{
                                            return;
                                        }
                                    });
                                }
                            });
                            
                            // let attachable = await qbo.createCustomer(customerData);
                            // if(attachable){
                            //     console.log(attachable.Id, '   attachable.Id');
                            //     newUser.update({ $set: { attachableId: attachable.Id } }, (reject, resolve) => {
                            //         if(resolve){
                            //             return;
                            //         }
                            //         else{
                            //             return;
                            //         }
                            //     });
                            // }
                            // else{
                            //     console.log('Err in createCustomer in userSignUp');
                            // }
                        }
                        else{
                            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                        }

                        let accountType;
                        accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';

                        emailService.signUp(email, firstName, accountType, emailVerificationLink, (err, resp) => {
                            if(err){
                                // return res.status(constant.httpCode.success).json({
                                //     success: false,
                                //     code: constant.httpCode.badRequest,
                                //     message: constant.message.errorSendingEmail,
                                //     data: err
                                // });
                            }
                            else{
                                // return res.status(constant.httpCode.success).json({
                                //     success: true,
                                //     code: constant.httpCode.success,
                                //     message: constant.message.userAccountCreated,
                                //     data: newUser
                                // });
                            }
                        });

                        setTimeout(() => {
                            environment.twilio.client.messages.create({
                                body: constant.function.signUpWelcomeMessageInSms(firstName, accountType),
                                to: newMobileNumber, // Text this number
                                from: environment.twilio.from
                            })
                            .then((message) => {
                                console.log(message.sid, '  response of message sent from twilio for signup otp');
                            });
                        }, 900000);

                        const token = newUser.generateAuthToken();
                        return res.header('x-auth-token', token).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.accountCreated,
                            data: newUser,
                            role: newUser.role,
                            token: token
                        });
                    }
                }
            }
        }
        else{
            console.log('OTP not matched');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.invalidOtp,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.verifyOtpAndPatrollerSignup = async (req, res) => {
    try {
        console.log(req.body, '   req.body of verifyOtpAndPatrollerSignup');
        let { enteredOtp, otpToCompare } = req.body;
        let result = await bcrypt.compare(enteredOtp, otpToCompare);
        if(result){
            // console.log('OTP matched');
            const { value, error } = validate.patrollerSignUp(req.body.patrollerSignUpData);
            if(error){
                let errorArray = [];
                error.details.forEach(element => {
                    if(element.message){
                        errorArray.push(element.message);
                    }
                });
                constant.function.validationError(res, errorArray);
            }
            else{
                let {
                    companyName,
                    firstName,
                    lastName,
                    email,
                    password,
                    companyEmail,
                    countryCode,
                    mobileNumber,
                    businessCountryCode,
                    businessMobileNumber,
                    address,
                    // city,
                    // state,
                    // zipCode,
                    latitude,
                    longitude,
                    mailingAddress,
                    // mailingCity,
                    // mailingState,
                    // mailingZipCode,
                    apartmentNumber,
                    patrollingDistanceToCover,
                    stateLicenseNumber,
                    role,
                    isManager,
                    isPatroller
                } = value;
                let newMobileNumber = countryCode + mobileNumber;
                let braintreeCustomerId;
                let uniqueId = constant.function.generateShortId();
                let userId = `D-` + uniqueId;
                let hostId = `H-` + uniqueId;
                let patrollerId = `P-` + uniqueId;
                let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
                if(user){
                    if(user.length == 0){
                        let result = await gateway.customer.create({ firstName: patrollerId });
                        if(result){
                            braintreeCustomerId = result.customer.id;
                            patrollerSignUp();
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorCreatingUser,
                                data: []
                            });
                        }
                    }
                    else{
                        if(user.length == 2){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                                constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                            }
                            else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                                constant.function.mobileNumberAlreadyExistFunction(res);
                            }
                            else{
                                constant.function.emailAlreadyExistFunction(res);
                            }
                        }
                    }
                }
                else{
                    constant.function.serverError(res, {});
                }

                async function patrollerSignUp(){
                    const salt = await bcrypt.genSalt(10);
                    const hashed = await bcrypt.hash(password, salt);
                    const activationNumber = constant.function.generateActivationNumber();
                    // const emailOtp = constant.function.generateActivationNumber();
                    // const mobileOtp = constant.function.generateActivationNumber();

                    let emailVerificationNumber = constant.function.generateActivationNumber();
                    let encryptedEmail = cryptr.encrypt(email);
                    let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                    const user = new User({
                        userId: userId,
                        hostId: hostId,
                        patrollerId: patrollerId,
                        braintreeCustomerId: braintreeCustomerId,
                        companyName: companyName,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        emailVerificationNumber: emailVerificationNumber,
                        salt: salt,
                        hash: hashed,
                        companyEmail: companyEmail,
                        countryCode: countryCode,
                        mobileNumber: mobileNumber,
                        businessCountryCode: businessCountryCode,
                        businessMobileNumber: businessMobileNumber,

                        address: address,
                        // city: city,
                        // state: state,
                        // zipCode: zipCode,
                        latitude: latitude,
                        longitude: longitude,
                        location: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        mailingAddress: mailingAddress,
                        // mailingCity: mailingCity,
                        // mailingState: mailingState,
                        // mailingZipCode: mailingZipCode,
                        apartmentNumber: apartmentNumber,
                        patrollingDistanceToCover: patrollingDistanceToCover,
                        stateLicenseNumber: stateLicenseNumber,

                        activationNumber: activationNumber,
                        // emailOtp: emailOtp,
                        // mobileOtp: mobileOtp,
                        role: '4',
                        isUser: false,
                        isManager: false,
                        isPatroller: true,
                        isVerified: true
                    });
                    let newUser = await user.save();
                    if(!newUser){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingUser,
                            data: []
                        });
                    }
                    else{

                        constant.function.createCustomerInJira(newUser);

                        // let getToken = await AuthToken.findOne({});
                        // if(getToken){
                        //     let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                        //     let customerData = constant.function.createCustomerDataForQuickBooks(newUser);
                
                        //     qbo.createCustomer(customerData, function(err, attachable){
                        //         if(err){
                        //             console.log(err, '   err in createCustomer in userSignUp');

                        //             let summary = `Customer: ${newUser.userId} data not saved in QBO`;
                        //             let textToPrint = `Customer: ${newUser.userId} data not saved in QBO`;
                        //             let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                    
                        //             request( jiraServiceDeskoptions , (error, response, body) => {
                        //                 console.log(error, '    error of issue in jira service desk');
                        //                 console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                        //                 // console.log(response, '    response of issue in jira service desk');
                        //                 console.log(body, '    body of issue in jira service desk');
                        //             });
                        //         }
                        //         else{
                        //             console.log(attachable.Id, '   attachable.Id');
                        //             newUser.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                        //                 if(resolve){
                        //                     return;
                        //                 }
                        //                 else{
                        //                     return;
                        //                 }
                        //             });
                        //         }
                        //     });
                        // }
                        // else{
                        //     console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                        // }

                        let accountType;
                        accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : role == '3' ? accountType = 'Driver' : accountType = 'Patroller';

                        emailService.signUp(email, firstName, accountType, emailVerificationLink, (err, resp) => {
                            if(err){
                                // return res.status(constant.httpCode.success).json({
                                //     success: false,
                                //     code: constant.httpCode.badRequest,
                                //     message: constant.message.errorSendingEmail,
                                //     data: err
                                // });
                            }
                            else{
                                // return res.status(constant.httpCode.success).json({
                                //     success: true,
                                //     code: constant.httpCode.success,
                                //     message: constant.message.userAccountCreated,
                                //     data: newUser
                                // });
                            }
                        });

                        // setTimeout(() => {
                        //     environment.twilio.client.messages.create({
                        //         body: constant.function.signUpWelcomeMessageInSms(firstName, accountType),
                        //         to: newMobileNumber, // Text this number
                        //         from: environment.twilio.from
                        //     })
                        //     .then((message) => {
                        //         console.log(message.sid, '  response of message sent from twilio for signup otp');
                        //     });
                        // }, 900000);

                        const token = newUser.generateAuthToken();
                        return res.header('x-auth-token', token).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.accountCreated,
                            data: newUser,
                            role: newUser.role,
                            token: token
                        });
                    }
                }
            }
        }
        else{
            console.log('OTP not matched');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.invalidOtp,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

// exports.signUp = async (req, res)=>{
//     try{
//         const { value, error } = validate.signup(req.body);
//         if(error){
//             let errorArray = [];
//             error.details.forEach(element => {
//                 if(element.message){
//                     errorArray.push(element.message);
//                 }
//             });
//             constant.function.validationError(res, errorArray);
//         }
//         else{
//             let { firstName, lastName, email, password, mobileNumber, role } = value;
//             let user = await User.findOne({ email: email, isDeleted: false });
//             let braintreeCustomerId;
//             let uniqueId = constant.function.generateShortId();
//             let userId = `D-` + uniqueId;
//             let hostId = `H-` + uniqueId; 
//             if(user){
//                 constant.function.emailAlreadyExistFunction(res);
//             }
//             else{
//                gateway.customer.create({}, function (err, result){
//                    if(result){
//                        braintreeCustomerId = result.customer.id;
//                        userSignUp();
//                    }
//                    else{
//                        return res.status(constant.httpCode.success).json({
//                            success: false,
//                            code: constant.httpCode.badRequest,
//                            message: constant.message.errorCreatingUser,
//                            data: []
//                        });
//                    }
//                });
//             }
//             async function userSignUp(){
//                 const salt = await bcrypt.genSalt(10);
//                 const hashed = await bcrypt.hash(password,salt);
//                 const activationNumber = constant.function.generateActivationNumber();
//                 const user = new User({
//                     userId: userId,
//                     hostId: hostId,
//                     braintreeCustomerId: braintreeCustomerId,
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: email,
//                     salt: salt,
//                     hash: hashed,
//                     mobileNumber: mobileNumber,
//                     activationNumber: activationNumber,
//                     role: role,
//                 });
//                 let newUser = await user.save();
//                 if(!newUser){
//                     return res.status(constant.httpCode.success).json({
//                         success: false,
//                         code: constant.httpCode.badRequest,
//                         message: constant.message.errorCreatingUser,
//                         data: []
//                     });
//                 }
//                 else{
//                     const encryptedEmail = cryptr.encrypt(email);

//                     let link = `${environment.api_url}api/users/verify?jpn=${activationNumber}&etl=${encryptedEmail}`;

//                     let accountType;
//                     accountType = role == '1'? accountType = 'Admin' : role == '2'? accountType = 'Host': accountType = 'Driver';

//                     emailService.signUp(email, link, firstName, accountType, (err,resp)=>{
//                         if(err){
//                             return res.status(constant.httpCode.success).json({
//                                 success: false,
//                                 code: constant.httpCode.badRequest,
//                                 message: constant.message.errorSendingEmail,
//                                 data: err
//                             });
//                         }
//                         else{
//                             return res.status(constant.httpCode.success).json({
//                                 success: true,
//                                 code: constant.httpCode.success,
//                                 message: constant.message.userAccountCreated,
//                                 data: newUser
//                             });
//                         }
//                     });
//                 }
//             }
//         }
//     } catch (err) {
//         console.log(err, '    err in signup');
//         constant.function.serverError(res, err);
//     }
// }

exports.signUp = async (req, res) => {
    try {
        const { value, error } = validate.signup(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { firstName, lastName, email, password, countryCode, mobileNumber, role, isManager } = value;
            let braintreeCustomerId;
            let uniqueId = constant.function.generateShortId();
            let userId = `D-` + uniqueId;
            let hostId = `H-` + uniqueId;
            let patrollerId = `P-` + uniqueId;
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                let result = await gateway.customer.create({ firstName: userId });
                if(result){
                    braintreeCustomerId = result.customer.id;
                    userSignUp();
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingUser,
                        data: []
                    });
                }
                // gateway.customer.create({}, function (err, result){
                //     if(result){
                //         braintreeCustomerId = result.customer.id;
                //         userSignUp();
                //     }
                //     else{
                //         return res.status(constant.httpCode.success).json({
                //             success: false,
                //             code: constant.httpCode.badRequest,
                //             message: constant.message.errorCreatingUser,
                //             data: []
                //         });
                //     }
                // });
            }
            async function userSignUp(){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const activationNumber = constant.function.generateActivationNumber();
                // const emailOtp = constant.function.generateActivationNumber();
                // const mobileOtp = constant.function.generateActivationNumber();

                let emailVerificationNumber = constant.function.generateActivationNumber();
                let encryptedEmail = cryptr.encrypt(email);
                let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                const user = new User({
                    userId: userId,
                    hostId: hostId,
                    patrollerId: patrollerId,
                    braintreeCustomerId: braintreeCustomerId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    emailVerificationNumber: emailVerificationNumber,
                    salt: salt,
                    hash: hashed,
                    countryCode: countryCode,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
                    // emailOtp: emailOtp,
                    // mobileOtp: mobileOtp,
                    role: role,
                    isUser: !isManager,
                    isManager: isManager,
                    isVerified: true
                });
                let newUser = await user.save();
                if(!newUser){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingUser,
                        data: []
                    });
                }
                else{

                    constant.function.createCustomerInJira(newUser);

                    let accountType;
                    accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';

                    emailService.signUp(email, firstName, accountType, emailVerificationLink, (err, resp) => {
                        if(err){
                            // return res.status(constant.httpCode.success).json({
                            //     success: false,
                            //     code: constant.httpCode.badRequest,
                            //     message: constant.message.errorSendingEmail,
                            //     data: err
                            // });
                        }
                        else{
                            // return res.status(constant.httpCode.success).json({
                            //     success: true,
                            //     code: constant.httpCode.success,
                            //     message: constant.message.userAccountCreated,
                            //     data: newUser
                            // });
                        }
                    });

                    const token = newUser.generateAuthToken();
                    return res.header('x-auth-token', token).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.accountCreated,
                        data: newUser,
                        role: newUser.role,
                        token: token
                    });
                }
            }
        }
    } catch (err) {
        console.log(err, '    err in signup');
        constant.function.serverError(res, err);
    }
}

exports.verify = async (req, res) => {
    try {
        const { value, error } = validate.verify(req.query);
        if(error){
            // console.log(error.details, "error in validation");
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { etl, jpn } = value;
            let decryptedEmail = cryptr.decrypt(etl);
            let activationNumber = jpn;
            let newActivationNumber = constant.function.generateActivationNumber();

            let updateUser = await User.findOneAndUpdate({ email: decryptedEmail, activationNumber: activationNumber, isDeleted: false }, { $set: { isVerified: true, activationNumber: newActivationNumber } }, { new: true });
            if(updateUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.accountVerified,
                    data: []
                });
            }
            else{
                // constant.function.userNotFound(res);
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.unauthorized,
                    message: constant.message.unauthorized,
                    data: []
                });
            }

        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.signIn = async (req, res) => {
    try {
        const { value, error } = validate.signIn(req.body);
        if(error){
            // console.log(error.details, "error in validation");
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { email, password } = value;
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                let result = await bcrypt.compare(password, user.hash);
                // bcrypt.compare(password, user.hash, (err, result) => {
                    if(result){
                        if(user.isVerified){
                            if(user.isActivated){
                                const token = user.generateAuthToken();
                                return res.header('x-auth-token', token).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.signInSuccess,
                                    data: user,
                                    role: user.role,
                                    token: token
                                });
                            }
                            else{
                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.unauthorized,
                                    message: constant.message.accountNotActive,
                                    data: []
                                });
                            }
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.unauthorized,
                                message: constant.message.accountNotVerified,
                                data: []
                            });
                        }
                    }
                    else{
                        constant.function.invalidCredentials(res);
                    }
                // });
            }
            else{
                constant.function.invalidCredentials(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { value, error } = validate.forgotPassword(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { email } = value;
            const activationNumber = constant.function.generateActivationNumber();
            let updateUser = await User.findOneAndUpdate({ email: email, isDeleted: false }, { $set: { activationNumber: activationNumber } }, { new: true });
            if(updateUser){
                const encryptedEmail = cryptr.encrypt(email);
                let link = `${environment.web_url}recovery?jpn=${activationNumber}&etl=${encryptedEmail}`;
                console.log(link, '----link');
                emailService.resetPassword(email, link, updateUser.firstName, (err, resp) => {
                    if(err){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorSendingEmail,
                            data: err
                        });
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.resetPasswordNow,
                            data: resp
                        });
                    }
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.setPassword = async (req, res) => {
    try {
        const { value, error } = validate.setPassword(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            const decryptedEmail = cryptr.decrypt(value.etl);
            let activationNumber = value.jpn;
            let user = await User.findOne({ email: decryptedEmail, isDeleted: false, activationNumber: activationNumber });
            if(user){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.setPasswordNow,
                    data: []
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.unauthorized,
                    message: constant.message.unauthorized,
                    data: []
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.postSetPassword = async (req, res) => {
    try {
        const { value, error } = validate.postSetPassword(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            const decryptedEmail = cryptr.decrypt(value.email);
            let password = value.password;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const activationNumber = constant.function.generateActivationNumber();

            let updateUser = await User.findOneAndUpdate({ email: decryptedEmail, isActivated: true, isDeleted: false }, { $set: { salt: salt, hash: hash, activationNumber: activationNumber } }, { new: true });
            if(updateUser){
                const token = updateUser.generateAuthToken();
                return res.header('x-auth-token', token).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.signInSuccess,
                    data: updateUser,
                    role: updateUser.role,
                    token: token
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.errorCreatingPassword,
                    data: []
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { value, error } = validate.changePassword(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let loggedInUser = req.user._id;
            let { currentPassword, newPassword, confirmNewPassword } = value;
            let user = await User.findOne({ _id: loggedInUser, isDeleted: false });
            if(user){
                let resultPass = await bcrypt.compare(currentPassword, user.hash);
                // console.log(resultPass, 'result Pass'); // Returns true/false
                if(!resultPass){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.unauthorized,
                        message: constant.message.errorInPasswordChange,
                        data: []
                    });
                }
                else{
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(newPassword, salt);
                    const activationNumber = constant.function.generateActivationNumber();

                    let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: { salt: salt, hash: hash, activationNumber: activationNumber } }, { new: true });
                    if(updateUser){
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.passwordChangedSuccessfully,
                            data: []
                        });
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingPassword,
                            data: []
                        });
                    }
                }
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.addVehicle = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of addVehicle');
        let loggedInUser = req.user._id;
        let { licensePlateNumber, stateRegistered, nickName } = req.body.data;
        let isAdmin = req.body.isAdmin;
        let query = {};
        isAdmin ? query = { _id: req.body.userId, isDeleted: false } : query = { _id: loggedInUser, isDeleted: false };
        let updateUser = await User.findOneAndUpdate(query, { $push: { vehicles: req.body.data } }, { new: true }).populate('parkingLots transactions');
        // let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $push: { vehicles: req.body } }, { new: true }).populate({path: 'transactions', options: { sort: { 'createdAt': -1 } } }, {path: 'parkingLots', options: { sort: { 'createdAt': -1 } } });
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.vehicleAdded,
                data: updateUser
            });
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editVehicle = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of editVehicle');
        let loggedInUser = req.user._id;
        let { _id, licensePlateNumber, stateRegistered, nickName } = req.body.data;
        let isAdmin = req.body.isAdmin;
        let query;
        // isAdmin? query = { _id: req.body.userId, isDeleted: false } : { _id: loggedInUser, isDeleted: false };
        isAdmin ? query = { _id: req.body.userId, isDeleted: false } : query = { _id: loggedInUser, isDeleted: false };

        // let updateUser = await User.findOneAndUpdate(query, { $push: { vehicles: req.body.data } }, { new: true }).populate('parkingLots transactions');
        // let updateUser = await User.updateOne({ _id: loggedInUser, isDeleted: false, 'vehicles._id' : req.body.data._id }, { $set: { 'vehicles.licensePlateNumber': req.body.data.licensePlateNumber, 'vehicles.stateRegistered': req.body.data.stateRegistered, 'vehicles.nickName': req.body.data.nickName } });
        let updateUser = await User.findOneAndUpdate({ 'vehicles._id': _id }, { '$set': { 'vehicles.$.licensePlateNumber': licensePlateNumber, 'vehicles.$.stateRegistered': stateRegistered, 'vehicles.$.nickName': nickName } }, { new: true }).populate('parkingLots transactions');
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.vehicleEdit,
                data: updateUser
            });
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.removeVehicle = async (req, res) => {
    try {
        // const { value, error } = validate.validateId(req.query);
        // if(error){
        //     let errorArray = [];
        //     error.details.forEach(element => {
        //         if(element.message){
        //             errorArray.push(element.message);
        //         }
        //     });
        //     constant.function.validationError(res, errorArray);
        // }
        // else{
        // let { id } = req.body;
        // console.log(req.body, 'req body of remove vehicle');
        let isAdmin = req.body.isAdmin;
        let userId;
        isAdmin ? userId = req.body.user : userId = req.user._id;
        let updateUser = await User.findOneAndUpdate({ _id: userId, isDeleted: false }, { $pull: { vehicles: req.body.vehicleData } }, { new: true });
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.vehicleRemoved,
                data: updateUser
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
        // }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // let user = await User.findOne({ _id: loggedInUser, isDeleted: false }).populate('parkingLots transactions');
        let user = await User.findOne({ _id: loggedInUser, isDeleted: false }).populate({ path: 'transactions parkingLots walletHistory', options: { sort: { createdAt: -1 } } });
        if(user){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.profileFound,
                data: user
            });
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.checkIfEmailAlreadyAvailable = async (req, res) => {
    try {
        // let loggedInUser = req.user._id;
        console.log(req.body, '   req body email');
        let email = req.body.email;
        let isEdit = req.body.isEdit;
        let user = await User.findOne({ email: email, isDeleted: false });
        if(user){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.emailAlreadyExist,
                data: []
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editMyAccount = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of editMyAccount');
        let loggedInUser = req.user._id;
        let { firstName, lastName, email, countryCode, mobileNumber } = req.body.userData;
        let previousEmail = req.body.previousEmail;

        let emailVerificationNumber = constant.function.generateActivationNumber();
        let encryptedEmail = cryptr.encrypt(email);
        let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);
        
        let updatedData;
        if(email != previousEmail){
            updatedData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                emailVerificationNumber: emailVerificationNumber,
                isEmailVerified: false,
            };
        }
        else{
            updatedData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
            };
        }

        if(email != previousEmail){
            let findUser = await User.findOne({ email: email, isDeleted: false });
            if(findUser){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                editMyAccount();
            }
        }
        else{
            editMyAccount();
        }

        async function editMyAccount(){
            let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate('parkingLots transactions');
            // let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate({path: 'transactions', options: { sort: { 'createdAt': -1 } } }, {path: 'parkingLots', options: { sort: { 'createdAt': -1 } } });
            if(updateUser){
    
                if(updateUser.email != previousEmail){
                    console.log('Change in email',     previousEmail);
                    constant.function.createCustomerInJira(updateUser);
                    console.log(emailVerificationLink, '----email verification link');
                    emailService.verifyEmail(email, emailVerificationLink, updateUser.firstName, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });

                }
    
                let SyncToken = '0';
                let SyncTokenForVendor = '0';
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
    
                    let findW9 = await Wnine.find({ manager: updateUser, isDeleted: false });
                    if(findW9){
                        if(findW9.length > 0){
                            // console.log(findW9, '    findW9');
                            findW9.forEach(element => {
    
                                qbo.getVendor(element.attachableId, function(err, vendor){
                                    if(err){
                                        console.log(err, 'Error updating vendor data in quickbooks online');
                                    }
                                    else{
                                        SyncTokenForVendor = vendor.SyncToken;
                                        setTimeout(function () {
                                            updateWNineInQuickBooks();
                                        }, 1000);
                                    }
                                });
    
                                function updateWNineInQuickBooks(){
                                    qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(element, updateUser, SyncTokenForVendor), function(err, vendor){
                                        if(err){
                                            console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                                        }
                                        else{
                                            console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                                        }
                                    });
                                }
                                
                            });
                        }
                    }
                    else{
                        console.log('No w9 found');
                    }
    
    
                    qbo.getCustomer(updateUser.attachableId, function(e, customer){
                        if(customer){
                            // console.log('Start---', customer, '    ---end customers');
                            SyncToken = customer.SyncToken;
                            updateCustomerInQuickBooks();
                        }
                        else{
                            console.log(e, '    error in get customer in qbo');
                        }
                    });
    
                    // qbo.findCustomers({
                    //     // fetchAll: true
                    //     Id: updateUser.attachableId,
                    //   }, function(e, customers){
                    //       if(customers){
                    //           // console.log('Start---', customers.QueryResponse.Customer[0], '    ---end customers');
                    //           SyncToken = customers.QueryResponse.Customer[0].SyncToken;
                    //           updateCustomerInQuickBooks();
                    //       }
                    //       else{
                    //           console.log(e, '    error finding customer in qbo');
                    //       }
                    // });
    
                    function updateCustomerInQuickBooks(){
                        qbo.updateCustomer(constant.function.updateCustomerDataInQuickBooks(updateUser, SyncToken), function(err, customer){
                            if(err){
                                console.log(err, '   err in update customer in editmyaccount');
                            }
                            else{
                                console.log(customer, '   update customer in editmyaccount');
                            }
                        });
                    }
    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }
    
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editMyProfile = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of editMyProfile');
        let loggedInUser = req.user._id;
        let { firstName, lastName, email, countryCode, mobileNumber } = req.body;

        let updatedData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            countryCode: countryCode,
            mobileNumber: mobileNumber,
        };
        let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate('parkingLots transactions');
        // let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate({path: 'transactions', options: { sort: { 'createdAt': -1 } } }, {path: 'parkingLots', options: { sort: { 'createdAt': -1 } } });
        if(updateUser){

            constant.function.createCustomerInJira(updateUser);

            let SyncToken = '0';
            let SyncTokenForVendor = '0';
            let getToken = await AuthToken.findOne({});
            if(getToken){
                let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                let findW9 = await Wnine.find({ manager: updateUser, isDeleted: false });
                if(findW9){
                    if(findW9.length > 0){
                        // console.log(findW9, '    findW9');
                        findW9.forEach(element => {

                            qbo.getVendor(element.attachableId, function(err, vendor){
                                if(err){
                                    console.log(err, 'Error updating vendor data in quickbooks online');
                                }
                                else{
                                    SyncTokenForVendor = vendor.SyncToken;
                                    setTimeout(function () {
                                        updateWNineInQuickBooks();
                                    }, 1000);
                                }
                
                            });
            
                            function updateWNineInQuickBooks(){
                                qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(element, updateUser, SyncTokenForVendor), function(err, vendor){
                                    if(err){
                                        console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                                    }
                                    else{
                                        console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                                    }
                                });
                            }
                            
                        });
                    }
                }
                else{
                    console.log('No w9 found');
                }

                qbo.getCustomer(updateUser.attachableId, function(e, customer){
                    if(customer){
                        // console.log('Start---', customer, '    ---end customers');
                        SyncToken = customer.SyncToken;
                        updateCustomerInQuickBooks();
                    }
                    else{
                        console.log(e, '    error in get customer in qbo');
                    }
                });

                // qbo.findCustomers({
                //     // fetchAll: true
                //     Id: updateUser.attachableId,
                //   }, function(e, customers){
                //     // console.log('Start---', customers.QueryResponse.Customer[0], '    ---end customers');
                //     SyncToken = customers.QueryResponse.Customer[0].SyncToken;
                //     updateCustomerInQuickBooks();
                // });

                function updateCustomerInQuickBooks(){
                    qbo.updateCustomer(constant.function.updateCustomerDataInQuickBooks(updateUser, SyncToken), function(err, customer){
                        if(err){
                            console.log(err, '   err in update customer in editmyaccount');
                        }
                        else{
                            console.log(customer, '   update customer in editmyaccount');
                        }
                    });
                }

            }
            else{
                console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
            }

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.userUpdated,
                data: updateUser
            });
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.changeEmail = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { email } = req.body;

        let updatedData = {
            email: email
        };

        let findEmail = await User.findOne({ email: req.body.email, isDeleted: false });
        if(findEmail){
            constant.function.emailAlreadyExistFunction(res);
        }
        else{
            let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate('parkingLots transactions');
            if(updateUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.changeMobileNumber = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { countryCode, mobileNumber } = req.body;
        let newMobileNumber = countryCode + mobileNumber;

        let user = await User.findOne({ countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false });
        if(user){
            constant.function.mobileNumberAlreadyExistFunction(res);
        }
        else{
            let mobileOtp = constant.function.generateActivationNumber();
            mobileOtp = mobileOtp.toString();
            console.log(mobileOtp, '   mobileOtp in changeMobileNumber');

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(mobileOtp, salt);
            let token = {
                mobileOtp: hashed
            };

            environment.twilio.client.messages.create({
                body: `Welcome to  Park! Here is your verification code: ${mobileOtp}`,
                to: newMobileNumber, // Text this number
                from: environment.twilio.from
            }).then((message) => {
                console.log(message.sid, '  response of message sent from twilio for signup otp');
                // return res.status(constant.httpCode.success).json({
                //     success: true,
                //     code: constant.httpCode.success,
                //     message: constant.message.enterOtpNow,
                //     data: token
                // });
            });

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.enterOtpNow,
                data: token
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.verifyOtpAndEditProfile = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of verifyOtpAndEditProfile');
        let loggedInUser = req.user._id;
        let { enteredOtp, otpToCompare, updatedData } = req.body;
        let result = await bcrypt.compare(enteredOtp, otpToCompare);
        if(result){
            let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate('parkingLots transactions');
            if(updateUser){

                let SyncToken = '0';
                let SyncTokenForVendor = '0';
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                    let findW9 = await Wnine.find({ manager: updateUser, isDeleted: false });
                    if(findW9){
                        if(findW9.length > 0){
                            // console.log(findW9, '    findW9');
                            findW9.forEach(element => {
    
                                qbo.getVendor(element.attachableId, function(err, vendor){
                                    if(err){
                                        console.log(err, 'Error updating vendor data in quickbooks online');
                                    }
                                    else{
                                        SyncTokenForVendor = vendor.SyncToken;
                                        setTimeout(function () {
                                            updateWNineInQuickBooks();
                                        }, 1000);
                                    }
                    
                                });
                
                                function updateWNineInQuickBooks(){
                                    qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(element, updateUser, SyncTokenForVendor), function(err, vendor){
                                        if(err){
                                            console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                                        }
                                        else{
                                            console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                                        }
                                    });
                                }
                                
                            });
                        }
                    }
                    else{
                        console.log('No w9 found');
                    }
    
                    qbo.getCustomer(updateUser.attachableId, function(e, customer){
                        if(customer){
                            // console.log('Start---', customer, '    ---end customers');
                            SyncToken = customer.SyncToken;
                            updateCustomerInQuickBooks();
                        }
                        else{
                            console.log(e, '    error in get customer in qbo');
                        }
                    });

                    // qbo.findCustomers({
                    //     // fetchAll: true
                    //     Id: updateUser.attachableId,
                    //   }, function(e, customers){
                    //     // console.log('Start---', customers.QueryResponse.Customer[0], '    ---end customers');
                    //     SyncToken = customers.QueryResponse.Customer[0].SyncToken;
                    //     updateCustomerInQuickBooks();
                    // });
    
                    function updateCustomerInQuickBooks(){
                        qbo.updateCustomer(constant.function.updateCustomerDataInQuickBooks(updateUser, SyncToken), function(err, customer){
                            if(err){
                                console.log(err, '   err in update customer in verifyOtpAndEditProfile');
                            }
                            else{
                                console.log(customer, '   update customer in verifyOtpAndEditProfile');
                            }
                        });
                    }
    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
        else{
            console.log('OTP not matched');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.invalidOtp,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.verifyOtpAndEditProfileOfPatroller = async (req, res) => {
    try {
        console.log(req.body, '   req.body of verifyOtpAndEditProfileOfPatroller');
        let loggedInUser = req.user._id;
        let { enteredOtp, otpToCompare, updatedData } = req.body;
        let result = await bcrypt.compare(enteredOtp, otpToCompare);
        if(result){
            let updateUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: updatedData }, { new: true }).populate('parkingLots transactions');
            if(updateUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
        else{
            console.log('OTP not matched');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.invalidOtp,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMyTransactions = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'parkingLot' })
        };
        let activeTransactions = [];

        let transactions = await Transaction.paginate({ user: loggedInUser, isDeleted: false }, options);
        if(transactions.docs.length === 0){
            // checkActiveTransactions();
            sendResponse();
        }
        else if(transactions){
            // checkActiveTransactions();
            sendResponse();
        }
        else{
            // checkActiveTransactions();
            sendResponse();
        }

        async function checkActiveTransactions(){
            let activeTransaction = await Transaction.find({
                user: loggedInUser,
                isPaymentDoneFromWallet: false,
                isDeleted: false
            });
            if(activeTransaction){
                activeTransactions = activeTransaction;
                sendResponse();
            }
            else{
                sendResponse();
            }
        }

        // let transactions = await Transaction.paginate({ user: loggedInUser, isCompleted: true, isDeleted: false }, options);
        // if(transactions.docs.length === 0){
        //     checkActiveTransactions();
        // }
        // else if(transactions){
        //     checkActiveTransactions();
        // }
        // else{
        //     checkActiveTransactions();
        // }

        // async function checkActiveTransactions(){
        //     let activeTransaction = await Transaction.find({ user: loggedInUser, isCompleted: false, isDeleted: false }).sort({ createdAt: -1 });
        //     if(activeTransaction){
        //         activeTransactions = activeTransaction;
        //         sendResponse();
        //     }
        //     else{
        //         sendResponse();
        //     }
        // }

        function sendResponse(){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions,
                activeTransactions: activeTransactions
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.addMoneyToWallet = async (req, res) => {
    try {
        console.log(req.body, '    req.body of addMoneyToWallet');
        // let loggedInUser = req.user._id;
        let { walletBalance, walletHistory, isAdmin, userId, turnAutoReloadOn } = req.body;
        let id;
        isAdmin ? id = userId : id = req.user._id;
        // let updateUserWallet = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $push: { walletHistory: req.body.walletHistory } }, { new: true });
        let updateUserWallet = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { walletBalance: walletBalance, autoReloadWallet: turnAutoReloadOn } }, { new: true }).populate({ path: 'transactions parkingLots walletHistory', options: { sort: { createdAt: -1 } } });
        if(updateUserWallet){
            // Wallet load transaction
            let Wallet = new Transaction({
                user: id,
                currentBalance: walletBalance,
                transactionId: walletHistory.transactionId,
                amountCredited: walletHistory.amountCredited,
                amountDebited: walletHistory.amountDebited,
                creditCardFundsHoldingAccount: walletHistory.creditCardFundsHoldingAccount,
                isCredited: walletHistory.isCredited,
                // creditCard: walletHistory.creditCard,
                success: walletHistory.success,
                braintreeConvenienceFee: walletHistory.braintreeConvenienceFee,
                creditCardFee: walletHistory.creditCardFee,
                totalIncomeToBraintree: walletHistory.totalIncomeToBraintree,
                date: moment.utc(moment().format()).format(),
                isWalletHistory: true,
                isCompleted: true,
                isPaymentDone: true,

                amount: walletHistory.amountCredited
                // startTime: moment.utc(moment().format()).format(),
                // endTime: moment.utc(moment().format()).format(),
            });
            let newWalletHistory = await Wallet.save();
            if(!newWalletHistory){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.errorAddingMoneyToWallet,
                    data: []
                });
            }
            else{
                // updateUserWallet.walletHistory.push(newWalletHistory);
                // updateUserWallet.save();

                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                    let walletLoadTransactionData = constant.function.createSalesReceiptForWalletLoadInQuickBooks(updateUserWallet, newWalletHistory);

                    qbo.createSalesReceipt(walletLoadTransactionData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in create transaction for wallet load 11');
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id for wallet load');
                            newWalletHistory.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });
                        }
                    });
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }

                updateUserWallet.transactions.push(newWalletHistory);
                updateUserWallet.save();

                let customer = await gateway.customer.find(`${updateUserWallet.braintreeCustomerId}`);
                if(customer){
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.moneyAddedToWallet,
                        data: updateUserWallet,
                        creditCards: customer.creditCards
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.moneyAddedToWallet,
                        data: updateUserWallet,
                        creditCards: []
                    });
                }
                // return res.status(constant.httpCode.success).json({
                //     success: true,
                //     code: constant.httpCode.success,
                //     message: constant.message.moneyAddedToWallet,
                //     data: updateUserWallet
                // });
            }
        }
        else{
            constant.function.userNotFound(res);
        }
    }catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMyWalletHistory = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { userId, isAdmin, page, perPage } = req.query;
        console.log(req.query, '    req.query');
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };
        let query, userIdd;
        if(isAdmin == 'true'){
            userIdd = userId;
            query = { user: userId, isDeleted: false };
        }
        else{
            userIdd = loggedInUser;
            query = { user: loggedInUser, isDeleted: false };
        }
        // let walletHistory = await WalletHistory.paginate(query, options);
        // if(walletHistory.docs.length === 0){
        //     constant.function.dataNotFound(res);
        // }
        // else if(walletHistory){
        //     return res.status(constant.httpCode.success).json({
        //         success: true,
        //         code: constant.httpCode.success,
        //         message: constant.message.dataFound,
        //         data: walletHistory
        //     });
        // }
        // else{
        //     constant.function.dataNotFound(res);
        // }

        let activeTransactions = [];

        let transactions = await Transaction.paginate(query, options);
        if(transactions.docs.length === 0){
            // checkActiveTransactions();
            sendResponse();
        }
        else if(transactions){
            // checkActiveTransactions();
            sendResponse();
        }
        else{
            // checkActiveTransactions();
            sendResponse();
        }
        async function checkActiveTransactions(){
            let activeTransaction = await Transaction.find({ user: userIdd, isPaymentDoneFromWallet: false, isDeleted: false });
            if(activeTransaction){
                activeTransactions = activeTransaction;
                sendResponse();
            }
            else{
                sendResponse();
            }
        }

        function sendResponse(){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions,
                activeTransactions: activeTransactions
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getDashboardData = async (req, res) => {
    try {
        let users, managers, parkingLots, transactions, wNines, patrollers, violations, authToken;
        const { page, perPage, sort } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10
        };

        // let userList = await User.paginate({ role: '3', isDeleted: false }, options);
        // let userList = await User.paginate({ $or: [ { isUser: true, isDeleted: false }, { role: '2', "transactions.0": { "$exists": true }, isDeleted: false } ] }, options);
        let userList = await User.paginate({ isUser: true, isDeleted: false }, options);
        if(userList){
            users = userList;
            getManagers();
        }
        else{
            users = {};
            getManagers();
        }

        async function getManagers(){
            let managerList = await User.paginate({ isManager: true, isDeleted: false }, options);
            if(managerList){
                managers = managerList;
                getParkingPlaces();
            }
            else{
                managers = {};
                getParkingPlaces();
            }
        }

        async function getParkingPlaces(){
            let parkingLotsList = await ParkingLot.paginate({ isDeleted: false }, options);
            if(parkingLotsList){
                parkingLots = parkingLotsList;
                getTransactions();
            }
            else{
                parkingLots = {};
                getTransactions();
            }
        }

        async function getTransactions(){
            let transactionList = await Transaction.paginate({ isDeleted: false }, options);
            if(transactionList){
                transactions = transactionList;
                getWNines();
            }
            else{
                transactions = {};
                getWNines();
            }
        }

        async function getWNines(){
            let wNinesList = await Wnine.paginate({ isDeleted: false }, options);
            if(wNinesList){
                wNines = wNinesList;
                getPatrollers();
            }
            else{
                wNines = {};
                getPatrollers();
            }
        }

        async function getPatrollers(){
            let patrollerList = await User.paginate({ isPatroller: true, isDeleted: false }, options);
            if(patrollerList){
                patrollers = patrollerList;
                getViolations();
            }
            else{
                patrollers = {};
                getViolations();
            }
        }

        async function getViolations(){
            let violationList = await Violation.paginate({ isDeleted: false }, options);
            // let violationList = await Violation.paginate({ $or: [{ status: 'booted', isDeleted: false }, { status: 'towed', isDeleted: false }] }, options);
            if(violationList){
                violations = violationList;
                getIntuitToken();
            }
            else{
                violations = {};
                getIntuitToken();
            }
        }

        async function getIntuitToken(){
            let getToken = await AuthToken.findOne({});
            if(getToken){
                authToken = getToken;
                sendResponse();
            }
            else{
                authToken = {};
                sendResponse();
            }
        }

        function sendResponse(){
            let result = {
                users: users,
                managers: managers,
                parkingLots: parkingLots,
                transactions: transactions,
                wNines: wNines,
                patrollers: patrollers,
                violations: violations,
                authToken: authToken
            };
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: result
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createUser = async (req, res) => {
    try {
        console.log(req.body, '  create user req.body');
        const { value, error } = validate.createUser(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { firstName, lastName, email, password, countryCode, mobileNumber, role, isManager } = value;
            let braintreeCustomerId;
            let uniqueId = constant.function.generateShortId();
            let userId = `D-` + uniqueId;
            let hostId = `H-` + uniqueId;
            let patrollerId = `P-` + uniqueId;
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                if(user.length == 0){
                    let result = await gateway.customer.create({ firstName: userId });
                    if(result){
                        braintreeCustomerId = result.customer.id;
                        createNewUser();
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingUser,
                            data: []
                        });
                    }
                }
                else{
                    if(user.length == 2){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                            constant.function.mobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            constant.function.emailAlreadyExistFunction(res);
                        }
                    }
                }
            }
            else{
                constant.function.serverError(res, {});
            }
            // let user = await User.findOne({ email: email, isDeleted: false });
            // if(user){
            //     constant.function.emailAlreadyExistFunction(res);
            // }
            // else{
            //     let result = await gateway.customer.create({});
            //     if(result){
            //         braintreeCustomerId = result.customer.id;
            //         createNewUser();
            //     }
            //     else{
            //         return res.status(constant.httpCode.success).json({
            //             success: false,
            //             code: constant.httpCode.badRequest,
            //             message: constant.message.errorCreatingUser,
            //             data: []
            //         });
            //     }
            // }
            async function createNewUser(){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const activationNumber = constant.function.generateActivationNumber();

                let emailVerificationNumber = constant.function.generateActivationNumber();
                let encryptedEmail = cryptr.encrypt(email);
                let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                const user = new User({
                    userId: userId,
                    hostId: hostId,
                    patrollerId: patrollerId,
                    braintreeCustomerId: braintreeCustomerId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    emailVerificationNumber: emailVerificationNumber,
                    salt: salt,
                    hash: hashed,
                    countryCode: countryCode,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
                    isVerified: true,
                    role: role,
                    isUser: true,
                    isManager: false
                });
                let newUser = await user.save();
                if(!newUser){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingUser,
                        data: []
                    });
                }
                else{

                    constant.function.createCustomerInJira(newUser);

                    let getToken = await AuthToken.findOne({});
                    if(getToken){
                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                        let customerData = constant.function.createCustomerDataForQuickBooks(newUser);
            
                        qbo.createCustomer(customerData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createCustomer in createNewUser');
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id');
                                newUser.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });
                    }
                    else{
                        console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    }

                    let accountType;
                    accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';
                    emailService.createUser(email, password, emailVerificationLink, firstName, accountType, (err, resp) => {
                        if(err){
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorSendingEmail,
                                data: err
                            });
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.userAccountCreatedByAdmin,
                                data: resp
                            });
                        }
                    });
                }
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            // console.log(mongoose.Types.ObjectId.isValid(id));
            let user = await User.findOne({ _id: id, isDeleted: false });
            if(user){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userFound,
                    data: user
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editUser = async (req, res) => {
    try {
        console.log(req.body, '   req.body of editUser');
        let { isMobileChange, isEmailChange } = req.body;
        let { _id, firstName, lastName, email, countryCode, mobileNumber } = req.body.userData;
        let updatedUserData;

        let emailVerificationNumber = constant.function.generateActivationNumber();
        let encryptedEmail = cryptr.encrypt(email);
        let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

        if(isEmailChange){
            updatedUserData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                emailVerificationNumber: emailVerificationNumber,
                isEmailVerified: false,
            };
        }
        else{
            updatedUserData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber
            };  
        }

        if(isMobileChange && isEmailChange){
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                // constant.function.emailAlreadyExistFunction(res);
                if(user.length == 0){
                    updateUser();
                }
                else{
                    if(user.length == 2){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                            constant.function.mobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            constant.function.emailAlreadyExistFunction(res);
                        }
                    }
                }
            }
            else{
                constant.function.serverError(res, {});
            }
        }
        else if(isMobileChange){
            let user = await User.findOne({ countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false });
            if(user){
                constant.function.mobileNumberAlreadyExistFunction(res);
            }
            else{
                updateUser();
            }
        }
        else if(isEmailChange){
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                updateUser();
            }
        }
        else{
            updateUser();
        }

        // if(isEmailChange){
        //     let findEmail = await User.findOne({ email: email, isDeleted: false });
        //     if(findEmail){
        //         constant.function.emailAlreadyExistFunction(res);
        //     }
        //     else{
        //         updateUser();
        //     }
        // }
        // else{
        //     updateUser();
        // }

        async function updateUser(){
            let updateUser = await User.findOneAndUpdate({ _id: _id, isDeleted: false }, { $set: updatedUserData }, { new: true });
            if(updateUser){

                if(isEmailChange){
                    console.log('Change in email by admin');
                    constant.function.createCustomerInJira(updateUser);
                    console.log(emailVerificationLink, '----email verification link');
                    emailService.verifyEmail(email, emailVerificationLink, updateUser.firstName, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });
                }

                let SyncToken = '0';
                let SyncTokenForVendor = '0';
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                    let findW9 = await Wnine.find({ manager: updateUser, isDeleted: false });
                    if(findW9){
                        if(findW9.length > 0){
                            // console.log(findW9, '    findW9');
                            findW9.forEach(element => {
    
                                qbo.getVendor(element.attachableId, function(err, vendor){
                                    if(err){
                                        console.log(err, 'Error updating vendor data in quickbooks online');
                                    }
                                    else{
                                        SyncTokenForVendor = vendor.SyncToken;
                                        setTimeout(function () {
                                            updateWNineInQuickBooks();
                                        }, 1000);
                                    }
                    
                                });
                
                                function updateWNineInQuickBooks(){
                                    qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(element, updateUser, SyncTokenForVendor), function(err, vendor){
                                        if(err){
                                            console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                                        }
                                        else{
                                            console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                                        }
                                    });
                                }
                                
                            });
                        }
                    }
                    else{
                        console.log('No w9 found');
                    }

                    qbo.getCustomer(updateUser.attachableId, function(e, customer){
                        if(customer){
                            // console.log('Start---', customer, '    ---end customers');
                            SyncToken = customer.SyncToken;
                            updateCustomerInQuickBooks();
                        }
                        else{
                            console.log(e, '    error in get customer in qbo');
                        }
                    });
    
                    // qbo.findCustomers({
                    //     // fetchAll: true
                    //     Id: updateUser.attachableId,
                    //   }, function(e, customers){
                    //     // console.log('Start---', customers.QueryResponse.Customer[0], '    ---end customers');
                    //     SyncToken = customers.QueryResponse.Customer[0].SyncToken;
                    //     updateCustomerInQuickBooks();
                    // });
    
                    function updateCustomerInQuickBooks(){
                        qbo.updateCustomer(constant.function.updateCustomerDataInQuickBooks(updateUser, SyncToken), function(err, customer){
                            if(err){
                                console.log(err, '   err in update customer in edit user by admin');
                            }
                            else{
                                console.log(customer, '   update customer in edit user by admin');
                            }
                        });
                    }
    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.driverUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            let deleteUser = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
            if(deleteUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userDeleted,
                    data: []
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   get all users');
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        // sort == 1 ? sortby = { firstName: 1 }: sortby = { email: 1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'transactions' })
        };

        let users = await User.paginate({ _id: { $ne: loggedInUser }, isUser: true, isDeleted: false }, options);
        // let users = await User.paginate({ $or: [ { role: '3', isDeleted: false }, { role: '2', "transactions.0": { "$exists": true }, isDeleted: false } ] }, options);
        if(users){
            if(users.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.usersNotFound,
                    data: []
                });
            }
            else if(users){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.usersFound,
                    data: users
                });
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.usersNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.notFound).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.usersNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.searchUser = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { page, perPage, search } = req.body;
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };
        let usersList = await User.paginate({ $or: [{ userId: { $regex: search, $options: 'i' } }, { firstName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { mobileNumber: { $regex: search, $options: 'i' } }], _id: { $ne: loggedInUser }, isUser: true, isDeleted: false }, options);
        // let usersList = await User.paginate({ $or: [ { userId: { $regex: search, $options: 'i' }}, { firstName: { $regex: search, $options: 'i' }}, { email: { $regex: search, $options: 'i' } }, { mobileNumber: { $regex: search, $options: 'i' }} ], _id: { $ne: loggedInUser }, isDeleted: false }, { $or: [ { role: '3' }, { role: '2', "transactions.0": { "$exists": true } } ] }, options);
        // { $or: [ { role: '3' }, { role: '2', "transactions.0": { "$exists": true } } ] }
        // console.log(usersList, '    usersList');
        if(usersList.docs.length === 0){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.success,
                message: constant.message.usersNotFound,
                data: []
            });
        }
        else if(usersList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.usersFound,
                data: usersList
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.usersNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.activateUser = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            let activateUser = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isActivated: true } }, { new: true });
            if(activateUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: activateUser.firstName + ` account is now activated`,
                    data: []
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.deActivateUser = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            let deActivateUser = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isActivated: false } }, { new: true });
            if(deActivateUser){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: deActivateUser.firstName + ` account is now deactivated`,
                    data: []
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createManager = async (req, res) => {
    try {
        const { value, error } = validate.createManager(req.body);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { firstName, lastName, email, password, countryCode, mobileNumber, role, isManager } = value;
            let braintreeCustomerId;
            let uniqueId = constant.function.generateShortId();
            let userId = `D-` + uniqueId;
            let hostId = `H-` + uniqueId;
            let patrollerId = `P-` + uniqueId;
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                if(user.length == 0){
                    let result = await gateway.customer.create({ firstName: userId });
                    if(result){
                        braintreeCustomerId = result.customer.id;
                        createNewManager();
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingUser,
                            data: []
                        });
                    }
                }
                else{
                    if(user.length == 2){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                            constant.function.mobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            constant.function.emailAlreadyExistFunction(res);
                        }
                    }
                }
            }
            else{
                constant.function.serverError(res, {});
            }
            // let user = await User.findOne({ email: email, isDeleted: false });
            // if(user){
            //     constant.function.emailAlreadyExistFunction(res);
            // }
            // else{
            //     let result = await gateway.customer.create({});
            //     if(result){
            //         braintreeCustomerId = result.customer.id;
            //         createNewManager();
            //     }
            //     else{
            //         return res.status(constant.httpCode.success).json({
            //             success: false,
            //             code: constant.httpCode.badRequest,
            //             message: constant.message.errorCreatingUser,
            //             data: []
            //         });
            //     }
            // }
            async function createNewManager(){
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const activationNumber = constant.function.generateActivationNumber();

                let emailVerificationNumber = constant.function.generateActivationNumber();
                let encryptedEmail = cryptr.encrypt(email);
                let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

                const user = new User({
                    userId: userId,
                    hostId: hostId,
                    patrollerId: patrollerId,
                    braintreeCustomerId: braintreeCustomerId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    emailVerificationNumber: emailVerificationNumber,
                    salt: salt,
                    hash: hashed,
                    countryCode: countryCode,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
                    isVerified: true,
                    role: role,
                    isUser: false,
                    isManager: true
                });
                let newUser = await user.save();
                if(!newUser){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingUser,
                        data: []
                    });
                }
                else{

                    constant.function.createCustomerInJira(newUser);

                    let getToken = await AuthToken.findOne({});
                    if(getToken){
                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                        let customerData = constant.function.createCustomerDataForQuickBooks(newUser);
            
                        qbo.createCustomer(customerData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createCustomer in createNewManager');
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id');
                                newUser.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });
                    }
                    else{
                        console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    }

                    let accountType;
                    accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';
                    emailService.createUser(email, password, emailVerificationLink, firstName, accountType, (err, resp) => {
                        if(err){
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorSendingEmail,
                                data: err
                            });
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.userAccountCreatedByAdmin,
                                data: resp
                            });
                        }
                    });
                }
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getManagerById = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            // console.log(mongoose.Types.ObjectId.isValid(id));
            let user = await User.findOne({ _id: id, isDeleted: false });
            if(user){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userFound,
                    data: user
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editManager = async (req, res) => {
    try {
        console.log(req.body, '   req.body of editManager');
        let { isMobileChange, isEmailChange } = req.body;
        let { _id, firstName, lastName, email, countryCode, mobileNumber } = req.body.userData;
        let updatedUserData;

        let emailVerificationNumber = constant.function.generateActivationNumber();
        let encryptedEmail = cryptr.encrypt(email);
        let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

        if(isEmailChange){
            updatedUserData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                emailVerificationNumber: emailVerificationNumber,
                isEmailVerified: false,
            };
        }
        else{
            updatedUserData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                countryCode: countryCode,
                mobileNumber: mobileNumber
            };
        }

        if(isMobileChange && isEmailChange){
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                // constant.function.emailAlreadyExistFunction(res);
                if(user.length == 0){
                    updateUser();
                }
                else{
                    if(user.length == 2){
                        constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                    }
                    else{
                        if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber) && (user[0].email == email)){
                            constant.function.emailAndMobileNumberAlreadyExistFunction(res);
                        }
                        else if((user[0].countryCode == countryCode) && (user[0].mobileNumber == mobileNumber)){
                            constant.function.mobileNumberAlreadyExistFunction(res);
                        }
                        else{
                            constant.function.emailAlreadyExistFunction(res);
                        }
                    }
                }
            }
            else{
                constant.function.serverError(res, {});
            }
        }
        else if(isMobileChange){
            let user = await User.findOne({ countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false });
            if(user){
                constant.function.mobileNumberAlreadyExistFunction(res);
            }
            else{
                updateUser();
            }
        }
        else if(isEmailChange){
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                updateUser();
            }
        }
        else{
            updateUser();
        }

        // if(isEmailChange){
        //     let findEmail = await User.findOne({ email: email, isDeleted: false });
        //     if(findEmail){
        //         constant.function.emailAlreadyExistFunction(res);
        //     }
        //     else{
        //         updateUser();
        //     }
        // }
        // else{
        //     updateUser();
        // }

        async function updateUser(){
            let updateUser = await User.findOneAndUpdate({ _id: _id, isDeleted: false }, { $set: updatedUserData }, { new: true });
            if(updateUser){

                if(isEmailChange){
                    console.log('Change in email by admin');
                    constant.function.createCustomerInJira(updateUser);
                    console.log(emailVerificationLink, '----email verification link');
                    emailService.verifyEmail(email, emailVerificationLink, updateUser.firstName, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });
                }

                let SyncToken = '0';
                let SyncTokenForVendor = '0';
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                    let findW9 = await Wnine.find({ manager: updateUser, isDeleted: false });
                    if(findW9){
                        if(findW9.length > 0){
                            // console.log(findW9, '    findW9');
                            findW9.forEach(element => {
    
                                qbo.getVendor(element.attachableId, function(err, vendor){
                                    if(err){
                                        console.log(err, 'Error updating vendor data in quickbooks online');
                                    }
                                    else{
                                        SyncTokenForVendor = vendor.SyncToken;
                                        setTimeout(function () {
                                            updateWNineInQuickBooks();
                                        }, 1000);
                                    }
                    
                                });
                
                                function updateWNineInQuickBooks(){
                                    qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(element, updateUser, SyncTokenForVendor), function(err, vendor){
                                        if(err){
                                            console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                                        }
                                        else{
                                            console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                                        }
                                    });
                                }
                                
                            });
                        }
                    }
                    else{
                        console.log('No w9 found');
                    }

                    qbo.getCustomer(updateUser.attachableId, function(e, customer){
                        if(customer){
                            // console.log('Start---', customer, '    ---end customers');
                            SyncToken = customer.SyncToken;
                            updateCustomerInQuickBooks();
                        }
                        else{
                            console.log(e, '    error in get customer in qbo');
                        }
                    });
    
                    // qbo.findCustomers({
                    //     // fetchAll: true
                    //     Id: updateUser.attachableId,
                    //   }, function(e, customers){
                    //     // console.log('Start---', customers.QueryResponse.Customer[0], '    ---end customers');
                    //     SyncToken = customers.QueryResponse.Customer[0].SyncToken;
                    //     updateCustomerInQuickBooks();
                    // });
    
                    function updateCustomerInQuickBooks(){
                        qbo.updateCustomer(constant.function.updateCustomerDataInQuickBooks(updateUser, SyncToken), function(err, customer){
                            if(err){
                                console.log(err, '   err in update customer in edit manager by admin');
                            }
                            else{
                                console.log(customer, '   update customer in edit manager by admin');
                            }
                        });
                    }
    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.hostUpdated,
                    data: updateUser
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.deleteManager = async (req, res) => {
    try {
        const { value, error } = validate.validateId(req.query);
        if(error){
            let errorArray = [];
            error.details.forEach(element => {
                if(element.message){
                    errorArray.push(element.message);
                }
            });
            constant.function.validationError(res, errorArray);
        }
        else{
            let { id } = value;
            let deleteManager = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
            if(deleteManager){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userDeleted,
                    data: []
                });
            }
            else{
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllManagersList = async (req, res) => { // No Pagination used
    try {
        // let managers = await User.find({ role: '2', isDeleted: false });
        let managers = await User.find({ isManager: true, isDeleted: false });
        if(managers){
            if(managers.length === 0){
                constant.function.dataNotFound(res);
            }
            else if(managers){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: managers
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllManagers = async (req, res) => { // Pagination used
    try {
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'transactions' })
        };

        // let users = await User.paginate({ _id: { $ne: loggedInUser }, role: '2', isDeleted: false }, options);
        let users = await User.paginate({ _id: { $ne: loggedInUser }, isManager: true, isDeleted: false }, options);
        if(users){
            if(users.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.usersNotFound,
                    data: []
                });
            }
            else if(users){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.usersFound,
                    data: users
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.usersNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.usersNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.searchManager = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { page, perPage, search } = req.body;
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };
        let managersList = await User.paginate({ $or: [{ hostId: { $regex: search, $options: 'i' } }, { firstName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { mobileNumber: { $regex: search, $options: 'i' } }], _id: { $ne: loggedInUser }, isManager: true, isDeleted: false }, options);
        if(managersList.docs.length === 0){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.success,
                message: constant.message.usersNotFound,
                data: []
            });
        }
        else if(managersList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.usersFound,
                data: managersList
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.usersNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}
