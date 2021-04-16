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

exports.getDashboardDataForManager = async (req, res) => {
    try {
        let parkingLots, transactions, wNines, violations;
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10
        };

        let parkingLotsList = await ParkingLot.paginate({ manager: loggedInUser, isDeleted: false }, options);
        if(parkingLotsList){
            parkingLots = parkingLotsList;
            getTransactions();
        }
        else{
            parkingLots = {};
            getTransactions();
        }

        async function getTransactions(){
            let transactionList = await Transaction.paginate({ manager: loggedInUser, isDeleted: false }, options);
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
            let wNinesList = await Wnine.paginate({ manager: loggedInUser, isDeleted: false }, options);
            if(wNinesList){
                wNines = wNinesList;
                getViolations();
            }
            else{
                wNines = {};
                getViolations();
            }
        }

        async function getViolations(){
            // let violationsList = await Violation.paginate({ manager: loggedInUser, isDeleted: false }, options);
            let violationsList = await Violation.paginate({ $or: [{ manager: loggedInUser, status: 'booted', isDeleted: false }, { manager: loggedInUser, status: 'towed', isDeleted: false }] }, options);
            if(violationsList){
                violations = violationsList;
                sendResponse();
            }
            else{
                violations = {};
                sendResponse();
            }
        }

        function sendResponse(){
            let result = {
                parkingLots: parkingLots,
                transactions: transactions,
                wNines: wNines,
                violations: violations
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

exports.getDashboardDataForPatroller = async (req, res) => {
    try {
        let parkingLots, transactions, violations;
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10
        };

        // let parkingLotsList = await ParkingLot.paginate({ patroller: loggedInUser, isDeleted: false }, options);
        let parkingLotsList = await ParkingLot.paginate({ patroller: loggedInUser, isPatrollerActive: false, isDeleted: false }, options);
        if(parkingLotsList){
            parkingLots = parkingLotsList;
            // getTransactions();
            sendResponse();
        }
        else{
            parkingLots = {};
            // getTransactions();
            sendResponse();
        }

        async function getTransactions(){
            let transactionList = await Transaction.paginate({ manager: loggedInUser, isDeleted: false }, options);
            if(transactionList){
                transactions = transactionList;
                getViolations();
            }
            else{
                transactions = {};
                getViolations();
            }
        }

        async function getViolations(){
            let violationList = await Violation.paginate({ patroller: loggedInUser, isDeleted: false }, options);
            // let violationList = await Violation.paginate({ $or: [{ patroller: loggedInUser, status: 'booted', isDeleted: false }, { patroller: loggedInUser, status: 'towed', isDeleted: false }] }, options);
            if(violationList){
                violations = violationList;
                sendResponse();
            }
            else{
                violations = {};
                sendResponse();
            }
        }

        function sendResponse(){
            let result = {
                parkingLots: parkingLots,
                // transactions: transactions,
                // violations: violations
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

exports.getAllPatrollers = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   get all getAllPatrollers');
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        // sort == 1 ? sortby = { firstName: 1 }: sortby = { email: 1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'transactions' })
        };

        let patrollers = await User.paginate({ _id: { $ne: loggedInUser }, isPatroller: true, isDeleted: false }, options);
        // let patrollers = await User.paginate({ $or: [ { role: '3', isDeleted: false }, { role: '2', "transactions.0": { "$exists": true }, isDeleted: false } ] }, options);
        if(patrollers){
            if(patrollers.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.usersNotFound,
                    data: []
                });
            }
            else if(patrollers){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.usersFound,
                    data: patrollers
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

exports.getAllViolations = async (req, res) => {
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
            // populate: ({ path: 'transactions' })
        };

        let violations = await Violation.paginate({ isDeleted: false }, options);
        // let violations = await Violation.paginate({ $or: [{ status: 'booted', isDeleted: false }, { status: 'towed', isDeleted: false }] }, options);
        if(violations){
            if(violations.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
            else if(violations){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: violations
                });
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
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

exports.searchViolations = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { page, perPage, search, isAdmin, isPatroller } = req.body;
        console.log(req.body, '   req body of searchViolations');

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'manager wNine' })
        };

        let query;
        isAdmin ? query = { $or: [ { zone: { $regex: search, $options: 'i' } }, { violationId: { $regex: search, $options: 'i' } }], isDeleted: false } : isPatroller ? query = { $or: [ { zone: { $regex: search, $options: 'i' } }, { violationId: { $regex: search, $options: 'i' } }], patroller: loggedInUser, isDeleted: false } : query = { $or: [ { zone: { $regex: search, $options: 'i' } }, { violationId: { $regex: search, $options: 'i' } }], manager: loggedInUser, isDeleted: false };

        // let violationList = await Violation.paginate(query, options);
        let violationList = await Violation.paginate(query, options);
        if(violationList.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(violationList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: violationList
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMyViolations = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   get all users');
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        // sort == 1 ? sortby = { firstName: 1 }: sortby = { email: 1 };
        const options = {
            // sort: { createdAt: -1 },
            sort: { sortStatus: 1, createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'transactions' })
        };

        let violations = await Violation.paginate({ patroller: loggedInUser, isDeleted: false }, options);
        // let violations = await Violation.paginate({ $or: [{ patroller: loggedInUser, status: 'booted', isDeleted: false }, { patroller: loggedInUser, status: 'towed', isDeleted: false }] }, options);
        if(violations){
            if(violations.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
            else if(violations){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: violations
                });
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.notFound).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getViolationsForManager = async (req, res) => {
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
            // populate: ({ path: 'transactions' })
        };

        // let violations = await Violation.paginate({ manager: loggedInUser, isDeleted: false }, options);
        let violations = await Violation.paginate({ $or: [{ manager: loggedInUser, status: 'booted', isDeleted: false }, { manager: loggedInUser, status: 'towed', isDeleted: false }] }, options);
        if(violations){
            if(violations.docs.length === 0){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.success,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
            else if(violations){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: violations
                });
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.notFound).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createParkingLot = async (req, res) => {
    try {
        // console.log(mongoose.Types.ObjectId.isValid(id));
        // console.log(req.body, '  req.body of createParkingLot');

        // const { value, error } = validate.validateParkingLot(req.body);
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

        let isPreviousWNineAttachedToLocation = req.body.isPreviousWNineAttachedToLocation;

        // return res.status(constant.httpCode.success).json({
        //     success: true,
        //     code: constant.httpCode.success,
        //     message: 'yoo',
        //     data: isPreviousWNineAttachedToLocation
        // });

        let {
            wNine,
            bestWayToDescribeThisLocation,
            isParkingSpotsCoveredOrUncovered,
            isPayToParkSpacesDesignatedOrUnspecified,
            parkingLotName,
            latitude,
            longitude,
            address,
            streetNumber,
            route,
            city,
            state,
            postalCode,
            totalSpaces,
            parkingFee,
            // convenienceFee,
            maxHours,
            isLocationHavingApartment,
            apartmentNumber,

            isCustomizeWeeklyParkingFee,

            parkingFeeSunday,
            chargeTimeStartSunday,
            chargeTimeEndSunday,
            isAddFreeTimeSunday,
            freeTimeStartSunday,
            freeTimeEndSunday,
            isAddFreeTimeSundaySecond,
            freeTimeStartSundaySecond,
            freeTimeEndSundaySecond,

            parkingFeeMonday,
            chargeTimeStartMonday,
            chargeTimeEndMonday,
            isAddFreeTimeMonday,
            freeTimeStartMonday,
            freeTimeEndMonday,
            isAddFreeTimeMondaySecond,
            freeTimeStartMondaySecond,
            freeTimeEndMondaySecond,

            parkingFeeTuesday,
            chargeTimeStartTuesday,
            chargeTimeEndTuesday,
            isAddFreeTimeTuesday,
            freeTimeStartTuesday,
            freeTimeEndTuesday,
            isAddFreeTimeTuesdaySecond,
            freeTimeStartTuesdaySecond,
            freeTimeEndTuesdaySecond,

            parkingFeeWednesday,
            chargeTimeStartWednesday,
            chargeTimeEndWednesday,
            isAddFreeTimeWednesday,
            freeTimeStartWednesday,
            freeTimeEndWednesday,
            isAddFreeTimeWednesdaySecond,
            freeTimeStartWednesdaySecond,
            freeTimeEndWednesdaySecond,

            parkingFeeThursday,
            chargeTimeStartThursday,
            chargeTimeEndThursday,
            isAddFreeTimeThursday,
            freeTimeStartThursday,
            freeTimeEndThursday,
            isAddFreeTimeThursdaySecond,
            freeTimeStartThursdaySecond,
            freeTimeEndThursdaySecond,

            parkingFeeFriday,
            chargeTimeStartFriday,
            chargeTimeEndFriday,
            isAddFreeTimeFriday,
            freeTimeStartFriday,
            freeTimeEndFriday,
            isAddFreeTimeFridaySecond,
            freeTimeStartFridaySecond,
            freeTimeEndFridaySecond,

            parkingFeeSaturday,
            chargeTimeStartSaturday,
            chargeTimeEndSaturday,
            isAddFreeTimeSaturday,
            freeTimeStartSaturday,
            freeTimeEndSaturday,
            isAddFreeTimeSaturdaySecond,
            freeTimeStartSaturdaySecond,
            freeTimeEndSaturdaySecond,
        } = req.body.parkingLotData;


        let {
            earningToVendor,
            earningToAdmin,
            w9name,
            w9firstName,
            w9middleName,
            w9lastName,
            w9businessName,
            w9irsTaxClassification,
            w9individualSoleProprietorOrSingleMemberLlc,
            w9cCorporation,
            w9sCorporation,
            w9partnership,
            w9trustEstate,
            w9limitedLiabilityCompanyEnterTaxClassification,
            w9limitedLiabilityCompanyEnterTaxClassificationInput,
            w9LlcCCorporation,
            w9LlcSCorporation,
            w9LlcPartnership,
            w9other,
            w9otherInput,
            w9exemptPayeeCode,
            w9exemptionFromFatcaReportingCode,
            w9address,
            w9city,
            w9state,
            w9zipcode,
            w9accountNumbers,
            w9selectTaxId,
            w9isSsnFilled,
            w9socialSecurityNumber,
            w9employerIdentificationNumber,
            bankName,
            accountNameAttachedTo,
            accountNickName,
            routingNumber,
            accountNumber,
            confirmAccountNumber,
            acceptTerms,
            acceptTermsTime,
        } = req.body.wNineData;

        let manager, zoneNumber;
        manager = req.body.parkingLotData.manager ? req.body.parkingLotData.manager : req.user._id;
        let loggedInUser = req.user._id;

        let lastParkingLot = await ParkingLot.findOne({}).sort({ createdAt: -1 });
        if(!lastParkingLot){
            zoneNumber = 100001;
            createParkingLot();
        }
        else{
            // zoneNumber = parseInt(lastParkingLot.zone) + 1;
            // createParkingLot();
            var num = 0;
            generateRandomNumber();
            
            async function generateRandomNumber(){
                zoneNumber = constant.function.generateSixDigitNumber();
                let findZone = await ParkingLot.findOne({ zone: zoneNumber });
                if(findZone){
                    num++;
                    if(num == 10){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingParkingSpace,
                            data: []
                        });
                    }
                    else{
                        generateRandomNumber();
                    }
                }
                else{
                    createParkingLot();
                }
            }
        }

        async function createParkingLot(){
            const parkingLot = new ParkingLot({
                wNine: wNine ? wNine : null,
                manager: manager,
                bestWayToDescribeThisLocation: bestWayToDescribeThisLocation,
                isParkingSpotsCoveredOrUncovered: isParkingSpotsCoveredOrUncovered,
                isPayToParkSpacesDesignatedOrUnspecified: isPayToParkSpacesDesignatedOrUnspecified,
                parkingLotName: parkingLotName,
                latitude: latitude,
                longitude: longitude,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                address: address,
                streetNumber: streetNumber,
                route: route,
                city: city,
                state: state,
                postalCode: postalCode,
                zone: zoneNumber,
                totalSpaces: totalSpaces,
                spacesAvailable: totalSpaces,
                parkingFee: parkingFee,
                // convenienceFee: convenienceFee,
                maxHours: maxHours,
                isLocationHavingApartment: isLocationHavingApartment,
                apartmentNumber: apartmentNumber,

                isCustomizeWeeklyParkingFee: isCustomizeWeeklyParkingFee,

                // parkingFeeSunday: parkingFeeSunday,
                chargeTimeStartSunday: 'T' + chargeTimeStartSunday,
                chargeTimeEndSunday: 'T' + chargeTimeEndSunday,
                isAddFreeTimeSunday: isAddFreeTimeSunday,
                freeTimeStartSunday: 'T' + freeTimeStartSunday,
                freeTimeEndSunday: 'T' + freeTimeEndSunday,
                isAddFreeTimeSundaySecond: isAddFreeTimeSundaySecond,
                freeTimeStartSundaySecond: 'T' + freeTimeStartSundaySecond,
                freeTimeEndSundaySecond: 'T' + freeTimeEndSundaySecond,

                // parkingFeeMonday: parkingFeeMonday,
                chargeTimeStartMonday: 'T' + chargeTimeStartMonday,
                chargeTimeEndMonday: 'T' + chargeTimeEndMonday,
                isAddFreeTimeMonday: isAddFreeTimeMonday,
                freeTimeStartMonday: 'T' + freeTimeStartMonday,
                freeTimeEndMonday: 'T' + freeTimeEndMonday,
                isAddFreeTimeMondaySecond: isAddFreeTimeMondaySecond,
                freeTimeStartMondaySecond: 'T' + freeTimeStartMondaySecond,
                freeTimeEndMondaySecond: 'T' + freeTimeEndMondaySecond,

                // parkingFeeTuesday: parkingFeeTuesday,
                chargeTimeStartTuesday: 'T' + chargeTimeStartTuesday,
                chargeTimeEndTuesday: 'T' + chargeTimeEndTuesday,
                isAddFreeTimeTuesday: isAddFreeTimeTuesday,
                freeTimeStartTuesday: 'T' + freeTimeStartTuesday,
                freeTimeEndTuesday: 'T' + freeTimeEndTuesday,
                isAddFreeTimeTuesdaySecond: isAddFreeTimeTuesdaySecond,
                freeTimeStartTuesdaySecond: 'T' + freeTimeStartTuesdaySecond,
                freeTimeEndTuesdaySecond: 'T' + freeTimeEndTuesdaySecond,

                // parkingFeeWednesday: parkingFeeWednesday,
                chargeTimeStartWednesday: 'T' + chargeTimeStartWednesday,
                chargeTimeEndWednesday: 'T' + chargeTimeEndWednesday,
                isAddFreeTimeWednesday: isAddFreeTimeWednesday,
                freeTimeStartWednesday: 'T' + freeTimeStartWednesday,
                freeTimeEndWednesday: 'T' + freeTimeEndWednesday,
                isAddFreeTimeWednesdaySecond: isAddFreeTimeWednesdaySecond,
                freeTimeStartWednesdaySecond: 'T' + freeTimeStartWednesdaySecond,
                freeTimeEndWednesdaySecond: 'T' + freeTimeEndWednesdaySecond,

                // parkingFeeThursday: parkingFeeThursday,
                chargeTimeStartThursday: 'T' + chargeTimeStartThursday,
                chargeTimeEndThursday: 'T' + chargeTimeEndThursday,
                isAddFreeTimeThursday: isAddFreeTimeThursday,
                freeTimeStartThursday: 'T' + freeTimeStartThursday,
                freeTimeEndThursday: 'T' + freeTimeEndThursday,
                isAddFreeTimeThursdaySecond: isAddFreeTimeThursdaySecond,
                freeTimeStartThursdaySecond: 'T' + freeTimeStartThursdaySecond,
                freeTimeEndThursdaySecond: 'T' + freeTimeEndThursdaySecond,

                // parkingFeeFriday: parkingFeeFriday,
                chargeTimeStartFriday: 'T' + chargeTimeStartFriday,
                chargeTimeEndFriday: 'T' + chargeTimeEndFriday,
                isAddFreeTimeFriday: isAddFreeTimeFriday,
                freeTimeStartFriday: 'T' + freeTimeStartFriday,
                freeTimeEndFriday: 'T' + freeTimeEndFriday,
                isAddFreeTimeFridaySecond: isAddFreeTimeFridaySecond,
                freeTimeStartFridaySecond: 'T' + freeTimeStartFridaySecond,
                freeTimeEndFridaySecond: 'T' + freeTimeEndFridaySecond,

                // parkingFeeSaturday: parkingFeeSaturday,
                chargeTimeStartSaturday: 'T' + chargeTimeStartSaturday,
                chargeTimeEndSaturday: 'T' + chargeTimeEndSaturday,
                isAddFreeTimeSaturday: isAddFreeTimeSaturday,
                freeTimeStartSaturday: 'T' + freeTimeStartSaturday,
                freeTimeEndSaturday: 'T' + freeTimeEndSaturday,
                isAddFreeTimeSaturdaySecond: isAddFreeTimeSaturdaySecond,
                freeTimeStartSaturdaySecond: 'T' + freeTimeStartSaturdaySecond,
                freeTimeEndSaturdaySecond: 'T' + freeTimeEndSaturdaySecond,
            });

            let newParkingLot = await parkingLot.save();
            if(!newParkingLot){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.errorCreatingParkingSpace,
                    data: []
                });
            }
            else{


                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
    
                    let locationData = constant.function.createLocationDataForQuickBooks(newParkingLot);

                    qbo.createClass(locationData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in createClass in user controller');
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id of new location that is Class in QBO');
                            newParkingLot.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
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


                if(isPreviousWNineAttachedToLocation){
                    let user = await User.findOne({ _id: manager, isDeleted: false });
                    if(user){
                        user.parkingLots.push(newParkingLot);
                        user.save();
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.parkingSpaceCreated,
                            data: []
                        });
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.parkingSpaceCreated,
                            data: []
                        });
                    }
                }
                else{
                    let wNine = new Wnine({
                        w9Id: w9isSsnFilled ? `S` + constant.function.generateShortId() : `E` + constant.function.generateShortId(),
                        manager: manager,
                        earningToVendor: earningToVendor,
                        earningToAdmin: earningToAdmin,
                        w9name: w9name,
                        w9firstName: w9firstName,
                        w9middleName: w9middleName,
                        w9lastName: w9lastName,
                        w9businessName: w9businessName,
                        w9irsTaxClassification: w9irsTaxClassification,
                        w9individualSoleProprietorOrSingleMemberLlc: w9individualSoleProprietorOrSingleMemberLlc,
                        w9cCorporation: w9cCorporation,
                        w9sCorporation: w9sCorporation,
                        w9partnership: w9partnership,
                        w9trustEstate: w9trustEstate,
                        w9limitedLiabilityCompanyEnterTaxClassification: w9limitedLiabilityCompanyEnterTaxClassification,
                        w9limitedLiabilityCompanyEnterTaxClassificationInput: w9limitedLiabilityCompanyEnterTaxClassificationInput,
                        w9LlcCCorporation: w9LlcCCorporation,
                        w9LlcSCorporation: w9LlcSCorporation,
                        w9LlcPartnership: w9LlcPartnership,
                        w9other: w9other,
                        w9otherInput: w9otherInput,
                        w9exemptPayeeCode: w9exemptPayeeCode,
                        w9exemptionFromFatcaReportingCode: w9exemptionFromFatcaReportingCode,
                        w9address: w9address,
                        w9city: w9city,
                        w9state: w9state,
                        w9zipcode: w9zipcode,
                        w9accountNumbers: w9accountNumbers,
                        w9selectTaxId: w9selectTaxId,
                        w9isSsnFilled: w9isSsnFilled,
                        w9socialSecurityNumber: cryptr.encrypt(w9socialSecurityNumber),
                        w9employerIdentificationNumber: cryptr.encrypt(w9employerIdentificationNumber),
                        bankName: bankName,
                        accountNameAttachedTo: accountNameAttachedTo,
                        accountNickName: accountNickName,
                        routingNumber: routingNumber,
                        accountNumber: accountNumber,
                        confirmAccountNumber: confirmAccountNumber,
                        acceptTerms: acceptTerms,
                        acceptTermsTime: acceptTermsTime,
                    });

                    let newWNine = await wNine.save();
                    if(!newWNine){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorCreatingParkingSpace,
                            data: []
                        });
                    }
                    else{
                        newParkingLot.update({ $set: { wNine: newWNine } }, (reject, resolve) => {
                            if(resolve){
                                return;
                            }
                            else{
                                return;
                            }
                        });

                        let user = await User.findOne({ _id: manager, isDeleted: false });
                        if(user){
                            user.parkingLots.push(newParkingLot);
                            user.save();

                            let getToken = await AuthToken.findOne({});
                            if(getToken){
                                let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
                
                                let vendorData = constant.function.createVendorDataForQuickBooks(newWNine, user);
    
                                qbo.createVendor(vendorData, function(err, attachable){
                                    if(err){
                                        console.log(err, '   err in createVendor in user controller');
                                    }
                                    else{
                                        console.log(attachable.Id, '   attachable.Id');
                                        newWNine.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
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

                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.parkingSpaceCreated,
                                data: []
                            });
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.parkingSpaceCreated,
                                data: []
                            });
                        }
                        // emailService.createParkingLot(email, password, firstName, accountType, (err,resp)=>{
                        //     if(err){
                        //         return res.status(constant.httpCode.success).json({
                        //             success: false,
                        //             code: constant.httpCode.badRequest,
                        //             message: constant.message.errorSendingEmail,
                        //             data: err
                        //         });
                        //     }
                        //     else{
                        //         return res.status(constant.httpCode.success).json({
                        //             success: true,
                        //             code: constant.httpCode.success,
                        //             message: constant.message.parkingSpaceCreated,
                        //             data: []
                        //         });
                        //     }
                        // });
                    }
                }
            }
        }
        // }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editParkingLot = async (req, res) => {
    try {
        // console.log(req.body, '      req.body of edit parking');
        // return res.status(200).json({
        //     success: true,
        //     code: 200,
        //     message: 'Success',
        //     data: []
        // });
        let {
            wNine,
            _id,
            manager,
            bestWayToDescribeThisLocation,
            isParkingSpotsCoveredOrUncovered,
            isPayToParkSpacesDesignatedOrUnspecified,
            parkingLotName,
            latitude,
            longitude,
            address,
            streetNumber,
            route,
            city,
            state,
            postalCode,
            zone,
            totalSpaces,
            spacesAvailable,
            parkingFee,
            // convenienceFee,
            maxHours,
            isLocationHavingApartment,
            apartmentNumber,

            isCustomizeWeeklyParkingFee,

            parkingFeeSunday,
            chargeTimeStartSunday,
            chargeTimeEndSunday,
            isAddFreeTimeSunday,
            freeTimeStartSunday,
            freeTimeEndSunday,
            isAddFreeTimeSundaySecond,
            freeTimeStartSundaySecond,
            freeTimeEndSundaySecond,

            parkingFeeMonday,
            chargeTimeStartMonday,
            chargeTimeEndMonday,
            isAddFreeTimeMonday,
            freeTimeStartMonday,
            freeTimeEndMonday,
            isAddFreeTimeMondaySecond,
            freeTimeStartMondaySecond,
            freeTimeEndMondaySecond,

            parkingFeeTuesday,
            chargeTimeStartTuesday,
            chargeTimeEndTuesday,
            isAddFreeTimeTuesday,
            freeTimeStartTuesday,
            freeTimeEndTuesday,
            isAddFreeTimeTuesdaySecond,
            freeTimeStartTuesdaySecond,
            freeTimeEndTuesdaySecond,

            parkingFeeWednesday,
            chargeTimeStartWednesday,
            chargeTimeEndWednesday,
            isAddFreeTimeWednesday,
            freeTimeStartWednesday,
            freeTimeEndWednesday,
            isAddFreeTimeWednesdaySecond,
            freeTimeStartWednesdaySecond,
            freeTimeEndWednesdaySecond,

            parkingFeeThursday,
            chargeTimeStartThursday,
            chargeTimeEndThursday,
            isAddFreeTimeThursday,
            freeTimeStartThursday,
            freeTimeEndThursday,
            isAddFreeTimeThursdaySecond,
            freeTimeStartThursdaySecond,
            freeTimeEndThursdaySecond,

            parkingFeeFriday,
            chargeTimeStartFriday,
            chargeTimeEndFriday,
            isAddFreeTimeFriday,
            freeTimeStartFriday,
            freeTimeEndFriday,
            isAddFreeTimeFridaySecond,
            freeTimeStartFridaySecond,
            freeTimeEndFridaySecond,

            parkingFeeSaturday,
            chargeTimeStartSaturday,
            chargeTimeEndSaturday,
            isAddFreeTimeSaturday,
            freeTimeStartSaturday,
            freeTimeEndSaturday,
            isAddFreeTimeSaturdaySecond,
            freeTimeStartSaturdaySecond,
            freeTimeEndSaturdaySecond,

            isActivated,
            isDeactivatedByAdmin,
            isAdmin
        } = req.body;
        // console.log(req.body, '  req.body of edit parking lot');

        let updatedData = {
            wNine: wNine,
            _id: _id,
            manager: manager,
            bestWayToDescribeThisLocation: bestWayToDescribeThisLocation,
            isParkingSpotsCoveredOrUncovered: isParkingSpotsCoveredOrUncovered,
            isPayToParkSpacesDesignatedOrUnspecified: isPayToParkSpacesDesignatedOrUnspecified,
            parkingLotName: parkingLotName,
            latitude: latitude,
            longitude: longitude,
            location: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            address: address,
            streetNumber: streetNumber,
            route: route,
            city: city,
            state: state,
            postalCode: postalCode,
            zone: zone,
            totalSpaces: totalSpaces,
            parkingFee: parkingFee,
            // convenienceFee: convenienceFee,
            maxHours: maxHours,
            isLocationHavingApartment: isLocationHavingApartment,
            apartmentNumber: apartmentNumber,
            spacesAvailable: spacesAvailable,

            isCustomizeWeeklyParkingFee: isCustomizeWeeklyParkingFee,

            // parkingFeeSunday: parkingFeeSunday,
            chargeTimeStartSunday: 'T' + chargeTimeStartSunday,
            chargeTimeEndSunday: 'T' + chargeTimeEndSunday,
            isAddFreeTimeSunday: isAddFreeTimeSunday,
            freeTimeStartSunday: 'T' + freeTimeStartSunday,
            freeTimeEndSunday: 'T' + freeTimeEndSunday,
            isAddFreeTimeSundaySecond: isAddFreeTimeSundaySecond,
            freeTimeStartSundaySecond: 'T' + freeTimeStartSundaySecond,
            freeTimeEndSundaySecond: 'T' + freeTimeEndSundaySecond,

            // parkingFeeMonday: parkingFeeMonday,
            chargeTimeStartMonday: 'T' + chargeTimeStartMonday,
            chargeTimeEndMonday: 'T' + chargeTimeEndMonday,
            isAddFreeTimeMonday: isAddFreeTimeMonday,
            freeTimeStartMonday: 'T' + freeTimeStartMonday,
            freeTimeEndMonday: 'T' + freeTimeEndMonday,
            isAddFreeTimeMondaySecond: isAddFreeTimeMondaySecond,
            freeTimeStartMondaySecond: 'T' + freeTimeStartMondaySecond,
            freeTimeEndMondaySecond: 'T' + freeTimeEndMondaySecond,

            // parkingFeeTuesday: parkingFeeTuesday,
            chargeTimeStartTuesday: 'T' + chargeTimeStartTuesday,
            chargeTimeEndTuesday: 'T' + chargeTimeEndTuesday,
            isAddFreeTimeTuesday: isAddFreeTimeTuesday,
            freeTimeStartTuesday: 'T' + freeTimeStartTuesday,
            freeTimeEndTuesday: 'T' + freeTimeEndTuesday,
            isAddFreeTimeTuesdaySecond: isAddFreeTimeTuesdaySecond,
            freeTimeStartTuesdaySecond: 'T' + freeTimeStartTuesdaySecond,
            freeTimeEndTuesdaySecond: 'T' + freeTimeEndTuesdaySecond,

            // parkingFeeWednesday: parkingFeeWednesday,
            chargeTimeStartWednesday: 'T' + chargeTimeStartWednesday,
            chargeTimeEndWednesday: 'T' + chargeTimeEndWednesday,
            isAddFreeTimeWednesday: isAddFreeTimeWednesday,
            freeTimeStartWednesday: 'T' + freeTimeStartWednesday,
            freeTimeEndWednesday: 'T' + freeTimeEndWednesday,
            isAddFreeTimeWednesdaySecond: isAddFreeTimeWednesdaySecond,
            freeTimeStartWednesdaySecond: 'T' + freeTimeStartWednesdaySecond,
            freeTimeEndWednesdaySecond: 'T' + freeTimeEndWednesdaySecond,

            // parkingFeeThursday: parkingFeeThursday,
            chargeTimeStartThursday: 'T' + chargeTimeStartThursday,
            chargeTimeEndThursday: 'T' + chargeTimeEndThursday,
            isAddFreeTimeThursday: isAddFreeTimeThursday,
            freeTimeStartThursday: 'T' + freeTimeStartThursday,
            freeTimeEndThursday: 'T' + freeTimeEndThursday,
            isAddFreeTimeThursdaySecond: isAddFreeTimeThursdaySecond,
            freeTimeStartThursdaySecond: 'T' + freeTimeStartThursdaySecond,
            freeTimeEndThursdaySecond: 'T' + freeTimeEndThursdaySecond,

            // parkingFeeFriday: parkingFeeFriday,
            chargeTimeStartFriday: 'T' + chargeTimeStartFriday,
            chargeTimeEndFriday: 'T' + chargeTimeEndFriday,
            isAddFreeTimeFriday: isAddFreeTimeFriday,
            freeTimeStartFriday: 'T' + freeTimeStartFriday,
            freeTimeEndFriday: 'T' + freeTimeEndFriday,
            isAddFreeTimeFridaySecond: isAddFreeTimeFridaySecond,
            freeTimeStartFridaySecond: 'T' + freeTimeStartFridaySecond,
            freeTimeEndFridaySecond: 'T' + freeTimeEndFridaySecond,

            // parkingFeeSaturday: parkingFeeSaturday,
            chargeTimeStartSaturday: 'T' + chargeTimeStartSaturday,
            chargeTimeEndSaturday: 'T' + chargeTimeEndSaturday,
            isAddFreeTimeSaturday: isAddFreeTimeSaturday,
            freeTimeStartSaturday: 'T' + freeTimeStartSaturday,
            freeTimeEndSaturday: 'T' + freeTimeEndSaturday,
            isAddFreeTimeSaturdaySecond: isAddFreeTimeSaturdaySecond,
            freeTimeStartSaturdaySecond: 'T' + freeTimeStartSaturdaySecond,
            freeTimeEndSaturdaySecond: 'T' + freeTimeEndSaturdaySecond,

            isActivated: isActivated,
            isDeactivatedByAdmin: isDeactivatedByAdmin

        };

        // let query;
        // let loggedInUser = req.user._id;

        // if(isAdmin){
        //     query = { _id: mongoose.Types.ObjectId(_id), isDeleted: false }, { $set: updatedData }, { new: true };
        // }
        // else{
        //     query = { _id: mongoose.Types.ObjectId(_id), manager: mongoose.Types.ObjectId(loggedInUser), isDeleted: false }, { $set: updatedData }, { new: true };
        // }

        let updateParkingLot = await ParkingLot.findOneAndUpdate({ _id: _id, isDeleted: false }, { $set: updatedData }, { new: true });
        // let updateParkingLot = await ParkingLot.findOneAndUpdate(query);
        if(updateParkingLot){


            let SyncToken = '0';
            let getToken = await AuthToken.findOne({});
            if(getToken){
                let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                qbo.getClass(updateParkingLot.attachableId, function(err, location){
                    if(err){
                        console.log(err, 'Error updating location data in quickbooks online');
                    }
                    else{
                        SyncToken = location.SyncToken;
                        updateLocationInQuickBooks();
                    }
    
                });

                function updateLocationInQuickBooks(){
                    qbo.updateClass(constant.function.updateLocationDataInQuickBooks(updateParkingLot, SyncToken), function(err, location){
                        if(err){
                            console.log(err, '   err in update location in updateClass');
                        }
                        else{
                            console.log(location, '   updated location in updateClass');
                        }
                    });
                }

            }
            else{
                console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
            }            


            socket_controller.getParkingLot(updateParkingLot._id);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.parkingSpaceUpdated,
                data: updateParkingLot
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.activateParkingLot = async (req, res) => {
    try {
        console.log(req.query, '     req.query of activateParkingLot');
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
        // let { id, isAdmin } = value;
        let { id, isAdmin } = req.query;
        let activateParkingLot = await ParkingLot.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isActivated: true, isDeactivatedByAdmin: false } }, { new: true });
        if(activateParkingLot){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: `'${activateParkingLot.parkingLotName}' location is now activated`,
                data: []
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

exports.deActivateParkingLot = async (req, res) => {
    try {
        console.log(req.query, '     req.query of deActivateParkingLot');
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
        // let { id, isAdmin } = value;
        let { id, isAdmin } = req.query;
        let set;
        isAdmin == 'true' ? set = { $set: { isDeactivatedByAdmin: true, isActivated: false } } : set = { $set: { isActivated: false } };
        let deActivateParkingLot = await ParkingLot.findOneAndUpdate({ _id: id, isDeleted: false }, set, { new: true });
        if(deActivateParkingLot){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: `'${deActivateParkingLot.parkingLotName}' location is now deactivated`,
                data: []
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

exports.getAllParkingLots = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req.body of getAllParkingLots');
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'manager wNine' })
        };

        let parkingLots = await ParkingLot.paginate({ isDeleted: false }, options);
        if(parkingLots.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLots){
            let sum = await ParkingLot.aggregate([{ $match: { isDeleted: false } }, { $group: { _id: null, totalSpaces: { $sum: "$totalSpaces" }, spacesAvailable: { $sum: "$spacesAvailable" } } }]);
            if(sum){
                // console.log(sum[0], 'sum');
                let totalSpaces = sum[0].totalSpaces;
                let spacesAvailable = sum[0].spacesAvailable;
                let spacesBooked = totalSpaces - spacesAvailable;
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: parkingLots,
                    totalSpaces: totalSpaces,
                    spacesAvailable: spacesAvailable,
                    spacesBooked: spacesBooked,
                });
            }
            else{
                constant.function.serverError(res, {});
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotsForPatrollerRequest = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req.body of getParkingLotsForPatrollerRequest');

        let parkingLots = await ParkingLot.find({
            manager: loggedInUser,
            isPatrollerRequested: false,
            isPatrollerPending: false,
            isPatrollerActive: false,
            isDeleted: false
        });
        if(parkingLots.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLots){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLots
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.makeRequestForPatroller = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '   req.body of makeRequestForPatroller');

        let { location, patroller } = req.body;
        
        let findPatroller = await User.findOne({ _id: patroller, isPatroller: true, isDeleted: false });
        if(findPatroller){

            // let findLocation = await ParkingLot.findOne({ zone: location, isDeleted: false });
            let findLocation = await ParkingLot.findOneAndUpdate({ zone: location, isDeleted: false }, { $set: { patroller: findPatroller, isPatrollerRequested: true, patrollerAssignedStatus: 'requested', patrollerRequestedDate: moment.utc().format() } }, { new: true });
            if(findLocation){

                let distance;
                let x;
                let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                request(link, function (error, response, body){
                    // console.log('error:', error);
                    // console.log('response -- :', response, ': -- response');
                    console.log('statusCode:', response.statusCode);
                    console.log('body:', body);
                    x = JSON.parse(body);
                    console.log('Distance: ', x.rows[0].elements[0].distance.text);
                    if(x.status == 'OK'){
                        distance = x.rows[0].elements[0].distance.text;
                        requestPatroller();
                    }
                    else{
                        distance = 0;
                        requestPatroller();
                    }
                });

                function requestPatroller() {
                    emailService.requestForPatroller(findLocation, findPatroller, distance, (err, resp) => {
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
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.patrollerRequestSent,
                    data: []
                });
            }
            else{
                constant.function.dataNotFound(res);
            }

        }
        else{
            constant.function.dataNotFound(res);
        }

        constant.function.dataNotFound(res);
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMyParkingLots = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'manager wNine' })
        };

        let parkingLots = await ParkingLot.paginate({ manager: loggedInUser, isDeleted: false }, options);
        if(parkingLots.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLots){
            let sum = await ParkingLot.aggregate([{ $match: { manager: mongoose.Types.ObjectId(loggedInUser), isDeleted: false } }, { $group: { _id: null, totalSpaces: { $sum: "$totalSpaces" }, spacesAvailable: { $sum: "$spacesAvailable" } } }]);
            if(sum){
                // console.log(sum, 'sum');
                let totalSpaces = sum[0].totalSpaces;
                let spacesAvailable = sum[0].spacesAvailable;
                let spacesBooked = totalSpaces - spacesAvailable;
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: parkingLots,
                    totalSpaces: totalSpaces,
                    spacesAvailable: spacesAvailable,
                    spacesBooked: spacesBooked,
                });
            }
            else{
                constant.function.serverError(res, {});
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getPatrollerParkingLots = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'manager wNine violations' })
            populate: ([{ path: 'violations', match: { status: 'booted' } }, { path: 'transactions', match: { isParkingTransaction: true, isCompleted: false } }])
        };

        let parkingLots = await ParkingLot.paginate({ patroller: loggedInUser, isDeleted: false }, options);
        if(parkingLots.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLots){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLots
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getPatrollerActiveParkingLots = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'manager wNine violations' })
            populate: ([{ path: 'violations', match: { status: 'booted' } }, { path: 'transactions', match: { isParkingTransaction: true, isCompleted: false } }])
        };

        let parkingLots = await ParkingLot.paginate({ patroller: loggedInUser, isPatrollerActive: true, isDeleted: false }, options);
        if(parkingLots.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLots){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLots
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.acceptPatrollerRequest = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { location } = req.body;

        let parkingLot = await ParkingLot.findOneAndUpdate({ _id: location, patroller: loggedInUser, isDeleted: false }, { $set: { patrollerAssignedStatus: 'pending', isPatrollerRequested: false, isPatrollerPending: true, patrollerPendingDate: moment.utc().format() } }, { new: true }).populate('manager patroller');
        if(parkingLot){

            let patrollerLog = {
                date: moment.utc().format(),
                isRequestAccepted: true,
                patroller: parkingLot.patroller,
                patrollerEmail: parkingLot.patroller.email,
                patrollerId: parkingLot.patroller.patrollerId,
                companyName: parkingLot.patroller.companyName,
                statusChangedFrom: '',
                statusChangedTo: 'pending',
                currentstatus: 'pending'
            };
            let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: parkingLot, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
            if(findUpdatePatrollerLog){
                console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');

                let previousDescription = '';
                // let description = `* Request accepted by ${parkingLot.patroller.email} (${parkingLot.patroller.patrollerId}).`;
                let description = `* Request Accepted: ${parkingLot.patroller.patrollerId} ${parkingLot.patroller.companyName}.`;
                let textToPrint = '';

                let id = findUpdatePatrollerLog.jiraIssueKeyId;
                let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                request( addCommentJson, (error, response, body) => {
                    console.log(error, '    error of addCommentJson');
                    console.log(response.statusCode, '    response.statusCode of addCommentJson');
                    // console.log(response, '    response of addCommentJson');
                    console.log(body, '    body of addCommentJson');
                    if(response.statusCode == 201){
                        constant.function.updatePatrollerTransition(id, '91');
                    }
                });

                // let getJiraIssueUrl = {
                //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                //     auth: constant.jiraCredentials.auth,
                //     method: 'GET',
                //     body: {},
                //     json: true
                // };
                // request( getJiraIssueUrl, (error, response, body) => {
                //     console.log(error, '    error of get issue in jira api 2');
                //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                //     // console.log(response, '    response of get issue in jira api');
                //     console.log(body, '    body of get issue in jira api');
                //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                //     if(response.statusCode == 200){
                //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                //         textToPrint = previousDescription + description;
            
                //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                        
                //         request( jiraServiceDeskoptions , (error, response, body) => {
                //             console.log(error, '    error of update issue in jira service desk 1');
                //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                //             // console.log(response, '    response of update issue in jira service desk');
                //             console.log(body, '    body of update issue in jira service desk');

                //             if(response.statusCode == 204){
                //                 constant.function.updatePatrollerTransition(id, '51');
                //             }

                //         });

                //     }
                // });
            }

            emailService.acceptPatrollerRequest(parkingLot.manager.firstName, parkingLot.manager.email, parkingLot.patroller.companyName, parkingLot.zone, parkingLot.address, (err, resp) => {
                if(err){
                    return;
                }
                else{
                    return;
                }
            });

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.patrollerRequestAccepted,
                data: parkingLot
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.activatePatrollerRequest = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { location } = req.body;

        let parkingLot = await ParkingLot.findOneAndUpdate({ _id: location, patroller: loggedInUser, isDeleted: false }, { $set: { patrollerAssignedStatus: 'active', isPatrollerPending: false, isPatrollerActive: true, patrollerActiveDate: moment.utc().format() } }, { new: true }).populate('manager patroller');
        if(parkingLot){

            let patrollerLog = {
                date: moment.utc().format(),
                isRequestActivated: true,
                patroller: parkingLot.patroller,
                patrollerEmail: parkingLot.patroller.email,
                patrollerId: parkingLot.patroller.patrollerId,
                companyName: parkingLot.patroller.companyName,
                statusChangedFrom: '',
                statusChangedTo: 'active',
                currentstatus: 'active'
            };
            let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: parkingLot, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
            if(findUpdatePatrollerLog){
                console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');


                let previousDescription = '';
                // let description = `* Request activated by ${parkingLot.patroller.email}  (${parkingLot.patroller.patrollerId}).`;
                let description = `* Request Activated: ${parkingLot.patroller.patrollerId} ${parkingLot.patroller.companyName}.`;
                let textToPrint = '';

                let id = findUpdatePatrollerLog.jiraIssueKeyId;
                let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                request( addCommentJson, (error, response, body) => {
                    console.log(error, '    error of addCommentJson');
                    console.log(response.statusCode, '    response.statusCode of addCommentJson');
                    // console.log(response, '    response of addCommentJson');
                    console.log(body, '    body of addCommentJson');
                    if(response.statusCode == 201){
                        constant.function.updatePatrollerTransition(id, '71');
                    }
                });

                // let getJiraIssueUrl = {
                //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                //     auth: constant.jiraCredentials.auth,
                //     method: 'GET',
                //     body: {},
                //     json: true
                // };
                // request( getJiraIssueUrl, (error, response, body) => {
                //     console.log(error, '    error of get issue in jira api 3');
                //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                //     // console.log(response, '    response of get issue in jira api');
                //     console.log(body, '    body of get issue in jira api');
                //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                //     if(response.statusCode == 200){
                //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                //         textToPrint = previousDescription + description;

                //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                        
                //         request( jiraServiceDeskoptions , (error, response, body) => {
                //             console.log(error, '    error of update issue in jira service desk 2');
                //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                //             // console.log(response, '    response of update issue in jira service desk');
                //             console.log(body, '    body of update issue in jira service desk');

                //             if(response.statusCode == 204){
                //                 constant.function.updatePatrollerTransition(id, '71');
                //             }

                //         });
                        
                //     }
                // });


            }

            emailService.activatedPatrollerRequest(parkingLot.manager.firstName, parkingLot.manager.email, parkingLot.patroller.companyName, parkingLot.zone, (err, resp) => {
                if(err){
                    return;
                }
                else{
                    return;
                }
            });

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.patrollerRequestActivated,
                data: parkingLot
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.optOutLocation = async (req, res) => {
    try {
        const { value, error } = validate.validateIdAndDate(req.query);
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
            let { id, date } = value;

            let updatedJson = {
                patrollerAssignedStatus: 'none',
                isPatrollerRequested: false,
                isPatrollerPending: false,
                isPatrollerActive: false,
                // patroller: null
            };

            // let updateLocation = await ParkingLot.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: updatedJson }, { new: true }).populate('manager patroller');
            let updateLocation = await ParkingLot.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: updatedJson }).populate('manager patroller');
            if(updateLocation){

                if(updateLocation.patrollerAssignedStatus == 'active'){
                    emailService.patrollerOptOutLocationEmailToHost(updateLocation.manager.firstName, updateLocation.manager.email, updateLocation.patroller.companyName, updateLocation.zone, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });

                    emailService.patrollerOptOutLocationEmailToPatroller(updateLocation.patroller.email, updateLocation.patroller.companyName, updateLocation.zone, date, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });

                }


                let previousPatrollers = updateLocation.patrollerHistory;

                let patrollerLog = {
                    date: moment.utc().format(),
                    isRequestDeclined: true,
                    patroller: updateLocation.patroller,
                    patrollerEmail: updateLocation.patroller.email,
                    patrollerId: updateLocation.patroller.patrollerId,
                    companyName: updateLocation.patroller.companyName,
                    statusChangedFrom: '',
                    statusChangedTo: 'none',
                    currentstatus: 'none'
                };
                let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                if(findUpdatePatrollerLog){
                    console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');





                    let previousDescription = '';
                    // let description = `* Request declined by Patroller: ${updateLocation.patroller.patrollerId} ${updateLocation.patroller.companyName}.`;
                    let description = `* Relationship Ended by Patroller.`;
                    let textToPrint = '';

                    let id = findUpdatePatrollerLog.jiraIssueKeyId;
                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                    request( addCommentJson, (error, response, body) => {
                        console.log(error, '    error of addCommentJson');
                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                        // console.log(response, '    response of addCommentJson');
                        console.log(body, '    body of addCommentJson');
                        if(response.statusCode == 201){
                            if(updateLocation.isPatrollerRequested){
                                constant.function.updatePatrollerTransition(id, '101');
                            }
                            else if(updateLocation.isPatrollerPending){
                                constant.function.updatePatrollerTransition(id, '81');
                            }
                            else if(updateLocation.isPatrollerActive){
                                constant.function.updatePatrollerTransition(id, '11');
                            }
                        }
                    });

                    // let getJiraIssueUrl = {
                    //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                    //     auth: constant.jiraCredentials.auth,
                    //     method: 'GET',
                    //     body: {},
                    //     json: true
                    // };
                    // request( getJiraIssueUrl, (error, response, body) => {
                    //     console.log(error, '    error of get issue in jira api 4');
                    //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                    //     // console.log(response, '    response of get issue in jira api');
                    //     console.log(body, '    body of get issue in jira api');
                    //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                    //     if(response.statusCode == 200){
                    //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                    //         textToPrint = previousDescription + description;

                    //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                            
                    //         request( jiraServiceDeskoptions , (error, response, body) => {
                    //             console.log(error, '    error of update issue in jira service desk 3');
                    //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                    //             // console.log(response, '    response of update issue in jira service desk');
                    //             console.log(body, '    body of update issue in jira service desk');

                    //             if(response.statusCode == 204){
                    //                 if(updateLocation.isPatrollerPending){
                    //                     constant.function.updatePatrollerTransition(id, '81');
                    //                 }
                    //                 else if(updateLocation.isPatrollerActive){
                    //                     constant.function.updatePatrollerTransition(id, '41');
                    //                 }
                    //             }

                    //         });
                            
                    //     }
                    // });







                    findAndAssignNewPatroller(updateLocation);
                    updateLocation.update({ $set: { patroller: null } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });

                }

                async function findAndAssignNewPatroller(parkingLot){
                    let query = previousPatrollers.length == 0 ? { location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false } : { _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false };
                    // let nearPatrollers = await User.find({ _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false });
                    let nearPatrollers = await User.find(query);
                    console.log(nearPatrollers, '     near patrollers in assignPatrollerForLocation api');
                    if(nearPatrollers){
                        if(nearPatrollers.length == 0){
                            updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                            console.log('Update jira ticket 2222');
                        }
                        else{

                            let getAvailablePatrollerListForLog = constant.function.getAvailablePatrollerListForLog(nearPatrollers);

                            let getRandomNumber = Math.floor(Math.random() * (nearPatrollers.length));
                            let findPatroller = nearPatrollers[getRandomNumber];

                            // let findLocation = await ParkingLot.findOne({ zone: location, isDeleted: false });
                            let findLocation = await ParkingLot.findOneAndUpdate({ _id: parkingLot, isDeleted: false }, { $set: { patroller: findPatroller, isPatrollerRequested: true, patrollerAssignedStatus: 'requested', patrollerRequestedDate: moment.utc().format() } }, { new: true });
                            if(findLocation){

                                findLocation.patrollerHistory.push(findPatroller);
                                findLocation.save();

                                createPatrollerLog(findPatroller);

                                let distance;
                                let x;
                                let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                                request(link, function (error, response, body){
                                    // console.log('error:', error);
                                    // console.log('response -- :', response, ': -- response');
                                    console.log('statusCode:', response.statusCode);
                                    console.log('body:', body);
                                    x = JSON.parse(body);
                                    console.log('Distance: ', x.rows[0].elements[0].distance.text);
                                    if(x.status == 'OK'){
                                        distance = x.rows[0].elements[0].distance.text;
                                        requestPatroller();
                                    }
                                    else{
                                        distance = 0;
                                        requestPatroller();
                                    }
                                });

                                async function createPatrollerLog(findPatroller){
                                    let patrollerLog = {
                                        date: moment.utc().format(),
                                        isNewPatrollerAssigned: true,
                                        patroller: findPatroller,
                                        patrollerEmail: findPatroller.email,
                                        patrollerId: findPatroller.patrollerId,
                                        companyName: findPatroller.companyName,
                                        statusChangedFrom: '',
                                        statusChangedTo: 'requested',
                                        currentstatus: 'requested'
                                    };
                                    let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                                    if(findUpdatePatrollerLog){
                                        console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');


                                        setTimeout(() => {
                                            let previousDescription = '';
                                            // let description = `* New patroller assigned is ${findPatroller.email} (${findPatroller.patrollerId}), previous one opted out location.`;
                                            let description = getAvailablePatrollerListForLog +`* Request Issued: ${findPatroller.patrollerId} ${findPatroller.companyName}.`;
                                            let textToPrint = '';
                        
                                            let id = findUpdatePatrollerLog.jiraIssueKeyId;
                                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                                            request( addCommentJson, (error, response, body) => {
                                                console.log(error, '    error of addCommentJson');
                                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                                // console.log(response, '    response of addCommentJson');
                                                console.log(body, '    body of addCommentJson');
                                                if(response.statusCode == 201){
                                                    constant.function.updatePatrollerTransition(id, '41');
                                                }
                                            });

                                            // let getJiraIssueUrl = {
                                            //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                                            //     auth: constant.jiraCredentials.auth,
                                            //     method: 'GET',
                                            //     body: {},
                                            //     json: true
                                            // };
                                            // request( getJiraIssueUrl, (error, response, body) => {
                                            //     console.log(error, '    error of get issue in jira api 5');
                                            //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                                            //     // console.log(response, '    response of get issue in jira api');
                                            //     console.log(body, '    body of get issue in jira api');
                                            //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                                            //     if(response.statusCode == 200){
                                            //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                                            //         textToPrint = previousDescription + description;

                                            //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                                                    
                                            //         request( jiraServiceDeskoptions , (error, response, body) => {
                                            //             console.log(error, '    error of update issue in jira service desk 4');
                                            //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                                            //             // console.log(response, '    response of update issue in jira service desk');
                                            //             console.log(body, '    body of update issue in jira service desk');
                                            //         });
                                                    
                                            //     }
                                            // });
                                        }, 10000);





                                    }
                                }

                                function requestPatroller() {
                                    emailService.requestForPatroller(findLocation, findPatroller, distance, (err, resp) => {
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
                                }
                            }
                            else{
                                // constant.function.parkingLotNotFound(res);
                            }
                        }
                    }
                    else{
                        updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                    }
                }

                async function updateJiraTicketForLocationIfNoPatrollerFound(findLocation){
                    console.log('Update jira ticket');

                    setTimeout(async () => {
                        let patrollerLog = {
                            date: moment.utc().format(),
                            isNoPatrollerFound: true,
                            // patroller: findPatroller,
                            // patrollerEmail: findPatroller.email,
                            statusChangedFrom: '',
                            statusChangedTo: 'requested',
                            currentstatus: 'requested'
                        };
                        let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                        if(findUpdatePatrollerLog){
                            let previousDescription = '';
                            // let description = `* No patroller found for location, try creating new patroller and then assign OR assign one of the existing patroller manually.`;
                            let description = `* No patroller found; Admin interaction required.`;
                            let textToPrint = '';
        
                            let id = findUpdatePatrollerLog.jiraIssueKeyId;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
                                if(response.statusCode == 201){
                                    constant.function.updatePatrollerTransition(id, '31');
                                }
                            });

                            // let getJiraIssueUrl = {
                            //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                            //     auth: constant.jiraCredentials.auth,
                            //     method: 'GET',
                            //     body: {},
                            //     json: true
                            // };
                            // request( getJiraIssueUrl, (error, response, body) => {
                            //     console.log(error, '    error of get issue in jira api 6');
                            //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                            //     // console.log(response, '    response of get issue in jira api');
                            //     console.log(body, '    body of get issue in jira api');
                            //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                            //     if(response.statusCode == 200){
                            //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                            //         textToPrint = previousDescription + description;
                                    
                            //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                                    
                            //         request( jiraServiceDeskoptions , (error, response, body) => {
                            //             console.log(error, '    error of update issue in jira service desk 5');
                            //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                            //             // console.log(response, '    response of update issue in jira service desk');
                            //             console.log(body, '    body of update issue in jira service desk');

                            //             if(response.statusCode == 204){
                            //                 constant.function.updatePatrollerTransition(id, '61');
                            //             }

                            //         });
                                    
                            //     }
                            // });
        
                            findLocation.update({ $set: { patrollerAssignedStatus: 'requestedAndNotFound', isPatrollerRequested: true, patrollerRequestedDate: moment.utc().format() } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });   
                        }
                    }, 10000);



                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.requestCancelledForPatroller,
                    data: []
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createViolation = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '     req.body of create violation');

        let {
            status,
            sortStatus,
            location,
            stateRegistered,
            license,
            make,
            model,
            color,
            vin
        } = req.body;

        let findLocation = await ParkingLot.findOne({ zone: location, patroller: loggedInUser, isPatrollerActive: true, isDeleted: false });
        if(findLocation){
            let violation = new Violation({
                violationId: constant.function.generateShortId(),
                patroller: loggedInUser,
                manager: findLocation.manager,

                status: status,
                sortStatus: sortStatus,
                parkingLot: findLocation,
                parkingLotName: findLocation.parkingLotName,
                address: findLocation.address,
                zone: findLocation.zone,

                stateRegistered: stateRegistered,
                license: license,
                make: make,
                model: model,
                color: color,
                vin: vin,

                statusChanges: [{
                    statusChangedBy: 'patroller',
                    from: '',
                    to: status,
                    date: moment.utc().format()
                }]
            });
            let newViolation = await violation.save();
            if(!newViolation){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.violationNotSaved,
                    data: []
                });
            }
            else{
                
                // let statusUpdateJson = {
                //     statusChangedBy: 'patroller',
                //     from: '',
                //     to: newstatus,
                //     date: moment.utc().format()
                // };

                // newViolation.update({ $push: { statusChanges: statusUpdateJson } }, (error, resp) => {
                //     if(resp){
                //         // return;
                //     }
                //     else{
                //         // return;
                //     }
                // });

                if(newViolation.status == 'booted'){
                    findLocation.update({ $inc: { spacesAvailable: -1 } }, (reject, resolve) => {
                        if(resolve){
                            return;
                        }
                        else{
                            return;
                        }
                    });
                }

                findLocation.update({ $push: { violations: newViolation } }, (error, resp) => {
                    if(resp){
                        // return;
                    }
                    else{
                        // return;
                    }
                });

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.violationSaved,
                    data: newViolation
                });
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.parkingLotNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getActiveLocationsForPatroller = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let findActiveLocaions = await ParkingLot.find({ patroller: loggedInUser, isPatrollerActive: true, isDeleted: false });
        if(findActiveLocaions){
            if(findActiveLocaions.length == 0){
                constant.function.dataNotFound(res);
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: findActiveLocaions
                });
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getViolationById = async (req, res) => {
    try {
        let { id } = req.query;
        let violation = await Violation.findOne({ _id: id, isDeleted: false });
        if(violation){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: violation
            });
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.searchParkingLot = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { page, perPage, search, isAdmin } = req.body;
        // console.log(req.body, '   req body of search parking lot');

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'manager wNine' })
        };

        let query;
        isAdmin ? query = { $or: [{ parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }], isDeleted: false } : query = { $or: [{ parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }], manager: loggedInUser, isDeleted: false };

        let parkingLotList = await ParkingLot.paginate(query, options);
        if(parkingLotList.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(parkingLotList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLotList
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.deleteParkingLot = async (req, res) => {
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
            let deleteParkingLot = await ParkingLot.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isActivated: false, isDeleted: true } }, { new: true });
            if(deleteParkingLot){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.parkingLotDeleted,
                    data: []
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotById = async (req, res) => {
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
            let parkingLot = await ParkingLot.findOne({ _id: id, isActivated: true, isDeleted: false }).populate('wNine manager');
            if(parkingLot){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: parkingLot
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotByIdForAdmin = async (req, res) => {
    try {
        let { id, isAdmin } = req.query;
        let query = {};
        let loggedInUser = req.user._id;
        if(isAdmin == 'true'){
            query = { _id: id, isDeleted: false };
        }
        else{
            query = { _id: id, manager: loggedInUser, isDeleted: false };
        }

        let parkingLot = await ParkingLot.findOne(query).populate('manager wNine');
        if(parkingLot){
            if(parkingLot.isCustomizeWeeklyParkingFee){
                constant.customTimeVariables.forEach(element => {
                    parkingLot[element] = parkingLot[element].substr(1);
                });
            }
            let managersWNine = await Wnine.find({ manager: parkingLot.manager, isDeleted: false });
            if(managersWNine){
                // console.log(managersWNine, '    managersWNinemanagersWNine');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: parkingLot,
                    managersWNine: managersWNine
                });
            }
            else{
                constant.function.serverError(res, {});
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotByIdForPatroller = async (req, res) => {
    try {
        let { id } = req.query;
        let loggedInUser = req.user._id;

        let parkingLot = await ParkingLot.findOne({ _id: id, patroller: loggedInUser, isDeleted: false }).populate('manager wNine');
        if(parkingLot){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLot
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getNearByParkingLots = async (req, res) => {
    try {
        // console.log(req.query, '  req.query in search nearby parking lots');
        const { value, error } = validate.validateLatitudeLongitude(req.query);
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
            let { page, perPage, latitude, longitude } = req.query;
            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(perPage, 10) || 2,
            };

            // let nearParkingLot = await ParkingLot.find({ location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ longitude, latitude ] } } }, isActivated: true, isDeleted: false });
            let nearParkingLot = await ParkingLot.paginate({ location: { $near: { $maxDistance: 80000, $geometry: { type: "Point", coordinates: [longitude, latitude] } } }, isActivated: true, isDeleted: false }, options);
            if(nearParkingLot){
                if(nearParkingLot.docs.length == 0){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.spotsNotFound,
                        data: []
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.dataFound,
                        data: nearParkingLot
                    });
                }
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.spotsNotFound,
                    data: []
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getNearByPatrollersForLocation = async (req, res) => {
    try {
        console.log(req.query, '   req.query of getNearByPatrollersForLocation');
        let { zone } = req.query;
        let parkingLot = await ParkingLot.findOne({ zone: zone, isDeleted: false });
        if(parkingLot){
            let nearPatrollers = await User.find({ location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false });
            if(nearPatrollers){
                if(nearPatrollers.length == 0){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: []
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.dataFound,
                        data: nearPatrollers
                    });
                }
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotByZoneNumber = async (req, res) => {
    try {
        let { zone } = req.query;
        let parkingLot = await ParkingLot.findOne({ zone: zone, isActivated: true, isDeleted: false }).populate('manager wNine');
        if(parkingLot){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.parkingLotFound,
                data: [parkingLot]
            });
        }
        else{
            constant.function.parkingLotNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createTax = async () => {
    try {
        let tax = await Tax.findOne({ isDeleted: false });
        if(!tax){
            // let stateColorado = 2.9, countryEagle = 1.0, cityAvon = 4.0, specialDistrict = 0.5;
            let stateColorado = 0, countryEagle = 0, cityAvon = 0, specialDistrict = 0;
            let combinedTaxRate;
            combinedTaxRate = stateColorado + countryEagle + cityAvon + specialDistrict;

            const createTax = new Tax({
                stateColorado: stateColorado,
                countryEagle: countryEagle,
                cityAvon: cityAvon,
                specialDistrict: specialDistrict,
                combinedTaxRate: combinedTaxRate
            });
            let newTaxRate = await createTax.save();
            if(newTaxRate){
                console.log('Tax table created at first app started');
                // return res.status(constant.httpCode.success).json({
                //     success: true,
                //     code: constant.httpCode.success,
                //     message: constant.message.taxRateUpdated,
                //     data: []
                // });
            }
            else{
                console.log('Error creating taxes');
                // return res.status(constant.httpCode.success).json({
                //     success: false,
                //     code: constant.httpCode.badRequest,
                //     message: constant.message.taxRateNotUpdated,
                //     data: []
                // });
            }

        }
    } catch (err) {
        console.log(err, 'Internal server error in creating taxes');
        // constant.function.serverError(res, err);
    }
}

exports.getTax = async (req, res) => {
    try {
        let tax = await Tax.findOne({ isDeleted: false });
        if(tax){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: tax
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.updateTax = async (req, res) => {
    try {
        const { value, error } = validate.validateTaxRates(req.body);
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
            let { stateColorado, countryEagle, cityAvon, specialDistrict } = value;
            let combinedTaxRate;
            combinedTaxRate = stateColorado + countryEagle + cityAvon + specialDistrict;
            let updatedTaxRates = {
                stateColorado: stateColorado,
                countryEagle: countryEagle,
                cityAvon: cityAvon,
                specialDistrict: specialDistrict,
                combinedTaxRate: combinedTaxRate
            }
            let updateTax = await Tax.findOneAndUpdate({ isDeleted: false }, { $set: updatedTaxRates }, { new: true });
            if(updateTax){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.taxRateUpdated,
                    data: updateTax
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.taxRateNotUpdated,
                    data: []
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.sendOtp = async (req, res) => {
    try {
        console.log('Entered send OTP api');
        const { value, error } = validate.validateOtpProcess(req.body);
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
            let { email, mobileNumber } = value;
            let newMobileNumber = '+91' + mobileNumber;
            // let newMobileNumber = '+1'+mobileNumber;
            // console.log(value, '   value in send OTP');
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                if(user.isVerified){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.userAlreadyExist,
                        data: value
                    });
                }
                else{
                    const activationNumber = constant.function.generateActivationNumber();
                    const emailOtp = constant.function.generateActivationNumber();
                    const mobileOtp = constant.function.generateActivationNumber();
                    let updateObj = {
                        email: email,
                        mobileNumber: mobileNumber,
                        activationNumber: activationNumber,
                        emailOtp: emailOtp,
                        mobileOtp: mobileOtp
                    }
                    user.update({ $set: updateObj }, (reject, resolve) => {
                        if(resolve){
                            sendEmailAndOtp(email, activationNumber, mobileOtp);
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.errorOccur,
                                data: value
                            });
                        }
                    });
                }
            }
            else{
                const activationNumber = constant.function.generateActivationNumber();
                const emailOtp = constant.function.generateActivationNumber();
                const mobileOtp = constant.function.generateActivationNumber();
                const user = new User({
                    email: email,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
                    emailOtp: emailOtp,
                    mobileOtp: mobileOtp
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
                    sendEmailAndOtp(email, activationNumber, mobileOtp);
                }
            }

            async function sendEmailAndOtp(email, activationNumber, mobileOtp){
                emailService.sendOtp(email, activationNumber, (err, resp) => {
                    if(err){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.errorSendingEmail,
                            data: err
                        });
                    }
                    else{
                        environment.twilio.client.messages.create({
                            body: `Welcome to  Park! Here is your verification code: ${mobileOtp}`,
                            to: newMobileNumber, // Text this number
                            from: environment.twilio.from
                        }).then((message) => {
                            console.log(message, '  response of message sent from twilio');
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.enterOtpNow,
                                data: value
                            });
                        });
                    }
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { email, mobileNumber, emailOtp, mobileNumberOtp } = req.body;
        let verifyOtp = await User.findOne({
            email: email,
            mobileNumber: mobileNumber,
            activationNumber: emailOtp,
            mobileOtp: mobileNumberOtp
        });
        if(verifyOtp){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.setupPasswordNow,
                data: verifyOtp
            });
        }
        else{
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

exports.setUpPassword = async (req, res) => {
    try {
        let { email, newPassword, confirmNewPassword } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        const activationNumber = constant.function.generateActivationNumber();
        const emailOtp = constant.function.generateActivationNumber();
        const mobileOtp = constant.function.generateActivationNumber();

        let user = await User.findOne({ email: email, isVerified: true, isDeleted: false });
        if(user){
            constant.function.emailAlreadyExistFunction(res);
        }
        else{
            let obj = {
                salt: salt,
                hash: hashed,
                activationNumber: activationNumber,
                emailOtp: emailOtp,
                mobileOtp: mobileOtp,
                isVerified: true
            };
            let updateUser = await User.findOneAndUpdate({ email: email }, { $set: obj }, { new: true });
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
                constant.function.userNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.guestSignUp = async (req, res) => {
    try {
        const { value, error } = validate.guestSignup(req.body);
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
            let { email, mobileNumber } = value;
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                userSignUp();
            }

            async function userSignUp(){
                const activationNumber = constant.function.generateActivationNumber();
                const user = new User({
                    email: email,
                    mobileNumber: mobileNumber,
                    activationNumber: activationNumber,
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
                    const encryptedEmail = cryptr.encrypt(email);
                    // let link = `${environment.web_url}recovery?jpn=${activationNumber}&etl=${encryptedEmail}`;

                    let link = `${environment.api_url}api/users/verify?jpn=${activationNumber}&etl=${encryptedEmail}`;

                    let accountType;
                    accountType = role == '1' ? accountType = 'Admin' : role == '2' ? accountType = 'Host' : accountType = 'Driver';

                    emailService.signUp(email, link, firstName, accountType, (err, resp) => {
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
                                message: constant.message.userAccountCreated,
                                data: newUser
                            });
                        }
                    });
                }
            }
        }
    } catch (err) {
        console.log(err, '    err in signup');
        constant.function.serverError(res, err);
    }
}

exports.getClientToken = async (req, res) => {
    try {
        console.log(req.query, '    req in getClientToken');
        let braintreeCustomerId;
        if(req.query.braintreeCustomerId){
            braintreeCustomerId = req.query.braintreeCustomerId;
        }
        else{
            braintreeCustomerId = '';
        }

        gateway.clientToken.generate({ customerId: braintreeCustomerId }, function (err, response){
            // let clientToken = response.clientToken;
            console.log(response, '  response of getClientToken');
            return res.status(constant.httpCode.success).json({
                token: response.clientToken
                // token: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNklrRjFkR2g1SW4wLmV5SmxlSEFpT2pFMU9EQTFNRFF4TnpNc0ltcDBhU0k2SW1Rek1XSXlZVGt6TFdNM05HSXROR0l4WmkxaU4yTmtMVFV5TldNM1pqQmpZMlJoWXlJc0luTjFZaUk2SWpJelpqUTRaSEF5ZURKbmRHdHhaM0FpTENKcGMzTWlPaUpCZFhSb2VTSXNJbTFsY21Ob1lXNTBJanA3SW5CMVlteHBZMTlwWkNJNklqSXpaalE0WkhBeWVESm5kR3R4WjNBaUxDSjJaWEpwWm5sZlkyRnlaRjlpZVY5a1pXWmhkV3gwSWpwbVlXeHpaWDBzSW5KcFoyaDBjeUk2V3lKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYjNCMGFXOXVjeUk2ZXlKamRYTjBiMjFsY2w5cFpDSTZJalZsTXpCbE9HRTBOamxpWXpGaE5ETXpZak5rWVRnd1lpSjlmUS5ndUR0QmZUUlRDenV5RzVhdE0tZE9TZ0ZYZktCOUFUWm02YnoxSlFFTUxiay1XVFV5NExxY1RiQ05fRFJfblpBSkNTSGZpbVdFQkZBUVJCT2tTZmt4Zz9jdXN0b21lcl9pZD0iLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMjNmNDhkcDJ4Mmd0a3FncC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgifSwiY2hhbGxlbmdlcyI6W10sImVudmlyb25tZW50Ijoic2FuZGJveCIsImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8yM2Y0OGRwMngyZ3RrcWdwL2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tLzIzZjQ4ZHAyeDJndGtxZ3AifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoia2FuZ2Fyb28gcHJvcGFuZSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6Imthbmdhcm9vcHJvcGFuZSIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMjNmNDhkcDJ4Mmd0a3FncCIsInZlbm1vIjoib2ZmIn0='
            });
        });
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

// exports.createPurchase = async (req, res)=>{
//     try {
//         // console.log(req.body, '   req.body of createPurchase');
//         gateway.transaction.sale({
//             amount: req.body.chargeAmount,
//             paymentMethodNonce: req.body.nonce,
//             options: {
//               submitForSettlement: true
//             }
//           }, function (err, result){
//             if(result.success){
//                 // console.log(result, '  result of create purchase');
//                 return res.status(constant.httpCode.success).json({
//                     result
//                 })
//               // See result.transaction for details
//             }
//             else{
//               // Handle errors
//             }
//           }
//         );
//     } catch (err) {
//         console.log(err, '  err in createPurchase');
//         constant.function.serverError(res, err);
//     }
// }

exports.createPurchase = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of createPurchase');
        console.log(req.query, '   req.query of createPurchase');
        let { nonce } = req.body;
        let { saveThisCard } = req.query;
        saveThisCard = JSON.parse(saveThisCard || 'true');
        // console.log(saveThisCard, '   saveThisCard');

        let result = await gateway.transaction.sale({
            amount: req.body.chargeAmount,
            paymentMethodNonce: nonce,
            // customerId: "",
            customer: {
                id: ""
            },
            options: {
                storeInVaultOnSuccess: true,
                submitForSettlement: true
            }
        });
        if(result.success){
            // console.log(result, '  result of create purchase');
            console.log(result.transaction.creditCard.token, '  result.transaction.creditCard in create purchase');
            let creditCardToken = result.transaction.creditCard.token;
            if(!saveThisCard){
                let resp = await gateway.paymentMethod.delete(`${creditCardToken}`);
                if(resp){
                    // console.log(resp, '   resp of delete card in create purchase API');
                }
                else{
                    console.log(err, '   err in delete card in create purchase API');
                }
            }
            return res.status(constant.httpCode.success).json({
                result
            });
            // See result.transaction for details
        }
        else{
            return res.status(constant.httpCode.success).json({
                result: false,
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.serverError,
                data: result
            });
        }

        // gateway.transaction.sale({
        //     amount: req.body.chargeAmount,
        //     paymentMethodNonce: nonce,
        //     // customerId: "",
        //     customer: {
        //         id: ""
        //     },
        //     options: {
        //         // storeInVaultOnSuccess: saveThisCard,
        //         storeInVaultOnSuccess: true,
        //         submitForSettlement: true
        //     }
        //   }, function (err, result){
        //     if(result.success){
        //         console.log(result.transaction.creditCard.token, '  result.transaction.creditCard in create purchase');
        //         let creditCardToken = result.transaction.creditCard.token;
        //         if(!saveThisCard){
        //             gateway.paymentMethod.delete(`${creditCardToken}`, function (err,resp){
        //                 if(resp){
        //                     // console.log(resp, '   resp of delete card in create purchase');
        //                 }
        //                 else{
        //                     console.log(err, '   err in delete card in create purchase');
        //                 }
        //             });
        //         }

        //         return res.status(constant.httpCode.success).json({
        //             result
        //         });

        //       // See result.transaction for details
        //     } else {
        //       // Handle errors
        //         return res.status(constant.httpCode.success).json({
        //             success: false,
        //             code: constant.httpCode.badRequest,
        //             message: constant.message.serverError,
        //             data: []
        //         });
        //     }
        //   }
        // );
    } catch (err) {
        console.log(err, '  err in createPurchase');
        constant.function.serverError(res, err);
    }
}

exports.createFullRefund = async (req, res) => {
    try {
        console.log(req.body, '   req.body of create full refund');
        let { transactionId } = req.body;
        let result = await gateway.transaction.refund(transactionId);
        if(result){
            return res.status(constant.httpCode.success).json({
                result
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                result
            });
        }
        // gateway.transaction.refund(transactionId, function (err, result){
        //     return res.status(constant.httpCode.success).json({
        //         result
        //     });
        //     result.success;
        //     // true

        //     result.transaction.type;
        //     // "credit"

        //     result.transaction.amount;
        //     // "50.00"
        // });
    } catch (err) {
        console.log(err, '  err in createFullRefund');
        constant.function.serverError(res, err);
    }
}

exports.getBraintreeCustomerByCustomerId = async (req, res) => {
    try {
        // console.log(req.query, '   req.query of getBraintreeCustomerByCustomerId');
        let { braintreeCustomerId } = req.query;
        let customer = await gateway.customer.find(`${braintreeCustomerId}`);
        if(customer){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.braintreeCustomerFound,
                data: customer.creditCards
            });
        }
        else{
            return res.status(constant.httpCode.badRequest).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.braintreeCustomerNotFound,
                data: []
            });
        }
    } catch (err) {
        console.log(err, '  err in getBraintreeCustomerByCustomerId');
        constant.function.serverError(res, err);
    }
}

exports.removeSavedCard = async (req, res) => {
    try {
        // console.log(req.query, '   req.query of removeSavedCard');
        let { token, isAdmin, braintreeCustomerId } = req.query;

        let resp = await gateway.paymentMethod.delete(`${token}`);
        if(resp){
            // console.log(resp, '   resp of delete card');
            let customer = await gateway.customer.find(`${braintreeCustomerId}`);
            if(customer){
                // console.log(customer.creditCards , '    braintree customer in getBraintreeCustomerByCustomerId');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.braintreeCustomerFound,
                    data: resp,
                    customerCreditCards: customer.creditCards
                });
            }
            else{
                return res.status(constant.httpCode.badRequest).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.serverError,
                    data: resp,
                    customerCreditCards: []
                });
            }
        }
        else{
            console.log(err, '   err in delete card');
            return res.status(constant.httpCode.badRequest).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorRemovingSavedCard,
                data: err
            });
        }
    } catch (err) {
        console.log(err, '  err in removeSavedCard');
        constant.function.serverError(res, err);
    }
}

exports.setCardAsDefault = async (req, res) => {
    try {
        // console.log(req.query, '   req.query of setCardAsDefault');
        let { token, isAdmin, braintreeCustomerId } = req.query;

        let result = await gateway.paymentMethod.update(`${token}`, { options: { makeDefault: true } });
        if(result){
            let customer = await gateway.customer.find(`${braintreeCustomerId}`);
            if(customer){
                // console.log(customer.creditCards , '    braintree customer in getBraintreeCustomerByCustomerId');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.braintreeCustomerFound,
                    data: result,
                    customerCreditCards: customer.creditCards
                });
            }
            else{
                return res.status(constant.httpCode.badRequest).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.serverError,
                    data: result,
                    customerCreditCards: []
                });
            }
        }
        else{
            console.log(err, '   err in setting card as default');
            return res.status(constant.httpCode.badRequest).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorSettingCardAsDefault,
                data: err
            });
        }
    } catch (err) {
        console.log(err, '  err in setCardAsDefault');
        constant.function.serverError(res, err);
    }
}

exports.addCreditCard = async (req, res) => {
    try {
        // console.log(req.query, '   req.query of addCreditCard');
        // console.log(req.body, '   req.body of addCreditCard');
        let { token, isAdmin, braintreeCustomerId } = req.query;
        let { nonce } = req.body;

        let result = await gateway.paymentMethod.create({
            customerId: `${braintreeCustomerId}`,
            paymentMethodNonce: nonce,
            options: {
                // makeDefault: true,
                verifyCard: true,
                failOnDuplicatePaymentMethod: true,
            }
        });
        if(result){
            console.log(result, '     result of add credit card');
            let customer = await gateway.customer.find(`${braintreeCustomerId}`);
            if(customer){
                // console.log(customer.creditCards , '    braintree customer in getBraintreeCustomerByCustomerId');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.braintreeCustomerFound,
                    data: result,
                    customerCreditCards: customer.creditCards
                });
            }
            else{
                return res.status(constant.httpCode.badRequest).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.serverError,
                    data: result,
                    customerCreditCards: []
                });
            }
        }
        else{
            console.log(err, '     err in addCreditCard else condition of result');
            return res.status(constant.httpCode.badRequest).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorSettingCardAsDefault,
                data: result
            });
        }
    } catch (err) {
        console.log(err, '  server err in addCreditCard');
        constant.function.serverError(res, err);
    }
}

exports.addBraintreeCustomerIdInUser = async (req, res) => {
    try {
        console.log(req.query, '   req.query of addBraintreeCustomerIdInUser');
        let { braintreeCustomerId } = req.query;
        let loggedInUser = req.user._id;
        let updateUser = await User.findOneAndUpdate({ _id: loggedInUser }, { $set: { braintreeCustomerId: braintreeCustomerId } }, { new: true });
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.userUpdated,
                data: updateUser
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.userNotFound,
                data: []
            });
        }
    } catch (err) {
        console.log(err, '  err in addBraintreeCustomerIdInUser');
        constant.function.serverError(res, err);
    }
}

exports.getBraintreePlans = async (req, res) => {
    try {
        let result = await gateway.plan.all();
        // console.log(result.plans, '     .plans in async');
        return res.status(constant.httpCode.success).json({
            success: true,
            code: constant.httpCode.success,
            message: constant.message.braintreePlansFound,
            data: result.plans
        });
    } catch (err) {
        console.log(err, '  err in getBraintreePlans');
        constant.function.serverError(res, err);
    }
}

exports.editMyPlanId = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let updateUser = await User.findOneAndUpdate({ _id: loggedInUser }, { $set: req.body }, { new: true });
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.userUpdated,
                data: updateUser
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.userNotFound,
                data: []
            });
        }
    } catch (err) {
        console.log(err, '  err in addBraintreeCustomerIdInUser');
        constant.function.serverError(res, err);
    }
}

exports.turnOnOffAutoReloadWallet = async (req, res) => {
    try {
        console.log(req.query, '   req.query of turnOnOffAutoReloadWallet');
        let { event } = req.query;
        let loggedInUser = req.user._id;
        let autoReloadWallet = JSON.parse(event);

        let updateUser = await User.findOneAndUpdate({ _id: loggedInUser }, { $set: { autoReloadWallet: autoReloadWallet } }, { new: true });
        if(updateUser){
            if(updateUser.autoReloadWallet && updateUser.walletBalance < 1 && updateUser.braintreeCustomerId){
                // console.log('Auto Reload Wallet is on');
                let customer = await gateway.customer.find(`${updateUser.braintreeCustomerId}`);
                if(customer){
                    // console.log(customer.creditCards, '     braintree customer');
                    if(customer.creditCards.length > 0){
                        let paymentMethodToken;
                        for(let i=0;i < customer.creditCards.length;i++){
                            if(customer.creditCards[i].default){
                                paymentMethodToken = customer.creditCards[i].token;
                                break;
                            }
                        }
                        // console.log(paymentMethodToken, '    paymentMethodToken');
                        let result = await gateway.subscription.create({
                            paymentMethodToken: `${paymentMethodToken}`,
                            planId: updateUser.autoReloadPlanId
                        });
                        if(result.success){
                            let cancelSubscription = await gateway.subscription.cancel(result.subscription.id);
                            console.log(cancelSubscription, '    cancelSubscription in turnOnOffAutoReloadWallet');
                            // console.log(result, '    result of auto-reload wallet test API');
                            // console.log(result.subscription.transactions[0].id, '   result.transactions of auto-reload wallet test API');
                            let transactionId = result.subscription.transactions[0].id;
                            let amount = parseFloat(result.subscription.transactions[0].amount);

                            let balance = (updateUser.walletBalance + amount).toFixed(2);
                            let newWalletBalance = balance;

                            let braintreeConvenienceFee = constant.braintreeCredentials.fixedConvenienceFee;
                            let creditCardPercentage = constant.braintreeCredentials.creditCardPercentage;

                            let creditCardPercentageFee2 = (amount / 100) * creditCardPercentage;
                            let creditCardPercentageFee = parseFloat(creditCardPercentageFee2);

                            let totalIncomeToBraintree2 = braintreeConvenienceFee + creditCardPercentageFee;
                            let totalIncomeToBraintree = parseFloat(totalIncomeToBraintree2.toFixed(2));

                            let creditCardFundsHoldingAccount = parseFloat(amount) - parseFloat(totalIncomeToBraintree);

                            creditCardPercentageFee = constant.function.getModulusRoundDown(creditCardPercentageFee);
                            totalIncomeToBraintree = constant.function.getModulusRoundDown(totalIncomeToBraintree);

                            let updateMyUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: { walletBalance: newWalletBalance } }, { new: true });
                            if(updateMyUser){
                                // Wallet load transaction
                                let Wallet = new Transaction({
                                    user: updateMyUser,
                                    currentBalance: newWalletBalance,
                                    transactionId: transactionId,
                                    amountCredited: amount,
                                    amountDebited: '',
                                    creditCardFundsHoldingAccount: creditCardFundsHoldingAccount,
                                    isCredited: true,
                                    isCreditDoneFromAutoReload: true,
                                    // creditCard: walletHistory.creditCard,
                                    success: true,
                                    braintreeConvenienceFee: constant.braintreeCredentials.fixedConvenienceFee,
                                    creditCardFee: creditCardPercentageFee,
                                    totalIncomeToBraintree: totalIncomeToBraintree,
                                    date: moment.utc(moment().format()).format(),
                                    isWalletHistory: true,
                                    isCompleted: true,
                                    isPaymentDone: true,

                                    amount: amount
                                    // startTime: moment.utc(moment().format()).format(),
                                    // endTime: moment.utc(moment().format()).format()
                                });
                                let newWalletHistory = await Wallet.save();
                                if(!newWalletHistory){
                                    // return res.status(constant.httpCode.success).json({
                                    //     success: false,
                                    //     code: constant.httpCode.badRequest,
                                    //     message: constant.message.errorAddingMoneyToWallet,
                                    //     data: []
                                    // });
                                    return res.status(constant.httpCode.success).json({
                                        success: true,
                                        code: constant.httpCode.success,
                                        message: constant.message.userUpdated,
                                        data: updateMyUser
                                    });
                                }
                                else{

                                    let getToken = await AuthToken.findOne({});
                                    if(getToken){
                                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
                    
                                        let walletLoadTransactionData = constant.function.createSalesReceiptForWalletLoadInQuickBooks(updateMyUser, newWalletHistory);
                    
                                        qbo.createSalesReceipt(walletLoadTransactionData, function(err, attachable){
                                            if(err){
                                                console.log(err, '   err in create transaction for wallet load 22');
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

                                    // updateMyUser.walletHistory.push(newWalletHistory);
                                    // updateMyUser.save();

                                    updateMyUser.transactions.push(newWalletHistory);
                                    updateMyUser.save();

                                    return res.status(constant.httpCode.success).json({
                                        success: true,
                                        code: constant.httpCode.success,
                                        message: constant.message.userUpdated,
                                        data: updateMyUser
                                    });
                                }
                            }
                            else{
                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.userUpdated,
                                    data: updateUser
                                });
                            }
                        }
                        else{
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.userUpdated,
                                data: updateUser
                            });
                        }
                    }
                    else{
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.userUpdated,
                            data: updateUser
                        });
                    }
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.userUpdated,
                        data: updateUser
                    });
                }
            }
            else{
                // console.log('Auto Reload Wallet is off');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.userUpdated,
                    data: updateUser
                });
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.userNotFound,
                data: []
            });
        }
    } catch (err) {
        console.log(err, '  err in autoReloadWallet');
        constant.function.serverError(res, err);
    }
}

exports.createTransaction = async (req, res) => {
    try {
        // console.log(req.body,  '   req.body of createTransaction');
        let loggedInUser = req.user._id;
        let {
            user,
            userFirstName,
            manager,
            isGuestCheckout,
            userEmail,
            countryCode,
            userMobileNumber,
            parkingLot,
            // make,
            // model,
            // year,
            licensePlateNumber,
            stateRegistered,
            nickName,
            startTime,
            endTime,
            userStartTime,
            userEndTime,
            userParkingFee,
            actualParkingFee,
            totalMinutes,
            totalChargeableMinutes,
            transactionId,
            // creditCard,
            parkingLotName,
            address,
            isLocationHavingApartment,
            apartmentNumber,
            latitude,
            longitude,
            zone,
            lotRate,
            // lotConvenienceFee,
            amount,
            creditCardFundsHoldingAccount,
            braintreeConvenienceFee,
            creditCardFee,
            totalIncomeToBraintree,
            taxes,
            earningToLot,
            earningToAdmin,
            earningToVendorPercentage,
            earningToAdminPercentage,
            extendTimeCase,
            previousTransactionId,
            associatedVendorId,
            associatedVendorAttachableId,
            associatedW9Name,
            // associatedSocialSecurityNumber,
            // associatedEmployerIdentificationNumber,
            isPaymentDoneFromWallet,
            currentWalletBalance,
            braintreeCustomerId,
            isMinParkingFeeCase
        } = req.body;

        let mobileNumber = countryCode + userMobileNumber;
        let startTimeInUtc = moment.utc(startTime).format();
        let endTimeInUtc = moment.utc(endTime).format();

        let updateParkingLot = await ParkingLot.findOne({ _id: parkingLot, isDeleted: false });
        if(updateParkingLot){
            if(extendTimeCase){
                createTransaction();
            }
            else{
                if(updateParkingLot.spacesAvailable == 0){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.bookingNotAvailable,
                        data: []
                    });
                }
                else{
                    createTransaction();
                }
            }

            async function createTransaction(){
                let newTransactionId = isPaymentDoneFromWallet ? constant.function.generateShortId() : transactionId;

                // Parking transaction
                let transaction = new Transaction({
                    user: user,
                    userFirstName: userFirstName,
                    manager: manager,
                    isGuestCheckout: isGuestCheckout,
                    userEmail: userEmail,
                    countryCode: countryCode,
                    userMobileNumber: userMobileNumber,
                    parkingLot: parkingLot,
                    // make: make,
                    // model: model,
                    // year: year,
                    licensePlateNumber: licensePlateNumber,
                    stateRegistered: stateRegistered,
                    nickName: nickName,
                    startTime: startTimeInUtc,
                    endTime: endTimeInUtc,
                    userStartTime: userStartTime,
                    userEndTime: userEndTime,
                    userParkingFee: userParkingFee,
                    actualParkingFee: actualParkingFee,
                    totalMinutes: totalMinutes,
                    totalChargeableMinutes: totalChargeableMinutes,
                    transactionId: newTransactionId,
                    // creditCard: creditCard,
                    parkingLotName: parkingLotName,
                    address: address,
                    isLocationHavingApartment: isLocationHavingApartment,
                    apartmentNumber: apartmentNumber,
                    latitude: latitude,
                    longitude: longitude,
                    zone: zone,
                    lotRate: lotRate,
                    // lotConvenienceFee: lotConvenienceFee,
                    amount: amount,
                    creditCardFundsHoldingAccount: creditCardFundsHoldingAccount,
                    braintreeConvenienceFee: braintreeConvenienceFee,
                    creditCardFee: creditCardFee,
                    totalIncomeToBraintree: totalIncomeToBraintree,
                    taxes: taxes,
                    earningToLot: earningToLot,
                    simpleParkConvenienceFee: isPaymentDoneFromWallet ? 0.3 : null,
                    earningToAdmin: earningToAdmin,
                    earningToVendorPercentage: earningToVendorPercentage,
                    earningToAdminPercentage: earningToAdminPercentage,
                    extendTimeCase: extendTimeCase,
                    isPaymentDone: true,
                    associatedVendorId: associatedVendorId,
                    associatedVendorAttachableId: associatedVendorAttachableId,
                    associatedW9Name: associatedW9Name,
                    // associatedSocialSecurityNumber: associatedSocialSecurityNumber,
                    // associatedEmployerIdentificationNumber: associatedEmployerIdentificationNumber,
                    isPaymentDoneFromWallet: isPaymentDoneFromWallet,
                    isMinParkingFeeCase: isMinParkingFeeCase,
                    isParkingTransaction: true,
                    isCredited: false,
                    amountDebited: amount
                });

                if(isPaymentDoneFromWallet){
                    transaction.currentBalance = currentWalletBalance.toFixed(2),
                    transaction.amountCredited = null,
                    transaction.amountDebited = amount,
                    transaction.isCredited = false,
                    transaction.success = true,
                    transaction.date = moment.utc(moment().format()).format(),
                    transaction.isWalletHistory = true
                }

                let newTransaction = await transaction.save();
                if(!newTransaction){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingTransaction,
                        data: []
                    });
                }
                else{
                    let link = `https://www.google.com/maps/?q=${latitude},${longitude}`;
                    // let sTime = moment(startTime).format('MMMM Do YYYY, h:mm a');
                    // let eTime = moment(endTime).format('MMMM Do YYYY, h:mm a');

                    let sTime = userStartTime;
                    let eTime = userEndTime;
                    let amt = amount.toFixed(2);

                    let obj = {
                        userFirstName: userFirstName,
                        transactionId: newTransactionId,
                        licensePlateNumber: licensePlateNumber,
                        zone: zone,
                        parkingLotName: parkingLotName,
                        startTime: sTime,
                        endTime: eTime,
                        address: address,
                        amount: amt,
                        link: link
                    };

                    // console.log(sTime, '  s time');
                    // console.log(eTime, '  e time');

                    // emailService.sendParkingPass(userEmail, obj, (err,resp)=>{
                    //     if(err){
                    //         // return res.status(constant.httpCode.success).json({
                    //         //     success: false,
                    //         //     code: constant.httpCode.badRequest,
                    //         //     message: constant.message.errorSendingEmail,
                    //         //     data: err
                    //         // });
                    //     }
                    //     else{
                    //         // return res.status(constant.httpCode.success).json({
                    //         //     success: true,
                    //         //     code: constant.httpCode.success,
                    //         //     message: constant.message.userAccountCreated,
                    //         //     data: newUser
                    //         // });
                    //     }
                    // });
                    
                    let message;
                    if(isLocationHavingApartment){
                        message = `${userFirstName}, your parking is booked!
Transaction ID: ${newTransactionId},
License Plate: ${licensePlateNumber},
Zone: ${zone},
Location: ${parkingLotName},
Start: ${sTime},
End: ${eTime},
Address: ${address},
Unit/Suite/Apartment Number: ${apartmentNumber}`;
                    }
                    else{
                        message = `${userFirstName}, your parking is booked!
Transaction ID: ${newTransactionId},
License Plate: ${licensePlateNumber},
Zone: ${zone},
Location: ${parkingLotName},
Start: ${sTime},
End: ${eTime},
Address: ${address}`;
                    }

                    environment.twilio.client.messages.create({
                        body: message,
                        to: mobileNumber, // Text this number
                        from: environment.twilio.from
                    })
                    .then((message) => {
                        console.log(message.sid, '  response of message sent from twilio for sendParkingPass');
                    });


                    if(!extendTimeCase){
                        updateParkingLot.update({ $inc: { spacesAvailable: -1 } }, (err, respp) =>{
                            if(respp){
                                socket_controller.getParkingLot(parkingLot);
                                return;
                            }
                            else{
                                console.log(err);
                                return;
                            }
                        });
                    }
                    else{
                        let updatePreviousTransaction = await Transaction.findOneAndUpdate({ _id: previousTransactionId, isDeleted: false }, { $set: { isTimeExtendedForThisTransaction: true } }, { new: true });
                        if(updatePreviousTransaction){
                            console.log('Previous transaction updated');
                        }
                    }

                    let endUser = await User.findOneAndUpdate({ _id: user, isDeleted: false }, { $set: { isUser: true } }, { new: true });
                    if(endUser){
                        endUser.transactions.push(newTransaction);
                        endUser.save();

                        if(isPaymentDoneFromWallet){ // When paying from wallet

                            let getToken = await AuthToken.findOne({});
                            if(getToken){
                                let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
            
                                let parkingFromWalletTransactionData = constant.function.createSalesReceiptForParkingWithWalletPaymentInQuickBooks(endUser, updateParkingLot, newTransaction);

                                qbo.createSalesReceipt(parkingFromWalletTransactionData, function(err, attachable){
                                    if(err){
                                        console.log(err, '   err in create transaction for parking with payment done from wallet 33');
                                    }
                                    else{
                                        console.log(attachable.Id, '   attachable.Id for parking with payment done from wallet');
                                        newTransaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                            if(resolve){
                                                return;
                                            }
                                            else{
                                                return;
                                            }
                                        });
                                    }
                                });


                                let vendorBillData = constant.function.createVendorBillInQuickBooks(associatedVendorId, associatedVendorAttachableId, updateParkingLot, newTransaction);

                                qbo.createBill(vendorBillData, function(err, attachable){
                                    if(err){
                                        console.log(err, '   err in createBill in create transaction when paying from wallet');
                                    }
                                    else{
                                        console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from wallet');
                                        newTransaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
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

                            var newWalletBalance = parseFloat(endUser.walletBalance) - parseFloat(amount);
                            endUser.update({ $set: { walletBalance: newWalletBalance } }, (error, resp) =>{
                                if(resp){
                                    // return;
                                }
                                else{
                                    // console.log(error);
                                    // return;
                                }
                            });





                            // endUser.update({ $push: { walletHistory: newWalletHistory } }, (error, resp) => {
                            //     if(resp){
                            //         // return;
                            //     }
                            //     else{
                            //         // console.log(error);
                            //         // return;
                            //     }
                            // });


                            // let Wallet = new Transaction({
                            //     user: endUser._id,
                            //     currentBalance: currentWalletBalance,
                            //     transactionId: newTransactionId,
                            //     amountCredited: null,
                            //     amountDebited: amount,
                            //     isCredited: false,
                            //     // creditCard: walletHistory.creditCard,
                            //     success: true,
                            //     date: moment.utc(moment().format()).format(),
                            //     startTime: moment.utc(moment().format()).format(),
                            //     endTime: moment.utc(moment().format()).format(),
                            //     isWalletHistory: true,
                            //     location: address,
                            //     zone: zone,
                            //     startTime: startTimeInUtc,
                            //     endTime: endTimeInUtc,
                            //     latitude: latitude,
                            //     longitude: longitude
                            // });
                            // let newWalletHistory = await Wallet.save();
                            // if(newWalletHistory){
                            //     var newWalletBalance = parseFloat(endUser.walletBalance) - parseFloat(amount);
                            //     endUser.update({ $set: { walletBalance: newWalletBalance } }, (error, resp) => {
                            //         if(resp){
                            //             // return;
                            //         }
                            //         else{
                            //             // console.log(error);
                            //             // return;
                            //         }
                            //     });
                            //     endUser.update({ $push: { walletHistory: newWalletHistory } }, (error, resp) => {
                            //         if(resp){
                            //             // return;
                            //         }
                            //         else{
                            //             // console.log(error);
                            //             // return;
                            //         }
                            //     });
                            // }



                            // Auto-reload part ****************************************************************
                            if(endUser.autoReloadWallet && newWalletBalance < 1 && endUser.braintreeCustomerId){
                                console.log('on hai');
                                let customer = await gateway.customer.find(`${endUser.braintreeCustomerId}`);
                                if(customer){
                                    // console.log(customer.creditCards, '     braintree customer');
                                    if(customer.creditCards.length > 0){
                                        let paymentMethodToken;
                                        for(let i = 0;i<customer.creditCards.length;i++){
                                            if(customer.creditCards[i].default){
                                                paymentMethodToken = customer.creditCards[i].token;
                                                break;
                                            }
                                        }
                                        console.log(paymentMethodToken, '    paymentMethodToken');

                                        let result = await gateway.subscription.create({
                                            paymentMethodToken: `${paymentMethodToken}`,
                                            planId: endUser.autoReloadPlanId
                                        });
                                        console.log(result, '    result of auto-reload wallet API');
                                        if(result.success){
                                            let cancelSubscription = await gateway.subscription.cancel(result.subscription.id);
                                            console.log(cancelSubscription, '    cancelSubscription in create Transaction Auto-reload function');
                                            // console.log(result.subscription.transactions[0].id, '   result.transactions of auto-reload wallet test API');
                                            let transactionId = result.subscription.transactions[0].id;
                                            let amount = parseFloat(result.subscription.transactions[0].amount);

                                            let balance = (newWalletBalance + amount).toFixed(2);
                                            let updatedWalletBalance = balance;

                                            let braintreeConvenienceFee = constant.braintreeCredentials.fixedConvenienceFee;
                                            let creditCardPercentage = constant.braintreeCredentials.creditCardPercentage;
                
                                            let creditCardPercentageFee2 = (amount / 100) * creditCardPercentage;
                                            let creditCardPercentageFee = parseFloat(creditCardPercentageFee2);
                
                                            let totalIncomeToBraintree2 = braintreeConvenienceFee + creditCardPercentageFee;
                                            let totalIncomeToBraintree = parseFloat(totalIncomeToBraintree2.toFixed(2));
                
                                            let creditCardFundsHoldingAccount = parseFloat(amount) - parseFloat(totalIncomeToBraintree);
                
                                            creditCardPercentageFee = constant.function.getModulusRoundDown(creditCardPercentageFee);
                                            totalIncomeToBraintree = constant.function.getModulusRoundDown(totalIncomeToBraintree);

                                            let updateMyUser = await User.findOneAndUpdate({ _id: loggedInUser, isDeleted: false }, { $set: { walletBalance: updatedWalletBalance } }, { new: true });
                                            if(updateMyUser){
                                                // Auto-reload wallet transaction
                                                let Wallet2 = new Transaction({
                                                    user: updateMyUser,
                                                    currentBalance: updatedWalletBalance,
                                                    transactionId: transactionId,
                                                    amountCredited: amount,
                                                    amountDebited: '',
                                                    creditCardFundsHoldingAccount: creditCardFundsHoldingAccount,
                                                    isCredited: true,
                                                    isCreditDoneFromAutoReload: true,
                                                    // creditCard: walletHistory.creditCard,
                                                    success: true,
                                                    braintreeConvenienceFee: braintreeConvenienceFee,
                                                    creditCardFee: creditCardPercentageFee,
                                                    totalIncomeToBraintree: totalIncomeToBraintree,
                                                    date: moment.utc(moment().format()).format(),
                                                    isWalletHistory: true,
                                                    isCompleted: true,
                                                    isPaymentDone: true,

                                                    amount: amount
                                                    // startTime: moment.utc(moment().format()).format(),
                                                    // endTime: moment.utc(moment().format()).format()
                                                });
                                                let newWalletHistory2 = await Wallet2.save();
                                                if(!newWalletHistory2){
                                                    // return res.status(constant.httpCode.success).json({
                                                    //     success: false,
                                                    //     code: constant.httpCode.badRequest,
                                                    //     message: constant.message.errorAddingMoneyToWallet,
                                                    //     data: []
                                                    // });
                                                }
                                                else{

                                                    let getToken = await AuthToken.findOne({});
                                                    if(getToken){
                                                        let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
                                    
                                                        let walletLoadTransactionData = constant.function.createSalesReceiptForWalletLoadInQuickBooks(updateMyUser, newWalletHistory2);
                                    
                                                        qbo.createSalesReceipt(walletLoadTransactionData, function(err, attachable){
                                                            if(err){
                                                                console.log(err, '   err in create transaction for wallet load 44');
                                                            }
                                                            else{
                                                                console.log(attachable.Id, '   attachable.Id for wallet load');
                                                                newWalletHistory2.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
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

                                                    // updateMyUser.walletHistory.push(newWalletHistory2);
                                                    // updateMyUser.save();

                                                    updateMyUser.transactions.push(newWalletHistory2);
                                                    updateMyUser.save();

                                                    // return res.status(constant.httpCode.success).json({
                                                    //     success: true,
                                                    //     code: constant.httpCode.success,
                                                    //     message: constant.message.userUpdated,
                                                    //     data: updateMyUser
                                                    // });
                                                }
                                            }
                                            else{
                                                // return res.status(constant.httpCode.success).json({
                                                //     success: true,
                                                //     code: constant.httpCode.success,
                                                //     message: constant.message.userUpdated,
                                                //     data: updateMyUser
                                                // });
                                            }
                                        }
                                        else{
                                            // return res.status(constant.httpCode.success).json({
                                            //     success: true,
                                            //     code: constant.httpCode.success,
                                            //     message: constant.message.userUpdated,
                                            //     data: updateMyUser
                                            // });
                                        }
                                    }
                                    else{
                                        // return res.status(constant.httpCode.success).json({
                                        //     success: true,
                                        //     code: constant.httpCode.success,
                                        //     message: constant.message.userUpdated,
                                        //     data: updateMyUser
                                        // });
                                    }
                                }
                                else{
                                    // return res.status(constant.httpCode.success).json({
                                    //     success: true,
                                    //     code: constant.httpCode.success,
                                    //     message: constant.message.userUpdated,
                                    //     data: updateMyUser
                                    // });
                                }
                            }
                            else{
                                // console.log('Auto Reload Wallet is off');
                                // return res.status(constant.httpCode.success).json({
                                //     success: true,
                                //     code: constant.httpCode.success,
                                //     message: constant.message.userUpdated,
                                //     data: updateMyUser
                                // });
                            }
                            // Auto-reload end ****************************************************************



                        }
                        else{ // When paying from credit card
                            let getToken = await AuthToken.findOne({});
                            if(getToken){
                                let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

                                let directTransactionData = constant.function.createSalesReceiptForParkingWithCreditCardPaymentInQuickBooks(endUser, updateParkingLot, newTransaction);
        
                                qbo.createSalesReceipt(directTransactionData, function(err, attachable){
                                    if(err){
                                        console.log(err, '   err in create transaction in direct payment for parking');
                                    }
                                    else{
                                        // console.log(attachable.Id, '   attachable.Id');
                                        newTransaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                            if(resolve){
                                                return;
                                            }
                                            else{
                                                return;
                                            }
                                        });
                                    }
                                });


                                let vendorBillData = constant.function.createVendorBillInQuickBooks(associatedVendorId, associatedVendorAttachableId, updateParkingLot, newTransaction);

                                qbo.createBill(vendorBillData, function(err, attachable){
                                    if(err){
                                        console.log(err, '   err in createBill in create transaction when paying from credit card');
                                    }
                                    else{
                                        console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from credit card');
                                        newTransaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
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
                        }

                        updateParkingLot.transactions.push(newTransaction);
                        updateParkingLot.save();

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreated,
                            data: endUser,
                            transaction: newTransaction
                        });
                    }
                    else{
                        updateParkingLot.transactions.push(newTransaction);
                        updateParkingLot.save();

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreated,
                            data: [],
                            transaction: newTransaction
                        });
                    }
                }
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorCreatingTransaction,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllTransactions = async (req, res) => {
    try {
        // console.log(req.body, '  req.body of getAllTransactions');
        let loggedInUser = req.user._id;
        const { page, perPage, sort, isDateFilter, startTime, endTime, isSearch, searchVal, isAdmin, showActiveInactiveTransaction } = req.body;
        let sortby = { createdAt: -1 };

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user parkingLot manager refundedTransaction' }),
        };

        let query;
        // Is admin
        if(isAdmin){
            if(isDateFilter){
                let startTimeInUtc = moment.utc(startTime).format();
                let endTimeInUtc = moment.utc(endTime).format();
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){ query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }], date: { $gt: startTimeInUtc }, date: { $lt: endTimeInUtc }, isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){ query = { date: { $gt: startTimeInUtc }, date: { $lt: endTimeInUtc }, isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
            }
            else{
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }], isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
            }
            // showActiveInactiveTransaction == '1' ? query = { isDeleted: false } : showActiveInactiveTransaction == '2' ? query = { isCompleted: false, isDeleted: false } : query = { isCompleted: true, isDeleted: false };
        }

        //Not a admin
        else{
            if(isDateFilter){
                let startTimeInUtc = moment.utc(startTime).format();
                let endTimeInUtc = moment.utc(endTime).format();
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
            }
            else{
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
            }
            // showActiveInactiveTransaction == '1' ? query = { manager: loggedInUser, isDeleted: false } : showActiveInactiveTransaction == '2' ? query = { isCompleted: false, manager: loggedInUser, isDeleted: false } : query = { isCompleted: true, manager: loggedInUser, isDeleted: false };
        }

        let transactions = await Transaction.paginate(query, options);
        if(transactions.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(transactions){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getTransactionsForManager = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const { id, page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user manager parkingLot refundedTransaction' }),
        };

        let transactions = await Transaction.paginate({ manager: loggedInUser, isDeleted: false }, options);
        if(transactions){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getUserTransactions = async (req, res) => {
    try {
        const { id, page, perPage, sort } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user manager parkingLot refundedTransaction' }),
        };

        let transactions = await Transaction.paginate({ user: id, isDeleted: false }, options);
        if(transactions){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getTransactionById = async (req, res) => {
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
            let transaction = await Transaction.findOne({ _id: id, isDeleted: false }).populate('user parkingLot refundedTransaction');
            if(transaction){

                // transaction.associatedSocialSecurityNumber = transaction.associatedSocialSecurityNumber ? cryptr.decrypt(transaction.associatedSocialSecurityNumber) : '';
                // transaction.associatedEmployerIdentificationNumber = transaction.associatedEmployerIdentificationNumber ? cryptr.decrypt(transaction.associatedEmployerIdentificationNumber) : '';
                
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: transaction
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.searchTransaction = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '   req.body of searchTransaction');
        let { page, perPage, search, isAdmin, showActiveInactiveTransaction } = req.body;
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user manager parkingLot refundedTransaction' }),
        };

        let query;
        if(isAdmin){
            if(showActiveInactiveTransaction == '1'){
                query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], isDeleted: false };
            }
            else{
                if(showActiveInactiveTransaction == '2'){
                    query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], isCompleted: false, isDeleted: false };
                }
                else{
                    query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], isCompleted: true, isDeleted: false };
                }
            }
            // query = { $or: [ { transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } } ], isDeleted: false };
        }
        else{
            if(showActiveInactiveTransaction == '1'){
                query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], manager: loggedInUser, isDeleted: false };
            }
            else{
                if(showActiveInactiveTransaction == '2'){
                    query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], isCompleted: false, manager: loggedInUser, isDeleted: false };
                }
                else{
                    query = { $or: [{ transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }], isCompleted: true, manager: loggedInUser, isDeleted: false };
                }
            }
            // query = { $or: [ { transactionId: { $regex: search, $options: 'i' } }, { parkingLotName: { $regex: search, $options: 'i' } }, { zone: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } } ], manager: loggedInUser, isDeleted: false };
        }

        let transactionList = await Transaction.paginate(query, options);
        if(transactionList.docs.length === 0){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.success,
                message: constant.message.dataNotFound,
                data: []
            });
        }
        else if(transactionList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactionList
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotsAndUsers = async (req, res) => {
    try {
        let users, parkingLots;

        let parkingLotsList = await ParkingLot.find({ isActivated: true, isDeleted: false });
        if(parkingLotsList){
            parkingLots = parkingLotsList;
            getUsers();
        }
        else{
            parkingLots = [];
            getUsers();
        }

        async function getUsers(){
            let usersList = await User.find({ isDeleted: false });
            if(usersList){
                users = usersList;
                sendResponse();
            }
            else{
                transactions = {};
                sendResponse();
            }
        }

        function sendResponse(){
            let result = { users: users, parkingLots: parkingLots };
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

exports.getTransactionByDateFilter = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '   req.body of getTransactionByDateFilter');
        let { page, perPage, startTime, endTime, isAdmin, filterByDate } = req.body;

        let startTimeInUtc = moment.utc(startTime).format();
        let endTimeInUtc = moment.utc(endTime).format();

        // console.log(startTimeInUtc, '  startTimeInUtc');
        // console.log(endTimeInUtc, '  endTimeInUtc');

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user manager parkingLot refundedTransaction' }),
        };

        let query;
        if(isAdmin){
            // query = { startTime: { $gt: startTimeInUtc }, startTime: { $lt: endTime }, isDeleted: false };
            query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isDeleted: false };
        }
        else{
            query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isDeleted: false };
        }

        let transactionList = await Transaction.paginate(query, options);
        if(transactionList.docs.length === 0){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.success,
                message: constant.message.dataNotFound,
                data: []
            });
        }
        else if(transactionList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactionList
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

// exports.getParkingLotAndTransaction = async (req, res)=>{
//     try{
//         // console.log(req.body, '   req body of getParkingLotAndTransaction');
//         let { id, tId, extend } = req.body;
//         let parkingLotId = cryptr.decrypt(id);
//         let transactionId = cryptr.decrypt(tId);

//         let result;

//         let parkingLot = await ParkingLot.findOne({ _id: parkingLotId, isActivated: true, isDeleted: false }).populate('wNine manager');
//         if(parkingLot){
//             let transaction = await Transaction.findOne({ _id: transactionId, isDeleted: false });
//             if(transaction){
//                 // console.log(transaction, '  transaction');
//                 let endTime = transaction.endTime;
//                 if(moment.utc().format() > endTime || transaction.isTimeExtendedForThisTransaction){
//                     return res.status(constant.httpCode.success).json({
//                         success: false,
//                         code: constant.httpCode.badRequest,
//                         message: constant.message.linkExpired,
//                         data: []
//                     });
//                 }
//                 else{
//                     result = { parkingLot: parkingLot, transaction: transaction };
//                     return res.status(constant.httpCode.success).json({
//                         success: true,
//                         code: constant.httpCode.success,
//                         message: constant.message.dataFound,
//                         data: result
//                     });
//                 }
//             }
//             else{
//                 return res.status(constant.httpCode.success).json({
//                     success: false,
//                     code: constant.httpCode.notFound,
//                     message: constant.message.dataNotFound,
//                     data: []
//                 });
//             }
//         }
//         else{
//             return res.status(constant.httpCode.success).json({
//                 success: false,
//                 code: constant.httpCode.notFound,
//                 message: constant.message.dataNotFound,
//                 data: []
//             });
//         }
//     } catch (err) {
//         constant.function.serverError(res, err);
//     }
// }

//New API
exports.getParkingLotAndTransaction = async (req, res) => {
    try {
        // console.log(req.body, '   req body of getParkingLotAndTransaction NEW API');
        let { id } = req.body;
        // let parkingLotId = cryptr.decrypt(id);
        // let transactionId = cryptr.decrypt(tId);
        let result;
        let shortUrl = await ShortUrl.findOne({ shortId: id, isDeleted: false });
        if(shortUrl){
            let parkingLot = await ParkingLot.findOne({ _id: shortUrl.parkingLotId, isActivated: true, isDeleted: false }).populate('wNine manager');
            if(parkingLot){
                let transaction = await Transaction.findOne({ _id: shortUrl.transactionId, isDeleted: false });
                if(transaction){
                    // console.log(transaction, '  transaction');
                    let endTime = transaction.endTime;
                    if(moment.utc().format() > endTime || transaction.isTimeExtendedForThisTransaction){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.badRequest,
                            message: constant.message.linkExpired,
                            data: []
                        });
                    }
                    else{
                        result = { parkingLot: parkingLot, transaction: transaction };
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.dataFound,
                            data: result
                        });
                    }
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: []
                    });
                }
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.linkExpired,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getTransactionDataForCsv = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        const {
            page,
            perPage,
            sort,
            isDateFilter,
            startTime,
            endTime,
            isSearch,
            searchVal,
            isAdmin,
            showActiveInactiveTransaction
        } = req.body;

        let query;

        // Is admin
        if(isAdmin){
            if(isDateFilter){
                let startTimeInUtc = moment.utc(startTime).format();
                let endTimeInUtc = moment.utc(endTime).format();
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }], date: { $gt: startTimeInUtc }, date: { $lt: endTimeInUtc }, isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { date: { $gt: startTimeInUtc }, date: { $lt: endTimeInUtc }, isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
            }
            else{
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }], isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { isCompleted: false, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '3'){
                        query = { isCompleted: true, isParkingTransaction: true, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '4'){
                        query = { isWalletHistory: true, isParkingTransaction: false, isCompleted: true, isDeleted: false };
                    }
                }
            }
            // showActiveInactiveTransaction == '1' ? query = { isDeleted: false } : showActiveInactiveTransaction == '2' ? query = { isCompleted: false, isDeleted: false } : query = { isCompleted: true, isDeleted: false };
        }

        // Not a admin
        else{
            if(isDateFilter){
                let startTimeInUtc = moment.utc(startTime).format();
                let endTimeInUtc = moment.utc(endTime).format();
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
            }
            else{
                if(isSearch){
                    if(showActiveInactiveTransaction == '1'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { $or: [{ transactionId: { $regex: searchVal, $options: 'i' } }, { parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }, { userEmail: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
                else{
                    if(showActiveInactiveTransaction == '1'){
                        query = { manager: loggedInUser, isDeleted: false };
                    }
                    else if(showActiveInactiveTransaction == '2'){
                        query = { manager: loggedInUser, isCompleted: false, isDeleted: false };
                    }
                    else{
                        query = { manager: loggedInUser, isCompleted: true, isDeleted: false };
                    }
                }
            }
        }

        // let transactions = await Transaction.find(query).populate('user manager parkingLot');
        let transactions = await Transaction.find(query).populate({ path: 'parkingLot user manager', populate: { path: 'wNine', model: 'Wnine' } });
        if(transactions){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: transactions
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataNotFound,
                data: []
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.sendContactUsForm = async (req, res) => {
    try {
        console.log(req.body, '  contact us request req.body');
        let { name, email, countryCode, mobileNumber, message } = req.body;
        let id = constant.function.generateShortId();
        const contactUs = new Contact({
            id: id,
            name: name,
            email: email,
            countryCode: countryCode,
            mobileNumber: mobileNumber,
            message: message,
        });

        // var mailOptions = {
        //     from: 'test70870@gmail.com',
        //     to: 'test70870@gmail.com',
        //     subject: 'Support ticket',
        //     html: `Ticket Id: ${id},<br>Name: ${name},<br>Email: ${email},<br>Mobile Number: ${countryCode} ${mobileNumber},<br>Message: ${message}`
        // };
        // environment.nodemailer.transporter.sendMail(mailOptions, function(error, info){
        //     if(error){
        //         console.log('Support ticket not sent: ', error);
        //     }
        //     else{
        //         console.log('Support ticket sent: ', info.response);
        //     }
        // });

        let newContactUs = await contactUs.save();
        if(!newContactUs){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorSendingContactUsForm,
                data: []
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.contactUsFormSent,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllContactMessages = async (req, res) => {
    try {
        // console.log(req.body, '  req.body of getAllContactMessages');
        let loggedInUser = req.user._id;
        const { page, perPage, sort } = req.body;
        let sortby = { createdAt: -1 };

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };

        let contactMessages = await Contact.paginate({ isDeleted: false }, options);
        if(contactMessages.docs.length === 0){
            constant.function.dataNotFound(res);
        }
        else if(contactMessages){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: contactMessages
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.searchContactMessages = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        let { page, perPage, search } = req.body;
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };
        let contactMessagesList = await Contact.paginate({ $or: [{ id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { mobileNumber: { $regex: search, $options: 'i' } }], isDeleted: false }, options);
        if(contactMessagesList.docs.length === 0){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.success,
                message: constant.message.dataNotFound,
                data: []
            });
        }
        else if(contactMessagesList){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: contactMessagesList
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.deleteContactUsMessage = async (req, res) => {
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
            let deleteContactUsMessage = await Contact.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
            if(deleteContactUsMessage){
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.contactUsMessageDeleted,
                    data: []
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.contactUsMessageNotFound,
                    data: []
                });
            }
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.switchAccountToHost = async (req, res) => {
    try {
        let loggedInUser = req.user._id;

        let { isAdmin, userId } = req.query;
        let query, isAccountSwitchedFromUserToManagerByAdmin;

        if(isAdmin == 'true'){
            query = {
                _id: userId,
                isDeleted: false
            };
            isAccountSwitchedFromUserToManagerByAdmin = true;
        }
        else{
            query = {
                _id: req.user._id,
                isDeleted: false
            };
            isAccountSwitchedFromUserToManagerByAdmin = false;
        }

        let switchAccountToHost = await User.findOneAndUpdate(query, { $set: { isManager: true, isAccountSwitchedFromUserToManager: true, isAccountSwitchedFromUserToManagerByAdmin: isAccountSwitchedFromUserToManagerByAdmin, userToManagerSwitchDate: moment.utc(moment().format()).format() } }, { new: true });
        if(switchAccountToHost){
            const token = switchAccountToHost.generateAuthToken();
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.accountSwitchedToHost,
                data: switchAccountToHost,
                role: switchAccountToHost.role,
                token: token
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorSwitchingAccountToHost,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getMonthlyRevenue = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req body of getMonthlyRevenue');
        const { page, perPage, sort, startTime, endTime, isSearch, searchVal } = req.body;

        let startTimeInUtc = moment.utc(startTime).format();
        let endTimeInUtc = moment.utc(endTime).format();

        let result = [];

        let queryOfParkingLot;
        if(isSearch){
            queryOfParkingLot = { $or: [{ parkingLotName: { $regex: searchVal, $options: 'i' } }, { zone: { $regex: searchVal, $options: 'i' } }] };
        }
        else{
            queryOfParkingLot = {};
        }
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };

        let query;
        let parkingLots = await ParkingLot.paginate(queryOfParkingLot, options);
        if(parkingLots){
            for(let i=0;i<parkingLots.docs.length;i++){
                query = [{ $match: { zone: parkingLots.docs[i].zone, startTime: { $gt: startTimeInUtc }, endTime: { $lt: endTimeInUtc }, isParkingTransaction: true, isDeleted: false } }, { $group: { _id: null, earningToLot: { $sum: "$earningToLot" }, earningToAdmin: { $sum: "$earningToAdmin" }, amount: { $sum: "$amount" }, totalIncomeToBraintree: { $sum: "$totalIncomeToBraintree" } } }];
                let transactionSpecificToZone = await Transaction.aggregate(query);
                if(transactionSpecificToZone){
                    if(transactionSpecificToZone[0] == undefined){
                        result.push({
                            parkingLotName: parkingLots.docs[i].parkingLotName,
                            zone: parkingLots.docs[i].zone,
                            earningToAdmin: 0,
                            earningToLot: 0,
                            amount: 0,
                            totalIncomeToBraintree: 0
                        });
                    }
                    else{
                        result.push({
                            parkingLotName: parkingLots.docs[i].parkingLotName,
                            zone: parkingLots.docs[i].zone,
                            earningToAdmin: transactionSpecificToZone[0].earningToAdmin,
                            earningToLot: transactionSpecificToZone[0].earningToLot,
                            amount: transactionSpecificToZone[0].amount,
                            totalIncomeToBraintree: transactionSpecificToZone[0].totalIncomeToBraintree
                        });
                    }
                }
                // else{
                //     constant.function.dataNotFound();
                // }
            }

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                total: parkingLots.total,
                data: result
            });

            // zones.forEach(element => {
            //     console.log(element, '  zone');
            //     let transactionSpecificToZone = await Transaction.aggregate([{ $match: { zone: element, isDeleted: false } }, { $group: { _id: null, amount: { $sum: "$amount" } } }]);
            //     console.log(transactionSpecificToZone, '   test');
            // });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.dataNotFound,
                data: []
            });
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getPlacesSuggestions = async (req, res) => {
    try {
        let { value } = req.query;

        let isZoneFound = false;
        let zoneData = {};

        if(value.length > 5){
            // console.log('Length greater than 5');
            let parkingLot = await ParkingLot.findOne({ zone: value, isActivated: true, isDeleted: false });
            if(parkingLot){
                isZoneFound = true;
                zoneData = parkingLot;
                searchGooglePlace();
            }
            else{
                isZoneFound = false;
                zoneData = {};
                searchGooglePlace();
            }
        }
        else{
            searchGooglePlace();
        }

        function searchGooglePlace(){
            // let link = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=geocode&key=${constant.googlePlacesApiKey}&components=country:us`;
            let link = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&rankby=distance&key=${constant.googlePlacesApiKey}&components=country:us`;
            request(link, function (error, response, body){
                // console.log('error:', error);
                // console.log('statusCode:', response.statusCode);
                // console.log('body:', body);
                if(response.statusCode == 200){
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.dataFound,
                        data: JSON.parse(body),
                        isZoneFound: isZoneFound,
                        zoneData: zoneData
                    });
                }
                else{
                    constant.function.dataNotFound(res);
                }
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getLatLongByPlaceId = async (req, res) => {
    try {
        let { place_id } = req.query;

        let link = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${constant.googlePlacesApiKey}`;

        request(link, function (error, response, body){
            // console.log('error:', error);
            // console.log('statusCode:', response.statusCode);
            // console.log('body:', body);

            if(response.statusCode == 200){
                // console.log('body:', body);
                let result = JSON.parse(body).results[0].geometry;
                // console.log(result, '   result');
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: result
                });
            }
            else{
                constant.function.dataNotFound(res);
            }

        });
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getUsersDataForCsv = async (req, res) => {
    try {
        let users = await User.find({ isUser: true, isDeleted: false });
        if(users){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: users
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getManagersDataForCsv = async (req, res) => {
    try {
        let users = await User.find({ isManager: true, isDeleted: false });
        if(users){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: users
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getParkingLotsDataForCsv = async (req, res) => {
    try {
        // console.log(req.query, ' req query');
        let loggedInUser = req.user._id;
        let query;
        let user = await User.findOne({ _id: loggedInUser, isDeleted: false });
        if(user){
            if(user.role == '1'){
                query = { isDeleted: false };
            }
            else{
                query = { manager: loggedInUser, isDeleted: false };
            }
            let parkingLots = await ParkingLot.find(query).populate('manager wNine');
            if(parkingLots){

                // console.log(parkingLots, '   parkingLots');

                // parkingLots.forEach(element => {
                //     element.wNine.w9socialSecurityNumber = element.wNine.w9socialSecurityNumber?cryptr.decrypt(element.wNine.w9socialSecurityNumber):'';
                //     element.wNine.w9employerIdentificationNumber = element.wNine.w9employerIdentificationNumber?cryptr.decrypt(element.wNine.w9employerIdentificationNumber):'';
                // });

                // parkingLots.forEach(element => {
                //     element.wNine.w9socialSecurityNumber = cryptr.decrypt(element.wNine.w9socialSecurityNumber);
                //     element.wNine.w9employerIdentificationNumber = cryptr.decrypt(element.wNine.w9employerIdentificationNumber);
                // });

                // for(let i=0;i<parkingLots.length;i++){
                //     parkingLots[i].wNine.w9socialSecurityNumber = cryptr.decrypt(parkingLots[i].wNine.w9socialSecurityNumber);
                //     parkingLots[i].wNine.w9employerIdentificationNumber = cryptr.decrypt(parkingLots[i].wNine.w9employerIdentificationNumber);
                // }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: parkingLots
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
        else{
            constant.function.unauthorizedAccess(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getWNineDataForCsv = async (req, res) => {
    try {
        // console.log(req.query, ' req query');
        let loggedInUser = req.user._id;
        let query = { isDeleted: false };
        // let user = await User.findOne({ _id: loggedInUser, isDeleted: false });
        // if(user){
        //     if(user.role == '1'){
        //         query = { isDeleted: false };
        //     }
        //     else{
        //         query = { manager: loggedInUser, isDeleted: false };
        //     }
        let wNine = await Wnine.find(query).populate('manager');
        if(wNine){
            // console.log(wNine, '    wNine in getWNineDataForCsv');
            for(let i=0;i<wNine.length;i++){
                wNine[i].w9socialSecurityNumber = cryptr.decrypt(wNine[i].w9socialSecurityNumber);
                wNine[i].w9employerIdentificationNumber = cryptr.decrypt(wNine[i].w9employerIdentificationNumber);
            }

            // wNine.forEach(element => {
            //     element.w9socialSecurityNumber = cryptr.decrypt(element.w9socialSecurityNumber);
            //     element.w9employerIdentificationNumber = cryptr.decrypt(element.w9employerIdentificationNumber);
            // });


            // let newWNine =  wNine.map(({w9socialSecurityNumber, w9employerIdentificationNumber})=>{
            //     return {
            //         w9socialSecurityNumber: w9socialSecurityNumber?cryptr.decrypt(w9socialSecurityNumber):'',
            //         w9employerIdentificationNumber: w9employerIdentificationNumber?cryptr.decrypt(w9employerIdentificationNumber):''
            //     }
            // });

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: wNine
                // data: newWNine
            });
        }
        else{
            constant.function.dataNotFound(res);
        }
        // }
        // else{
        //     constant.function.unauthorizedAccess(res);
        // }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getAllWNineForms = async (req, res) => {
    try {
        // console.log(req.query, '   req.query of getAllWNineForms');
        let loggedInUser = req.user._id;
        const { page, perPage, sort, isSearch, searchVal } = req.query;
        let sortby = { createdAt: -1 };
        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            // populate: ({ path: 'parkingLot' })
        };

        let query;
        if(isSearch == 'true'){
            query = { $or: [{ w9Id: { $regex: searchVal, $options: 'i' } }], isDeleted: false };
        }
        else{
            query = { isDeleted: false };
        }

        let wNine = await Wnine.paginate(query, options);
        if(wNine){
            if(wNine.docs.length === 0){
                constant.function.dataNotFound(res);
            }
            else if(wNine){
                // wNine.forEach(element => {
                //     element.w9socialSecurityNumber = cryptr.decrypt(element.w9socialSecurityNumber);
                //     element.w9employerIdentificationNumber = cryptr.decrypt(element.w9employerIdentificationNumber);
                // });
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: wNine
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

exports.getMyWNineForms = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of getMyWNineForms');
        let loggedInUser = req.user._id;
        let { isAdmin, manager, page, perPage, search, searchVal } = req.body;
        let query;

        if(isAdmin){
            query = { isDeleted: false, manager: manager };
        }
        else{
            if(search){
                query = { $or: [{ w9Id: { $regex: searchVal, $options: 'i' } }], manager: loggedInUser, isDeleted: false };
            }
            else{
                query = { manager: loggedInUser, isDeleted: false };
            }
        }

        let wNine = await Wnine.find(query).sort({ createdAt: -1 });
        if(wNine){
            if(wNine.length == 0){
                constant.function.dataNotFound(res);
            }
            else{
                // wNine.forEach(element => {
                //     element.w9socialSecurityNumber = cryptr.decrypt(element.w9socialSecurityNumber);
                //     element.w9employerIdentificationNumber = cryptr.decrypt(element.w9employerIdentificationNumber);
                // });
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: wNine
                });
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getWNineById = async (req, res) => {
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
        // console.log(req.query, '   req.query of get w9 by id');
        let loggedInUser = req.user._id;
        let { id, isAdmin } = req.query;
        let query;
        if(isAdmin == 'true'){
            query = { _id: id, isDeleted: false };
        }
        else{
            query = { _id: id, manager: loggedInUser, isDeleted: false };
        }

        let wnine = await Wnine.findOne(query).populate('manager');
        if(wnine){
            wnine.w9socialSecurityNumber = cryptr.decrypt(wnine.w9socialSecurityNumber);
            wnine.w9employerIdentificationNumber = cryptr.decrypt(wnine.w9employerIdentificationNumber);
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: wnine
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

exports.checkIfSsnAlreadyAvailable = async (req, res) => {
    try {
        // let loggedInUser = req.user._id;
        console.log(req.body, '   req body of checkIfSsnAlreadyAvailable');
        let ssn = req.body.ssn;
        let isEdit = req.body.isEdit;
        let allSsn = [];
        let isSsnAvailable = false;
        let wNine = await Wnine.find({ isDeleted: false });
        if(wNine){
            if(wNine.length > 0){
                for(let i=0;i<wNine.length;i++){
                    // const a = wNine[i].w9socialSecurityNumber?cryptr.decrypt(wNine[i].w9socialSecurityNumber):null;
                    // const b = wNine[i].w9employerIdentificationNumber?cryptr.decrypt(wNine[i].w9employerIdentificationNumber):null;
                    const a = cryptr.decrypt(wNine[i].w9socialSecurityNumber);
                    const b = cryptr.decrypt(wNine[i].w9employerIdentificationNumber);
                    if(a === ssn || b === ssn){
                        isSsnAvailable = true;
                        break;
                    }
                }
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: isSsnAvailable
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: isSsnAvailable
                });
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.checkIfEinAlreadyAvailable = async (req, res) => {
    try {
        // let loggedInUser = req.user._id;
        console.log(req.body, '   req body of checkIfEinAlreadyAvailable');
        let ein = req.body.ein;
        let isEdit = req.body.isEdit;
        let allEin = [];
        let isEinAvailable = false;
        let wNine = await Wnine.find({ isDeleted: false });
        if(wNine){
            if(wNine.length > 0){
                // for(let i=0;i<wNine.length;i++){
                //     const c = wNine[i].w9employerIdentificationNumber?cryptr.decrypt(wNine[i].w9employerIdentificationNumber):null;
                //     if(c === ein){
                //         isEinAvailable = true;
                //         break;
                //     }
                // }

                for(let i=0;i<wNine.length;i++){
                    const c = cryptr.decrypt(wNine[i].w9employerIdentificationNumber);
                    if(c === ein){
                        isEinAvailable = true;
                        break;
                    }
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: isEinAvailable
                });
            }
            else{
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.dataFound,
                    data: isEinAvailable
                });
            }

        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.addMyWNine = async (req, res) => {
    try {
        let { isAdmin, manager } = req.body;

        isAdmin ? manager = manager : manager = req.user._id;

        // let manager = req.user._id;
        let {
            earningToVendor,
            earningToAdmin,
            w9name,
            w9firstName,
            w9middleName,
            w9lastName,
            w9businessName,
            w9individualSoleProprietorOrSingleMemberLlc,
            w9cCorporation,
            w9sCorporation,
            w9partnership,
            w9trustEstate,
            w9limitedLiabilityCompanyEnterTaxClassification,
            w9limitedLiabilityCompanyEnterTaxClassificationInput,
            w9LlcCCorporation,
            w9LlcSCorporation,
            w9LlcPartnership,
            w9other,
            w9otherInput,
            w9exemptPayeeCode,
            w9exemptionFromFatcaReportingCode,
            w9address,
            w9city,
            w9state,
            w9zipcode,
            w9accountNumbers,
            w9selectTaxId,
            w9isSsnFilled,
            w9socialSecurityNumber,
            w9employerIdentificationNumber,
            bankName,
            accountNameAttachedTo,
            accountNickName,
            routingNumber,
            accountNumber,
            confirmAccountNumber,
            acceptTerms,
            acceptTermsTime,
        } = req.body.wNineData;

        let wNine = new Wnine({
            w9Id: w9isSsnFilled ? `S` + constant.function.generateShortId() : `E` + constant.function.generateShortId(),
            manager: manager,
            earningToVendor: earningToVendor,
            earningToAdmin: earningToAdmin,
            w9name: w9name,
            w9firstName: w9firstName,
            w9middleName: w9middleName,
            w9lastName: w9lastName,
            w9businessName: w9businessName,
            w9individualSoleProprietorOrSingleMemberLlc: w9individualSoleProprietorOrSingleMemberLlc,
            w9cCorporation: w9cCorporation,
            w9sCorporation: w9sCorporation,
            w9partnership: w9partnership,
            w9trustEstate: w9trustEstate,
            w9limitedLiabilityCompanyEnterTaxClassification: w9limitedLiabilityCompanyEnterTaxClassification,
            w9limitedLiabilityCompanyEnterTaxClassificationInput: w9limitedLiabilityCompanyEnterTaxClassificationInput,
            w9LlcCCorporation: w9LlcCCorporation,
            w9LlcSCorporation: w9LlcSCorporation,
            w9LlcPartnership: w9LlcPartnership,
            w9other: w9other,
            w9otherInput: w9otherInput,
            w9exemptPayeeCode: w9exemptPayeeCode,
            w9exemptionFromFatcaReportingCode: w9exemptionFromFatcaReportingCode,
            w9address: w9address,
            w9city: w9city,
            w9state: w9state,
            w9zipcode: w9zipcode,
            w9accountNumbers: w9accountNumbers,
            w9selectTaxId: w9selectTaxId,
            w9isSsnFilled: w9isSsnFilled,
            w9socialSecurityNumber: cryptr.encrypt(w9socialSecurityNumber),
            w9employerIdentificationNumber: cryptr.encrypt(w9employerIdentificationNumber),
            bankName: bankName,
            accountNameAttachedTo: accountNameAttachedTo,
            accountNickName: accountNickName,
            routingNumber: routingNumber,
            accountNumber: accountNumber,
            confirmAccountNumber: confirmAccountNumber,
            acceptTerms: acceptTerms,
            acceptTermsTime: acceptTermsTime,
        });

        let newWNine = await wNine.save();
        if(!newWNine){
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorCreatingWnine,
                data: []
            });
        }
        else{

            let host = await User.findOne({ _id: manager, isDeleted: false });
            if(host){
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
    
                    let vendorData = constant.function.createVendorDataForQuickBooks(newWNine, host);
        
                    qbo.createVendor(vendorData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in createVendor in addMyWNine');
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id of addMyWNine');
                            newWNine.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
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
            }
            else{
                console.log(constant.message.dataNotFound);
            }


            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.badRequest,
                message: constant.message.wNineCreated,
                data: newWNine
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editMyWNine = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of edit w9');
        let id = req.body._id;
        let {
            // _id,
            earningToVendor,
            earningToAdmin,
            w9name,
            w9firstName,
            w9middleName,
            w9lastName,
            w9businessName,
            w9individualSoleProprietorOrSingleMemberLlc,
            w9cCorporation,
            w9sCorporation,
            w9partnership,
            w9trustEstate,
            w9limitedLiabilityCompanyEnterTaxClassification,
            w9limitedLiabilityCompanyEnterTaxClassificationInput,
            w9LlcCCorporation,
            w9LlcSCorporation,
            w9LlcPartnership,
            w9other,
            w9otherInput,
            w9exemptPayeeCode,
            w9exemptionFromFatcaReportingCode,
            w9address,
            w9city,
            w9state,
            w9zipcode,
            w9accountNumbers,
            w9selectTaxId,
            w9isSsnFilled,
            w9socialSecurityNumber,
            w9employerIdentificationNumber,
            bankName,
            accountNameAttachedTo,
            accountNickName,
            routingNumber,
            accountNumber,
            confirmAccountNumber,
            // acceptTerms,
            // acceptTermsTime,
        } = req.body;

        let updatedData = {
            // _id: _id,
            earningToVendor: earningToVendor,
            earningToAdmin: earningToAdmin,
            w9name: w9name,
            w9firstName: w9firstName,
            w9middleName: w9middleName,
            w9lastName: w9lastName,
            w9businessName: w9businessName,
            w9individualSoleProprietorOrSingleMemberLlc: w9individualSoleProprietorOrSingleMemberLlc,
            w9cCorporation: w9cCorporation,
            w9sCorporation: w9sCorporation,
            w9partnership: w9partnership,
            w9trustEstate: w9trustEstate,
            w9limitedLiabilityCompanyEnterTaxClassification: w9limitedLiabilityCompanyEnterTaxClassification,
            w9limitedLiabilityCompanyEnterTaxClassificationInput: w9limitedLiabilityCompanyEnterTaxClassificationInput,
            w9LlcCCorporation: w9LlcCCorporation,
            w9LlcSCorporation: w9LlcSCorporation,
            w9LlcPartnership: w9LlcPartnership,
            w9other: w9other,
            w9otherInput: w9otherInput,
            w9exemptPayeeCode: w9exemptPayeeCode,
            w9exemptionFromFatcaReportingCode: w9exemptionFromFatcaReportingCode,
            w9address: w9address,
            w9city: w9city,
            w9state: w9state,
            w9zipcode: w9zipcode,
            w9accountNumbers: w9accountNumbers,
            w9selectTaxId: w9selectTaxId,
            w9isSsnFilled: w9isSsnFilled,
            w9socialSecurityNumber: cryptr.encrypt(w9socialSecurityNumber),
            w9employerIdentificationNumber: cryptr.encrypt(w9employerIdentificationNumber),
            bankName: bankName,
            accountNameAttachedTo: accountNameAttachedTo,
            accountNickName: accountNickName,
            routingNumber: routingNumber,
            accountNumber: accountNumber,
            confirmAccountNumber: confirmAccountNumber,
        }

        let updateWNine = await Wnine.findOneAndUpdate({ _id: id }, { $set: updatedData }, { new: true });
        if(updateWNine){

            let host = await User.findOne({ _id: updateWNine.manager, isDeleted: false });
            if(host){

                let SyncToken = '0';
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
    
                    qbo.getVendor(updateWNine.attachableId, function(err, vendor){
                        if(err){
                            console.log(err, 'Error updating vendor data in quickbooks online');
                        }
                        else{
                            SyncToken = vendor.SyncToken;
                            setTimeout(function () {
                                updateWNineInQuickBooks();
                            }, 1000);
                        }
        
                    });
    
                    function updateWNineInQuickBooks(){
                        qbo.updateVendor(constant.function.updateVendorDataInQuickBooks(updateWNine, host, SyncToken), function(err, vendor){
                            if(err){
                                console.log(err, '   err in update vendor in updateWNineInQuickBooks');
                            }
                            else{
                                console.log(vendor, '   updated vendor in updateWNineInQuickBooks');
                            }
                        });
                    }
    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                }

            }
            else{
                console.log(constant.message.dataNotFound);
            }

            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.badRequest,
                message: constant.message.wNineUpdated,
                data: updateWNine
            });
        }
        else{
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.errorUpdatingWnine,
                data: []
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createCustomerInQbo = async (req, res) => {
    try {
        // console.log(req.body, '  createCustomerInQbo req.body');
        let { _id } = req.body;

        let user = await User.findOne({ _id: _id });
        if(user){
            if(user.isDataSavedInQBO){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.customerAlreadyInQbo,
                    data: []
                });
            }
            else{
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
        
                    let customerData = constant.function.createCustomerDataForQuickBooks(user);
        
                    qbo.createCustomer(customerData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in createCustomer in createCustomerInQbo');
        
                            // let summary = `Customer: ${user.userId} data not saved in QBO`;
                            // let textToPrint = `Customer: ${user.userId} data not saved in QBO`;
                            // let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                            
                            // request( jiraServiceDeskoptions , (error, response, body) => {
                            //     console.log(error, '    error of issue in jira service desk');
                            //     console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                            //     // console.log(response, '    response of issue in jira service desk');
                            //     console.log(body, '    body of issue in jira service desk');
                            // });
    
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.customerNotCreatedInQbo,
                                data: []
                            });
    
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id of createCustomerInQbo');
    
                            user.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });
    
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.customerCreatedInQbo,
                                data: []
                            });
                        }
                    });
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.customerNotCreatedInQbo,
                        data: []
                    });
                }
            }
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createClassInQbo = async (req, res) => {
    try {
        // console.log(req.body, '  createClassInQbo req.body');
        let { _id } = req.body;

        let location = await ParkingLot.findOne({ _id: _id });
        if(location){
            if(location.isDataSavedInQBO){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.locationAlreadyInQbo,
                    data: []
                });
            }
            else{
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
                
                    let locationData = constant.function.createLocationDataForQuickBooks(location);
                
                    qbo.createClass(locationData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in createClass in createClassInQbo');
                
                            // let summary = `Location: ${location.zone} not created in QBO`;
                            // let textToPrint = `Location: ${location.zone} not created in QBO`;
                            // let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                            
                            // request( jiraServiceDeskoptions , (error, response, body) => {
                            //     console.log(error, '    error of issue in jira service desk');
                            //     console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                            //     // console.log(response, '    response of issue in jira service desk');
                            //     console.log(body, '    body of issue in jira service desk');
                            // });
    
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.locationNotCreatedInQbo,
                                data: []
                            });
    
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id of new location that is Class in createClassInQbo');
                            location.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });
    
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.locationCreatedInQbo,
                                data: []
                            });
                        }
                    });
                    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.locationNotCreatedInQbo,
                        data: []
                    });
                }
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createVendorInQbo = async (req, res) => {
    try {
        // console.log(req.body, '  createVendorInQbo req.body');
        let { _id } = req.body;

        let vendor = await Wnine.findOne({ _id: _id }).populate('manager');
        if(vendor){
            if(vendor.isDataSavedInQBO){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.vendorAlreadyInQbo,
                    data: []
                });
            }
            else{
                let getToken = await AuthToken.findOne({});
                if(getToken){
                    let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);
                
                    let vendorData = constant.function.createVendorDataForQuickBooks(vendor, vendor.manager);
                
                    qbo.createVendor(vendorData, function(err, attachable){
                        if(err){
                            console.log(err, '   err in createVendor in createVendorInQbo');
                
                            // let summary = `Vendor: ${vendor.w9Id} not created in QBO`;
                            // let textToPrint = `Vendor: ${vendor.w9Id} not created in QBO`;
                            // let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                            
                            // request( jiraServiceDeskoptions , (error, response, body) => {
                            //     console.log(error, '    error of issue in jira service desk');
                            //     console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                            //     // console.log(response, '    response of issue in jira service desk');
                            //     console.log(body, '    body of issue in jira service desk');
                            // });
    
                            return res.status(constant.httpCode.success).json({
                                success: false,
                                code: constant.httpCode.badRequest,
                                message: constant.message.vendorNotCreatedInQbo,
                                data: []
                            });
    
                        }
                        else{
                            console.log(attachable.Id, '   attachable.Id of createVendorInQbo');
                            vendor.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });
    
                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.vendorCreatedInQbo,
                                data: []
                            });
    
                        }
                    });
                    
                }
                else{
                    console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.vendorNotCreatedInQbo,
                        data: []
                    });
                }
            }
        }
        else{
            constant.function.dataNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createTransactionInQbo = async (req, res) => {
    try {
        // console.log(req.body, '  createTransactionInQbo req.body');
        let { _id } = req.body;

        let getToken = await AuthToken.findOne({});
        if(getToken){
            let qbo = constant.function.getQuickBooksTokenFromDatabase(getToken);

            let transaction = await Transaction.findOne({ _id: _id }).populate('user manager parkingLot refundedTransaction');
            if(transaction){
                if(transaction.isWalletHistory && !transaction.isParkingTransaction && !transaction.isRefundGeneratedTransaction){
                    console.log('Wallet load transaction');
    
                    if(transaction.isDataSavedInQBO){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.success,
                            message: constant.message.transactionAlreadyInQbo,
                            data: []
                        });
                    }
                    else{
                        let walletLoadTransactionData = constant.function.createSalesReceiptForWalletLoadInQuickBooks(transaction.user, transaction);

                        qbo.createSalesReceipt(walletLoadTransactionData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in create transaction for wallet load 11');

                                let summary = `QBO Sales Receipt not created for Wallet load id: ${transaction.transactionId}`;
                                let textToPrint = `QBO Sales Receipt not created for Wallet load id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id for wallet load');
                                transaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });

                            }
                        });
                    }
                }
                else if(transaction.isParkingTransaction && !transaction.isWalletHistory && !transaction.isRefundGeneratedTransaction){
                    console.log('Parking transaction, payment done from CC');
    
                    if(transaction.isDataSavedInQBO && transaction.isVendorBillSavedInQBO){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.success,
                            message: constant.message.transactionAlreadyInQbo,
                            data: []
                        });
                    }
                    else if(transaction.isDataSavedInQBO && !transaction.isVendorBillSavedInQBO){
                        let vendorBillData = constant.function.createVendorBillInQuickBooks(transaction.associatedVendorId, transaction.associatedVendorAttachableId, transaction.parkingLot, transaction);
    
                        qbo.createBill(vendorBillData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createBill in create transaction when paying from credit card');
    
                                let summary = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId} in QBO when payment done from Credit card`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from credit card');
                                transaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else if(!transaction.isDataSavedInQBO && transaction.isVendorBillSavedInQBO){
                        let directTransactionData = constant.function.createSalesReceiptForParkingWithCreditCardPaymentInQuickBooks(transaction.user, transaction.parkingLot, transaction);

                        qbo.createSalesReceipt(directTransactionData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in create transaction in direct payment for parking');
    
                                let summary = `Parking Sales receipt not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Sales receipt not created for transaction id: ${transaction.transactionId} in QBO when payment done from Credit card`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id in credit card payment for parking');
                                transaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else{
                        let directTransactionData = constant.function.createSalesReceiptForParkingWithCreditCardPaymentInQuickBooks(transaction.user, transaction.parkingLot, transaction);
    
                        qbo.createSalesReceipt(directTransactionData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in create transaction in direct payment for parking');
    
                                let summary = `Parking Sales receipt not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Sales receipt not created for transaction id: ${transaction.transactionId} in QBO when payment done from Credit card`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id in credit card payment for parking');
                                transaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });
    
    
                        let vendorBillData = constant.function.createVendorBillInQuickBooks(transaction.associatedVendorId, transaction.associatedVendorAttachableId, transaction.parkingLot, transaction);
    
                        qbo.createBill(vendorBillData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createBill in create transaction when paying from credit card');
    
                                let summary = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId} in QBO when payment done from Credit card`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from credit card');
                                transaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreatedInQbo,
                            data: []
                        });
                    }
                }
                else if(transaction.isParkingTransaction && transaction.isWalletHistory && !transaction.isRefundGeneratedTransaction){
                    console.log('Parking transaction, payment done from Wallet');
    
                    if(transaction.isDataSavedInQBO && transaction.isVendorBillSavedInQBO){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.success,
                            message: constant.message.transactionAlreadyInQbo,
                            data: []
                        });
                    }
                    else if(transaction.isDataSavedInQBO && !transaction.isVendorBillSavedInQBO){
                        let vendorBillData = constant.function.createVendorBillInQuickBooks(transaction.associatedVendorId, transaction.associatedVendorAttachableId, transaction.parkingLot, transaction);
    
                        qbo.createBill(vendorBillData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createBill in create transaction when paying from wallet');
    
                                let summary = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId} in QBO when payment done from Wallet`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from wallet');
                                transaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else if(!transaction.isDataSavedInQBO && transaction.isVendorBillSavedInQBO){
                        let parkingFromWalletTransactionData = constant.function.createSalesReceiptForParkingWithWalletPaymentInQuickBooks(transaction.user, transaction.parkingLot, transaction);
    
                        qbo.createSalesReceipt(parkingFromWalletTransactionData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in create transaction for parking with payment done from wallet 33');
    
                                let summary = `Parking Sales receipt not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Sales receipt not created for transaction id: ${transaction.transactionId} in QBO when payment done from Wallet`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id for parking with payment done from wallet');
                                transaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else{
                        let parkingFromWalletTransactionData = constant.function.createSalesReceiptForParkingWithWalletPaymentInQuickBooks(transaction.user, transaction.parkingLot, transaction);
    
                        qbo.createSalesReceipt(parkingFromWalletTransactionData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in create transaction for parking with payment done from wallet 33');
    
                                let summary = `Parking Sales receipt not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Sales receipt not created for transaction id: ${transaction.transactionId} in QBO when payment done from Wallet`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id for parking with payment done from wallet');
                                transaction.update({ $set: { attachableId: attachable.Id, isDataSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });
    
    
                        let vendorBillData = constant.function.createVendorBillInQuickBooks(transaction.associatedVendorId, transaction.associatedVendorAttachableId, transaction.parkingLot, transaction);
    
                        qbo.createBill(vendorBillData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createBill in create transaction when paying from wallet');
    
                                let summary = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId}`;
                                let textToPrint = `Parking Vendor Bill not created for transaction id: ${transaction.transactionId} in QBO when payment done from Wallet`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createBill in create transaction when paying from wallet');
                                transaction.update({ $set: { vendorBillAttachableId: attachable.Id, isVendorBillSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreatedInQbo,
                            data: []
                        });
                    }
                }
                else if(transaction.isSnipcartOrderTransaction && !transaction.isRefundGeneratedTransaction){
                    console.log('Snipcart order transaction');
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: 'Snipcart order transaction',
                        data: []
                    });
                }
                else if(transaction.isSnipcartOrderTransaction && transaction.isRefundGeneratedTransaction){
                    console.log('Snipcart order Refund transaction');
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: 'Snipcart order Refund transaction',
                        data: []
                    });
                }
                else if(transaction.isParkingTransaction && transaction.isRefundGeneratedTransaction && !transaction.isWalletHistory){
                    console.log('Parking transaction refunded into CC');

                    if(transaction.isRefundReceiptSavedInQBO && transaction.isVendorCreditSavedInQBO){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.success,
                            message: constant.message.transactionAlreadyInQbo,
                            data: []
                        });
                    }
                    else if(transaction.isRefundReceiptSavedInQBO && !transaction.isVendorCreditSavedInQBO){
                        let vendorCreditData = constant.function.createVendorCreditForParkingTransaction(findTransaction, newTransaction);
                        qbo.createVendorCredit(vendorCreditData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createVendorCredit in credit card refund');
    
                                let summary = `QBO Vendor credit not created for parking transaction: ${findTransaction.transactionId}`;
                                let textToPrint = `QBO Vendor credit not created for parking transaction: ${findTransaction.transactionId} (Payment done from Credit card), Refund transaction id: ${newTransaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createVendorCredit in credit card refund');
                                transaction.update({ $set: { vendorCreditAttachableId: attachable.Id, isVendorCreditSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else if(!transaction.isRefundReceiptSavedInQBO && transaction.isVendorCreditSavedInQBO){
                        let refundReceiptData = constant.function.createRefundReceiptForParkingTransaction(transaction.user, transaction.refundedTransaction, transaction);
                        qbo.createRefundReceipt(refundReceiptData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createRefundReceipt for parking with credit card payment');
    
                                let summary = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Credit card), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createRefundReceipt in wallet refund');
                                transaction.update({ $set: { refundReceiptAttachableId: attachable.Id, isRefundReceiptSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else{
                        let refundReceiptData = constant.function.createRefundReceiptForParkingTransaction(transaction.user, transaction.refundedTransaction, transaction);
                        qbo.createRefundReceipt(refundReceiptData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createRefundReceipt for parking with credit card payment');
    
                                let summary = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Credit card), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createRefundReceipt in wallet refund');
                                transaction.update({ $set: { refundReceiptAttachableId: attachable.Id, isRefundReceiptSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                                
                            }
                        });

                        let vendorCreditData = constant.function.createVendorCreditForParkingTransaction(findTransaction, newTransaction);
                        qbo.createVendorCredit(vendorCreditData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createVendorCredit in credit card refund');
    
                                let summary = `QBO Vendor credit not created for parking transaction: ${findTransaction.transactionId}`;
                                let textToPrint = `QBO Vendor credit not created for parking transaction: ${findTransaction.transactionId} (Payment done from Credit card), Refund transaction id: ${newTransaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createVendorCredit in credit card refund');
                                transaction.update({ $set: { vendorCreditAttachableId: attachable.Id, isVendorCreditSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreatedInQbo,
                            data: []
                        });
                    }
                    
                }
                else{
                    console.log('Parking transaction refunded into Wallet');

                    if(transaction.isRefundReceiptSavedInQBO && transaction.isVendorCreditSavedInQBO){
                        return res.status(constant.httpCode.success).json({
                            success: false,
                            code: constant.httpCode.success,
                            message: constant.message.transactionAlreadyInQbo,
                            data: []
                        });
                    }
                    else if(transaction.isRefundReceiptSavedInQBO && !transaction.isVendorCreditSavedInQBO){
                        let vendorCreditData = constant.function.createVendorCreditForParkingTransaction(transaction.refundedTransaction.transaction, transaction);
                        qbo.createVendorCredit(vendorCreditData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createVendorCredit in wallet refund');
    
                                let summary = `QBO Vendor credit not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Vendor credit not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Wallet), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createVendorCredit in wallet refund');
                                transaction.update({ $set: { vendorCreditAttachableId: attachable.Id, isVendorCreditSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else if(!transaction.isRefundReceiptSavedInQBO && transaction.isVendorCreditSavedInQBO){
                        let refundReceiptData = constant.function.createRefundReceiptForParkingTransaction(transaction.user, transaction.refundedTransaction, transaction);
                        qbo.createRefundReceipt(refundReceiptData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createRefundReceipt for parking with wallet payment');
    
                                let summary = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Wallet), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionNotCreatedInQbo,
                                    data: []
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createRefundReceipt in wallet refund');
                                transaction.update({ $set: { refundReceiptAttachableId: attachable.Id, isRefundReceiptSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });

                                return res.status(constant.httpCode.success).json({
                                    success: true,
                                    code: constant.httpCode.success,
                                    message: constant.message.transactionCreatedInQbo,
                                    data: []
                                });
                            }
                        });
                    }
                    else{
                        let refundReceiptData = constant.function.createRefundReceiptForParkingTransaction(transaction.user, transaction.refundedTransaction, transaction);
                        qbo.createRefundReceipt(refundReceiptData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createRefundReceipt for parking with wallet payment');
    
                                let summary = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Refund receipt not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Wallet), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createRefundReceipt in wallet refund');
                                transaction.update({ $set: { refundReceiptAttachableId: attachable.Id, isRefundReceiptSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });

                        let vendorCreditData = constant.function.createVendorCreditForParkingTransaction(transaction.refundedTransaction.transaction, transaction);
                        qbo.createVendorCredit(vendorCreditData, function(err, attachable){
                            if(err){
                                console.log(err, '   err in createVendorCredit in wallet refund');
    
                                let summary = `QBO Vendor credit not created for parking transaction: ${transaction.refundedTransaction.transactionId}`;
                                let textToPrint = `QBO Vendor credit not created for parking transaction: ${transaction.refundedTransaction.transactionId} (Payment done from Wallet), Refund transaction id: ${transaction.transactionId}`;
                                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '2');
                                
                                request( jiraServiceDeskoptions , (error, response, body) => {
                                    console.log(error, '    error of issue in jira service desk');
                                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                    // console.log(response, '    response of issue in jira service desk');
                                    console.log(body, '    body of issue in jira service desk');
                                });
                            }
                            else{
                                console.log(attachable.Id, '   attachable.Id of createVendorCredit in wallet refund');
                                transaction.update({ $set: { vendorCreditAttachableId: attachable.Id, isVendorCreditSavedInQBO: true } }, (reject, resolve) => {
                                    if(resolve){
                                        return;
                                    }
                                    else{
                                        return;
                                    }
                                });
                            }
                        });

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.transactionCreatedInQbo,
                            data: []
                        });
                    }

                }
    
            }
            else{
                constant.function.dataNotFound(res);
            }

        }
        else{
            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createPatroller = async (req, res) => {
    try {
        console.log(req.body, '  create patroller req.body');
        const { value, error } = validate.createPatroller(req.body);
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
                latitude,
                longitude,
                mailingAddress,
                apartmentNumber,
                patrollingDistanceToCover,
                stateLicenseNumber
            } = value;
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
                    latitude: latitude,
                    longitude: longitude,
                    location: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    mailingAddress: mailingAddress,
                    apartmentNumber: apartmentNumber,
                    patrollingDistanceToCover: patrollingDistanceToCover,
                    stateLicenseNumber: stateLicenseNumber,

                    activationNumber: activationNumber,
                    isVerified: true,
                    role: '4',
                    isUser: false,
                    isManager: false,
                    isPatroller: true
                });
                let newPatroller = await user.save();
                if(!newPatroller){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.badRequest,
                        message: constant.message.errorCreatingUser,
                        data: []
                    });
                }
                else{

                    constant.function.createCustomerInJira(newPatroller);

                    let accountType = 'Patroller';
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

exports.editPatroller = async (req, res) => {
    try {
        console.log(req.body, '   req.body of editPatroller');
        let { isMobileChange, isEmailChange } = req.body;

        let {
            _id,
            companyName,
            firstName,
            lastName,
            email,
            companyEmail,
            countryCode,
            mobileNumber,
            businessCountryCode,
            businessMobileNumber,
            address,
            latitude,
            longitude,
            mailingAddress,
            apartmentNumber,
            patrollingDistanceToCover,
            stateLicenseNumber,
        } = req.body.userData;

        let updatedPatrollerData;

        let emailVerificationNumber = constant.function.generateActivationNumber();
        let encryptedEmail = cryptr.encrypt(email);
        let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

        if(isEmailChange){
            updatedPatrollerData = {
                companyName: companyName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                emailVerificationNumber: emailVerificationNumber,
                isEmailVerified: false,
                companyEmail: companyEmail,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                businessCountryCode: businessCountryCode,
                businessMobileNumber: businessMobileNumber,
                address: address,
                latitude: latitude,
                longitude: longitude,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                mailingAddress: mailingAddress,
                apartmentNumber: apartmentNumber,
                patrollingDistanceToCover: patrollingDistanceToCover,
                stateLicenseNumber: stateLicenseNumber,
            };
        }
        else{
            updatedPatrollerData = {
                companyName: companyName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                companyEmail: companyEmail,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                businessCountryCode: businessCountryCode,
                businessMobileNumber: businessMobileNumber,
                address: address,
                latitude: latitude,
                longitude: longitude,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                mailingAddress: mailingAddress,
                apartmentNumber: apartmentNumber,
                patrollingDistanceToCover: patrollingDistanceToCover,
                stateLicenseNumber: stateLicenseNumber,
            };
        }

        if(isMobileChange && isEmailChange){
            let user = await User.find({ $or: [{ email: email, isDeleted: false }, { countryCode: countryCode, mobileNumber: mobileNumber, isDeleted: false }] });
            if(user){
                // constant.function.emailAlreadyExistFunction(res);
                if(user.length == 0){
                    updatePatroller();
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
                updatePatroller();
            }
        }
        else if(isEmailChange){
            let user = await User.findOne({ email: email, isDeleted: false });
            if(user){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                updatePatroller();
            }
        }
        else{
            updatePatroller();
        }

        async function updatePatroller(){
            let updatePatroller = await User.findOneAndUpdate({ _id: _id, isDeleted: false }, { $set: updatedPatrollerData }, { new: true });
            if(updatePatroller){

                if(isEmailChange){
                    console.log('Change in email by admin');
                    constant.function.createCustomerInJira(updatePatroller);
                    console.log(emailVerificationLink, '----email verification link');
                    emailService.verifyEmail(email, emailVerificationLink, updatePatroller.firstName, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.patrollerUpdated,
                    data: updatePatroller
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

exports.deletePatroller = async (req, res) => {
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
            let deletePatroller = await User.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
            if(deletePatroller){

                let updatedJson = {
                    patrollerAssignedStatus: 'none',
                    isPatrollerRequested: false,
                    isPatrollerPending: false,
                    isPatrollerActive: false,
                    patroller: null
                };

                // let patrollerLocations = await ParkingLot.updateMany({ patroller: deletePatroller }, updatedJson);
                let patrollerLocations = await ParkingLot.find({ patroller: deletePatroller }).populate('patroller manager');
                if(patrollerLocations){
                    if(patrollerLocations.length == 0){
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.patrollerDeleted,
                            data: []
                        });
                    }
                    else{
                        let updateLocations = await ParkingLot.updateMany({ patroller: deletePatroller }, updatedJson);
                        console.log(updateLocations, '     updateLocations');

                        for(let i=0;i<patrollerLocations.length;i++){
                            emailService.deletePatroller(patrollerLocations[i].patroller.companyName, patrollerLocations[i].manager.email, (err,resp)=>{
                                if(err){
                                  console.log('Email not in deletePatroller---',i);
                                  return;
                                }
                                else{
                                  console.log('Email sent for deletePatroller---',i);
                                  transactionsToExtendTime[i].update({ $set: { isExtendTimeMessageSent: true } }, (reject, resolve)=>{
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
                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.patrollerDeleted,
                            data: []
                        });
                    }
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.patrollerDeleted,
                        data: []
                    });
                    // return res.status(constant.httpCode.success).json({
                    //     success: false,
                    //     code: constant.httpCode.badRequest,
                    //     message: constant.message.errorDeletingPatroller,
                    //     data: []
                    // });
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

exports.getActiveReservationsForPatroller = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '   getActiveReservationsForPatroller');
        const { page, perPage, sort, zone } = req.body;

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'user parkingLot manager refundedTransaction' }),
        };

        let findLocation = await ParkingLot.findOne({ _id: zone, patroller: loggedInUser, isPatrollerActive: true, isDeleted: false });
        if(findLocation){

            let activeTransactions = await Transaction.paginate({ isParkingTransaction: true, parkingLot: findLocation, isCompleted: false, isDeleted: false }, options);
            if(activeTransactions){
                if(activeTransactions.docs.length === 0){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: [],
                        location: findLocation
                    });
                }
                else if(activeTransactions){
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.dataFound,
                        data: activeTransactions,
                        location: findLocation
                    });
                }
                else{
                    return res.status(constant.httpCode.notFound).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: [],
                        location: findLocation
                    });
                }
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: [],
                    location: findLocation
                });
            }
            
        }
        else{
            constant.function.dataNotFound(res);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.getActiveBootedViolationsForPatroller = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        console.log(req.body, '   getActiveBootedViolationsForPatroller');
        const { page, perPage, sort, zone } = req.body;

        const options = {
            sort: { createdAt: -1 },
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
            populate: ({ path: 'parkingLot manager patroller' }),
        };

        let findLocation = await ParkingLot.findOne({ _id: zone, patroller: loggedInUser, isPatrollerActive: true, isDeleted: false });
        if(findLocation){
            let currentBootedViolations = await Violation.paginate({ status: 'booted', parkingLot: zone, patroller: loggedInUser }, options);
            if(currentBootedViolations){
                if(currentBootedViolations.docs.length === 0){
                    return res.status(constant.httpCode.success).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: currentBootedViolations
                    });
                }
                else if(currentBootedViolations){
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: constant.message.dataFound,
                        data: currentBootedViolations
                    });
                }
                else{
                    return res.status(constant.httpCode.notFound).json({
                        success: false,
                        code: constant.httpCode.notFound,
                        message: constant.message.dataNotFound,
                        data: currentBootedViolations
                    });
                }
    
            }
            else{
                return res.status(constant.httpCode.notFound).json({
                    success: false,
                    code: constant.httpCode.notFound,
                    message: constant.message.dataNotFound,
                    data: []
                });
            }
        }
        else{
            constant.function.dataNotFound(res);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.setViolationStatus = async (req, res) => {
    try {
        let { id, currentstatus, newstatus, isStatusChanged, sortStatus } = req.query;
        let updatedJson;
        let number;

        isStatusChanged = JSON.parse(isStatusChanged);

        if(currentstatus == 'booted' && newstatus != 'booted'){
            number = 1;
        }
        else if(currentstatus != 'booted' && newstatus == 'booted'){
            number = 2;
        }
        else{
            // console.log('No change in status');
            number = 3;
        }

        if(newstatus == 'dismissed'){
            // updatedJson = { status: newstatus, isDeleted: true };
            updatedJson = { status: newstatus, sortStatus: sortStatus };
        }
        else{
            updatedJson = { status: newstatus, sortStatus: sortStatus };
        }

        let loggedInUser = req.user._id;
        // let patrollerOradmin = await User.findOne( { _id: loggedInUser, role: '4', isDeleted: false } );
        let patrollerOradmin = await User.findOne( { $or: [{ _id: loggedInUser, role: '1', isDeleted: false }, { _id: loggedInUser, role: '4', isDeleted: false }] } );
        if(patrollerOradmin){
            let setViolationStatus = await Violation.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: updatedJson }, { new: true });
            if(setViolationStatus){

                if(isStatusChanged){
                    let statusUpdateJson = {
                        statusChangedBy: patrollerOradmin.role == 1 ? 'admin' : 'patroller',
                        from: currentstatus,
                        to: newstatus,
                        date: moment.utc().format()
                    };

                    setViolationStatus.update({ $push: { statusChanges: statusUpdateJson } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });
                }

                if(number == 1){
                    let updateParkingLot = await ParkingLot.findOneAndUpdate({ zone: setViolationStatus.zone }, { $inc: { spacesAvailable: +1 } }, { new: true });
                }
                else if(number ==2){
                    let updateParkingLot = await ParkingLot.findOneAndUpdate({ zone: setViolationStatus.zone }, { $inc: { spacesAvailable: -1 } }, { new: true });
                }

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.violationUpdated,
                    data: setViolationStatus
                });
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
        else{
            constant.function.unauthorizedAccess(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.editPatrollerAccount = async (req, res) => {
    try {
        // console.log(req.body, '   req.body of editPatrollerAccount');
        let loggedInUser = req.user._id;
        let {
            companyName,
            firstName,
            lastName,
            email,
            companyEmail,
            countryCode,
            mobileNumber,
            businessCountryCode,
            businessMobileNumber,
            address,
            latitude,
            longitude,
            mailingAddress,
            apartmentNumber,
            patrollingDistanceToCover,
            stateLicenseNumber
        } = req.body.userData;
        let previousEmail = req.body.previousEmail;
        
        let updatedData;

        let emailVerificationNumber = constant.function.generateActivationNumber();
        let encryptedEmail = cryptr.encrypt(email);
        let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);

        if(email != previousEmail){
            updatedData = {
                companyName: companyName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                emailVerificationNumber: emailVerificationNumber,
                isEmailVerified: false,
                companyEmail: companyEmail,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                businessCountryCode: businessCountryCode,
                businessMobileNumber: businessMobileNumber,
                address: address,
                latitude: latitude,
                longitude: longitude,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                mailingAddress: mailingAddress,
                apartmentNumber: apartmentNumber,
                patrollingDistanceToCover: patrollingDistanceToCover,
                stateLicenseNumber: stateLicenseNumber
            };
        }
        else{
            updatedData = {
                companyName: companyName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                companyEmail: companyEmail,
                countryCode: countryCode,
                mobileNumber: mobileNumber,
                businessCountryCode: businessCountryCode,
                businessMobileNumber: businessMobileNumber,
                address: address,
                latitude: latitude,
                longitude: longitude,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                mailingAddress: mailingAddress,
                apartmentNumber: apartmentNumber,
                patrollingDistanceToCover: patrollingDistanceToCover,
                stateLicenseNumber: stateLicenseNumber
            };
        }

        if(email != previousEmail){
            let findUser = await User.findOne({ email: email, isDeleted: false });
            if(findUser){
                constant.function.emailAlreadyExistFunction(res);
            }
            else{
                updatePatrollerAccount();
            }   
        }
        else{
            updatePatrollerAccount();
        }

        async function updatePatrollerAccount(){
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
    
                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.patrollerUpdated,
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

exports.requestNewPatrollerIfNotFoundForLocation = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   requestNewPatrollerIfNotFoundForLocation');
        const { location } = req.body;

        let manager = await User.findOne({ _id: loggedInUser, isDeleted: false });
        if(manager){
            let findLocation = await ParkingLot.findOne({ _id: location, isDeleted: false }).populate('manager');
            if(findLocation){
                console.log(findLocation.manager, 'Location found');

                let summary = `Zone: ${findLocation.zone} - Patroller Needed`;
                let textToPrint = `Associated host email: ${findLocation.manager.email}\n
Associated host telephone: ${findLocation.manager.countryCode} ${findLocation.manager.mobileNumber}\n
Zone: ${findLocation.zone}\n
Host Name: ${findLocation.manager.firstName} ${findLocation.manager.lastName}\n
Address: ${findLocation.address}`;
                let jiraServiceDeskoptions = constant.function.createRequestForJiraIssue(summary, textToPrint, '1');
                
                request( jiraServiceDeskoptions , (error, response, body) => {
                    console.log(error, '    error of issue in jira service desk');
                    console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                    // console.log(response, '    response of issue in jira service desk');
                    console.log(body, '    body of issue in jira service desk');
                });

                return res.status(constant.httpCode.success).json({
                    success: true,
                    code: constant.httpCode.success,
                    message: constant.message.noPatrollerPopulatesForLocation,
                    data: []
                });

            }
            else{
                constant.function.dataNotFound(res);
            }
        }
        else{
            constant.function.userNotFound(res);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.assignPatrollerForLocation = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req.body of assignPatrollerForLocation');
        const { location } = req.body;

        let parkingLot = await ParkingLot.findOne({ _id: location, isDeleted: false }).populate('manager patroller patrollerLogs');
        if(parkingLot){
            // console.log('Location found');
            let previousPatrollers = parkingLot.patrollerHistory;

            if(parkingLot.isPatrollerRequested || parkingLot.isPatrollerPending || parkingLot.isPatrollerActive){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.patrollerAlreadyRequested,
                    data: []
                });
            }
            else{
                let query = previousPatrollers.length == 0 ? { location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false } : { _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false };
                // let nearPatrollers = await User.find({ _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false });
                let nearPatrollers = await User.find(query);
                console.log(nearPatrollers, '     near patrollers in assignPatrollerForLocation api');
                if(nearPatrollers){
                    if(nearPatrollers.length == 0){
                        createJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                    }
                    else{
                        let getAvailablePatrollerListForLog = constant.function.getAvailablePatrollerListForLog(nearPatrollers);

                        let getRandomNumber = Math.floor(Math.random() * (nearPatrollers.length));
                        let findPatroller = nearPatrollers[getRandomNumber];

                        // let findLocation = await ParkingLot.findOne({ zone: location, isDeleted: false });
                        let findLocation = await ParkingLot.findOneAndUpdate({ _id: location, isDeleted: false }, { $set: { patroller: findPatroller, isPatrollerRequested: true, patrollerAssignedStatus: 'requested', patrollerRequestedDate: moment.utc().format() } }, { new: true });
                        if(findLocation){
                            findLocation.patrollerHistory.push(findPatroller);
                            findLocation.save();

                            createPatrollerLogIfPatrollerFound(parkingLot, findPatroller, parkingLot.manager, getAvailablePatrollerListForLog);

                            let distance;
                            let x;
                            let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                            request(link, function (error, response, body){
                                // console.log('error:', error);
                                // console.log('response -- :', response, ': -- response');
                                console.log('statusCode:', response.statusCode);
                                console.log('body:', body);
                                x = JSON.parse(body);
                                console.log('Distance: ', x.rows[0].elements[0].distance.text);
                                if(x.status == 'OK'){
                                    distance = x.rows[0].elements[0].distance.text;
                                    requestPatroller();
                                }
                                else{
                                    distance = 0;
                                    requestPatroller();
                                }
                            });

                            function requestPatroller() {
                                emailService.requestForPatroller(findLocation, findPatroller, distance, (err, resp) => {
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
                            }

                            return res.status(constant.httpCode.success).json({
                                success: true,
                                code: constant.httpCode.success,
                                message: constant.message.patrollerRequestSent,
                                data: []
                            });
                        }
                        else{
                            // constant.function.parkingLotNotFound(res);
                        }

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.dataFound,
                            data: nearPatrollers
                        });
                    }
                }
                else{
                    createJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                }
            }

        }
        else{
            constant.function.parkingLotNotFound(res);
        }

        async function createPatrollerLogIfPatrollerFound(location, patroller, host, getAvailablePatrollerListForLog){
            console.log('Create patroller log');

            if(location.patrollerLogs.length == 0){
                let patrollerJson = {
                    location: location,
                    zone: location.zone,
                    requestCreatedBy: host,
    
                    logs: {
                        date: moment.utc().format(),
                        isNewRequest: true,
                        patroller: patroller,
                        patrollerEmail: patroller.email,
                        patrollerId: patroller.patrollerId,
                        companyName: patroller.companyName,
                        statusChangedFrom: '',
                        statusChangedTo: 'requested',
                        currentstatus: 'requested'
                    }
                };
                let log = new PatrollerLogs(patrollerJson);
                let newLog = await log.save();
                if(newLog){
                    location.update({ $push: { patrollerLogs: newLog } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });
    
    
                    let summary = `Zone: ${location.zone}`;
                    let textToPrint = constant.function.getJiraIssueHeading(location);
                    let jiraServiceDeskoptions = constant.function.createPatrollerRequestForJiraIssue(summary, textToPrint, location.manager);
                    
                    request( jiraServiceDeskoptions , (error, response, body) => {
                        console.log(error, '    error of create patroller issue in jira service desk');
                        console.log(response.statusCode, '    response.statusCode of create patroller issue in jira service desk');
                        // console.log(response, '    response of create patroller issue in jira service desk');
                        console.log(body, '    body of create patroller issue in jira service desk');
                        console.log(body.key, '    body.key of create patroller issue in jira service desk');

                        if(response.statusCode == 201){

                            let id = body.key;
                            // let description = `* New request sent to ${patroller.email} (${patroller.patrollerId}).`;
                            let description = getAvailablePatrollerListForLog + `* Request Issued: ${patroller.patrollerId} ${patroller.companyName}.`;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
                            });

                            constant.function.updatePatrollerTransition(body.key, '41');
                        }
    
                        newLog.update({ $set: { jiraIssueKeyId: body.key, isIssueCreatedOnJira: true } }, (error, resp) => {
                            if(resp){
                                // return;
                            }
                            else{
                                // return;
                            }
                        });
    
                    });
    
                }
            }
            else{
                let patrollerLog = {
                    date: moment.utc().format(),
                    isNewRequest: true,
                    patroller: patroller,
                    patrollerEmail: patroller.email,
                    patrollerId: patroller.patrollerId,
                    companyName: patroller.companyName,
                    statusChangedFrom: '',
                    statusChangedTo: 'requested',
                    currentstatus: 'requested'
                };
                let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: location, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                // let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: location, isActive: true }, patrollerLog, { new: true }).sort({ createdAt: -1 });
                if(findUpdatePatrollerLog){
                    console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');
                    // console.log(findUpdatePatrollerLog.isIssueCreatedOnJira, '    findUpdatePatrollerLog.isIssueCreatedOnJira');
    
                    let previousDescription = '';
                    // let description = `* New request sent to ${patroller.email} (${patroller.patrollerId}).`;
                    let description = getAvailablePatrollerListForLog +`* Request Issued: ${patroller.patrollerId} ${patroller.companyName}.`;
                    let textToPrint = '';
    
                    let id = findUpdatePatrollerLog.jiraIssueKeyId;
                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                    request( addCommentJson, (error, response, body) => {
                        console.log(error, '    error of addCommentJson');
                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                        // console.log(response, '    response of addCommentJson');
                        console.log(body, '    body of addCommentJson');
                        if(response.statusCode == 201){

                            let transitionForJiraIssue = {
                                url: constant.jiraCredentials.createIssueUrl+`/${id}/transitions`,
                                auth: constant.jiraCredentials.auth,
                                method: 'POST',
                                body: {
                                    transition: {
                                        id: '11'
                                    }
                                },
                                json: true
                            };
                
                            request( transitionForJiraIssue, (error, response, body) => {
                                console.log(error, '    error of transitionForJiraIssue');
                                console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                // console.log(response, '    response of transitionForJiraIssue');
                                console.log(body, '    body of transitionForJiraIssue');
                                if(response.statusCode == 204){
                                    constant.function.updatePatrollerTransition(id, '41');
                                }
                            });
                        }
                    });

                    // let getJiraIssueUrl = {
                    //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                    //     auth: constant.jiraCredentials.auth,
                    //     method: 'GET',
                    //     body: {},
                    //     json: true
                    // };
                    // request( getJiraIssueUrl, (error, response, body) => {
                    //     console.log(error, '    error of get issue in jira api 7');
                    //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                    //     // console.log(response, '    response of get issue in jira api');
                    //     console.log(body, '    body of get issue in jira api');
                    //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                    //     if(response.statusCode == 200){
                    //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                    //         textToPrint = previousDescription + description;

                    //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                            
                    //         request( jiraServiceDeskoptions , (error, response, body) => {
                    //             console.log(error, '    error of update issue in jira service desk 6');
                    //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                    //             // console.log(response, '    response of update issue in jira service desk');
                    //             console.log(body, '    body of update issue in jira service desk');

                    //             if(response.statusCode == 204){
                    //                 constant.function.updatePatrollerTransition(id, '91');
                    //             }

                    //         });
                            
                    //     }
                    // });
    
                }
            }

        }

        async function createJiraTicketForLocationIfNoPatrollerFound(findLocation){
            console.log('Create jira ticket');

            if(findLocation.patrollerLogs.length == 0){
                let patrollerJson = {
                    location: findLocation,
                    zone: findLocation.zone,
                    requestCreatedBy: findLocation.manager,
    
                    logs: {
                        date: moment.utc().format(),
                        isNoPatrollerFound: true,
                        // patroller: patroller,
                        // patrollerEmail: patroller.email,
                        statusChangedFrom: '',
                        statusChangedTo: 'requested',
                        currentstatus: 'requested',
                        message: ''
                    }
                };
                let log = new PatrollerLogs(patrollerJson);
                let newLog = await log.save();
                if(newLog){
                    findLocation.update({ $push: { patrollerLogs: newLog } }, (error, resp) => {
                        if(resp){
                            // return;
                        }
                        else{
                            // return;
                        }
                    });
    
                    let summary = `Zone: ${findLocation.zone}`;
                    let textToPrint = constant.function.getJiraIssueHeading(findLocation);
                    let jiraServiceDeskoptions = constant.function.createPatrollerRequestForJiraIssue(summary, textToPrint, findLocation.manager);
                    
                    request( jiraServiceDeskoptions , (error, response, body) => {
                        console.log(error, '    error of issue in jira service desk');
                        console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                        // console.log(response, '    response of issue in jira service desk');
                        // console.log(body, '    body of issue in jira service desk');
                        console.log(body.key, '    body.key of issue in jira service desk');

                        if(response.statusCode == 201){

                            let id = body.key;
                            // let description = `* No patroller found for location, try creating new patroller and then assign OR assign one of the existing patroller manually.`;
                            let description = `* No patroller found; Admin interaction required.`;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
                            });

                            constant.function.updatePatrollerTransition(body.key, '31');
                        }
    
                        newLog.update({ $set: { jiraIssueKeyId: body.key, isIssueCreatedOnJira: true } }, (error, resp) => {
                            if(resp){
                                // return;
                            }
                            else{
                                // return;
                            }
                        });
    
                    });
    
                    findLocation.update({ $set: { patrollerAssignedStatus: 'requestedAndNotFound', isPatrollerRequested: true, patrollerRequestedDate: moment.utc().format() } }, (reject, resolve) => {
                        if(resolve){
                            return;
                        }
                        else{
                            return;
                        }
                    });
    
                }
            }
            else{
                let patrollerLog = {
                    date: moment.utc().format(),
                    isNoPatrollerFound: true,
                    statusChangedFrom: '',
                    statusChangedTo: 'requested',
                    currentstatus: 'requested'
                };
                let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                // let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, patrollerLog, { new: true }).sort({ createdAt: -1 });
                if(findUpdatePatrollerLog){
                    console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');
                    // console.log(findUpdatePatrollerLog.isIssueCreatedOnJira, '    findUpdatePatrollerLog.isIssueCreatedOnJira');
    
                    let previousDescription = '';
                    // let description = `* No patroller found for location, try creating new patroller and then assign OR assign one of the existing patroller manually.`;
                    let description = `* No patroller found; Admin interaction required.`;
                    let textToPrint = '';
    
                    let id = findUpdatePatrollerLog.jiraIssueKeyId;
                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                    request( addCommentJson, (error, response, body) => {
                        console.log(error, '    error of addCommentJson');
                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                        // console.log(response, '    response of addCommentJson');
                        console.log(body, '    body of addCommentJson');
                        if(response.statusCode == 201){

                            let transitionForJiraIssue = {
                                url: constant.jiraCredentials.createIssueUrl+`/${id}/transitions`,
                                auth: constant.jiraCredentials.auth,
                                method: 'POST',
                                body: {
                                    transition: {
                                        id: '11'
                                    }
                                },
                                json: true
                            };
                
                            request( transitionForJiraIssue, (error, response, body) => {
                                console.log(error, '    error of transitionForJiraIssue');
                                console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                // console.log(response, '    response of transitionForJiraIssue');
                                console.log(body, '    body of transitionForJiraIssue');
                                if(response.statusCode == 204){
                                    constant.function.updatePatrollerTransition(id, '31');
                                }
                            });
                        }
                    });

                    findLocation.update({ $set: { patrollerAssignedStatus: 'requestedAndNotFound', isPatrollerRequested: true, patrollerRequestedDate: moment.utc().format() } }, (reject, resolve) => {
                        if(resolve){
                            return;
                        }
                        else{
                            return;
                        }
                    });

                    // let getJiraIssueUrl = {
                    //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                    //     auth: constant.jiraCredentials.auth,
                    //     method: 'GET',
                    //     body: {},
                    //     json: true
                    // };
                    // request( getJiraIssueUrl, (error, response, body) => {
                    //     console.log(error, '    error of get issue in jira api 8');
                    //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                    //     // console.log(response, '    response of get issue in jira api');
                    //     console.log(body, '    body of get issue in jira api');
                    //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                    //     if(response.statusCode == 200){
                    //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                    //         textToPrint = previousDescription + description;
                            
                    //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                            
                    //         request( jiraServiceDeskoptions , (error, response, body) => {
                    //             console.log(error, '    error of update issue in jira service desk 6');
                    //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                    //             // console.log(response, '    response of update issue in jira service desk');
                    //             console.log(body, '    body of update issue in jira service desk');

                    //             if(response.statusCode == 204){
                    //                 constant.function.updatePatrollerTransition(id, '91');
                    //             }

                    //         });
                            
                    //     }
                    // });
    
                }
            }

            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.noPatrollerPopulatesForLocation,
                data: []
            });
        }
        
        // return res.status(constant.httpCode.success).json({
        //     success: true,
        //     code: constant.httpCode.success,
        //     message: constant.message.patrollerRequestReceived,
        //     data: []
        // });

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.assignPatrollerByAdmin = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req.body of assignPatrollerByAdmin');
        const { location, patroller, isMakePatrollerActive, lastStatus, previousPatroller } = req.body;
        let updatedJson = {};

        if(lastStatus == 'active'){
            let findPatroller = await User.findOne({ _id: patroller, isPatroller: true, isDeleted: false });
            if(findPatroller){
                if(isMakePatrollerActive){
                    updatedJson = { patroller: findPatroller, isPatrollerRequested: false, isPatrollerActive: true, patrollerAssignedStatus: 'active', patrollerActiveDate: moment.utc().format() };
                }
                else{
                    updatedJson = { patroller: findPatroller, isPatrollerRequested: false, isPatrollerPending: true, isPatrollerActive: false, patrollerAssignedStatus: 'pending', patrollerPendingDate: moment.utc().format() };
                }

                let findLocation = await ParkingLot.findOneAndUpdate({ zone: location, isDeleted: false }, { $set: updatedJson }, { new: true }).populate('manager patroller patrollerLogs');
                if(findLocation){

                    let patrollerLog = {
                        date: moment.utc().format(),
                        isPatrollerRemovedByAdmin: true,
                        isPatrollerRemovedByHost: false,
                        // patroller: '',
                        patrollerEmail: '',
                        patrollerId: '',
                        companyName: '',
                        statusChangedFrom: '',
                        statusChangedTo: 'none',
                        currentstatus: 'none'
                    };
                    let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                    if(findUpdatePatrollerLog){
                        console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');


                        let patrollerLog2 = {
                            date: moment.utc().format(),
                            isPatrollerAssignedByAdmin: isMakePatrollerActive ? false : true,
                            isPatrollerAssignedAndActivatedByAdmin: isMakePatrollerActive ? true : false,
                            patroller: findLocation.patroller,
                            patrollerEmail: findLocation.patroller.email,
                            patrollerId: findLocation.patroller.patrollerId,
                            companyName: findLocation.patroller.companyName,
                            statusChangedFrom: '',
                            statusChangedTo: isMakePatrollerActive ? 'active': 'pending',
                            currentstatus: isMakePatrollerActive ? 'active': 'pending'
                        };
                        let findUpdatePatrollerLog2 = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog2 } }, { new: true }).sort({ createdAt: -1 });
                        // let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, patrollerLog, { new: true }).sort({ createdAt: -1 });
                        if(findUpdatePatrollerLog2){
                            console.log(findUpdatePatrollerLog2, '    findUpdatePatrollerLog2');
                            // console.log(findUpdatePatrollerLog.isIssueCreatedOnJira, '    findUpdatePatrollerLog.isIssueCreatedOnJira2');
    
                            let description = `* Admin removed patroller`;
        
                            let id = findUpdatePatrollerLog2.jiraIssueKeyId;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
    
                                if(response.statusCode == 201){
                                    let previousDescription = '';
                                    let description = '';
                                    if(isMakePatrollerActive){
                                        // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned and activated by admin for location.`;
                                        description = `* Admin Activated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                                    }
                                    else{
                                        // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned by admin for location.`;
                                        description = `* Admin Associated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                                    }
                                    let textToPrint = '';
                    
                                    let id = findUpdatePatrollerLog2.jiraIssueKeyId;
                                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                                    request( addCommentJson, (error, response, body) => {
                                        console.log(error, '    error of addCommentJson');
                                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                        // console.log(response, '    response of addCommentJson');
                                        console.log(body, '    body of addCommentJson');
                                    });
                                }
                            });
    
                            if(findLocation.isPatrollerPending){
                                let transitionForJiraIssue = {
                                    url: constant.jiraCredentials.createIssueUrl+`/${id}/transitions`,
                                    auth: constant.jiraCredentials.auth,
                                    method: 'POST',
                                    body: {
                                        transition: {
                                            id: '21'
                                        }
                                    },
                                    json: true
                                };
                    
                                request( transitionForJiraIssue, (error, response, body) => {
                                    console.log(error, '    error of transitionForJiraIssue');
                                    console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                    // console.log(response, '    response of transitionForJiraIssue');
                                    console.log(body, '    body of transitionForJiraIssue');
                                });
                            }
                        }


                    }

                    let distance;
                    let x;
                    let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                    request(link, function (error, response, body){
                        // console.log('error:', error);
                        // console.log('response -- :', response, ': -- response');
                        console.log('statusCode:', response.statusCode);
                        console.log('body:', body);
                        x = JSON.parse(body);
                        console.log('Distance: ', x.rows[0].elements[0].distance.text);
                        if(x.status == 'OK'){
                            distance = x.rows[0].elements[0].distance.text;
                            sendEmailToPatroller(distance);
                        }
                        else{
                            distance = 0;
                            sendEmailToPatroller(distance);
                        }
                    });
    
                    function sendEmailToPatroller(distance){

                        // Email sent to host if admin ends patrol relation
                        emailService.adminEndedPatrolRelation(findLocation, (err, resp) => {
                            if(err){
                                console.log(err);
                                sendAnotherEmailAfterAbove();
                            }
                            else{
                                console.log(resp);
                                sendAnotherEmailAfterAbove();
                            }
                        });

                        function sendAnotherEmailAfterAbove(){
                            if(isMakePatrollerActive){
                                emailService.adminAssignsPatrollerToLocationEmailToPatroller(findLocation, 'activated', 'Activated', distance, (err, resp) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(resp);
                                    }
                                });
        
                                emailService.adminAssignsPatrollerToLocationEmailToHost(findLocation, 'activated', 'Activated', distance, (err, resp) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(resp);
                                    }
                                });
                            }
                            else{
                                emailService.adminAssignsPatrollerToLocationEmailToPatroller(findLocation, 'associated', 'Associated', distance, (err, resp) => {
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log(resp);
                                    }
                                });
                            }
                        }
                    }


                    sendEmailToHostAndPatrollerWhenAdminDisablesRelation(findLocation, previousPatroller);
    
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: isMakePatrollerActive ? constant.message.patrollerRequestActivated : constant.message.patrollerRequestAssociated,
                        data: []
                    });

                    
                }
                else{
                    constant.function.parkingLotNotFound(res);
                }
            }
            else{
                constant.function.dataNotFound(res);
            }
        }
        else{
            let findPatroller = await User.findOne({ _id: patroller, isPatroller: true, isDeleted: false });
            if(findPatroller){
    
                if(isMakePatrollerActive){
                    updatedJson = { patroller: findPatroller, isPatrollerRequested: false, isPatrollerActive: true, patrollerAssignedStatus: 'active', patrollerActiveDate: moment.utc().format() };
                }
                else{
                    updatedJson = { patroller: findPatroller, isPatrollerRequested: false, isPatrollerPending: true, patrollerAssignedStatus: 'pending', patrollerPendingDate: moment.utc().format() };
                }
    
                let findLocation = await ParkingLot.findOneAndUpdate({ zone: location, isDeleted: false }, { $set: updatedJson }, { new: true }).populate('manager patroller patrollerLogs');
                if(findLocation){
                    // findLocation.patrollerHistory.push(findPatroller);
                    // findLocation.save();
    
                    if(findLocation.patrollerLogs.length == 0){
                        let patrollerJson = {
                            location: findLocation,
                            zone: findLocation.zone,
                            requestCreatedBy: findLocation.manager,
            
                            logs: {
                                date: moment.utc().format(),
                                isPatrollerAssignedByAdmin: isMakePatrollerActive ? false : true,
                                isPatrollerAssignedAndActivatedByAdmin: isMakePatrollerActive ? true : false,
                                patroller: findLocation.patroller,
                                patrollerEmail: findLocation.patroller.email,
                                patrollerId: findLocation.patroller.patrollerId,
                                companyName: findLocation.patroller.companyName,
                                statusChangedFrom: '',
                                statusChangedTo: isMakePatrollerActive ? 'active': 'pending',
                                currentstatus: isMakePatrollerActive ? 'active': 'pending'
                            }
                        };
                        let log = new PatrollerLogs(patrollerJson);
                        let newLog = await log.save();
                        if(newLog){
                            findLocation.update({ $push: { patrollerLogs: newLog } }, (error, resp) => {
                                if(resp){
                                    // return;
                                }
                                else{
                                    // return;
                                }
                            });
            
                            let summary = `Zone: ${findLocation.zone}`;
                            let textToPrint = constant.function.getJiraIssueHeading(findLocation);
                            let jiraServiceDeskoptions = constant.function.createPatrollerRequestForJiraIssue(summary, textToPrint, findLocation.manager);
    
                            request( jiraServiceDeskoptions , (error, response, body) => {
                                console.log(error, '    error of issue in jira service desk');
                                console.log(response.statusCode, '    response.statusCode of issue in jira service desk');
                                // console.log(response, '    response of issue in jira service desk');
                                // console.log(body, '    body of issue in jira service desk');
                                console.log(body.key, '    body.key of issue in jira service desk');
                                let id = body.key;
    
                                if(response.statusCode == 201){
    
                                    let id = body.key;
                                    let description;
                                    if(isMakePatrollerActive){
                                        // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned and activated by admin for location.`;
                                        description = `* Admin Activated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                                    }
                                    else{
                                        // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned by admin for location.`;
                                        description = `* Admin Associated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                                    }                                
                                    let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                                    request( addCommentJson, (error, response, body) => {
                                        console.log(error, '    error of addCommentJson');
                                        console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                        // console.log(response, '    response of addCommentJson');
                                        console.log(body, '    body of addCommentJson');
                                    });
        
                                    let transitionForJiraIssue = {
                                        url: constant.jiraCredentials.createIssueUrl+`/${body.key}/transitions`,
                                        auth: constant.jiraCredentials.auth,
                                        method: 'POST',
                                        body: {
                                            transition: {
                                                id: '31'
                                            }
                                        },
                                        json: true
                                    };
                        
                                    request( transitionForJiraIssue, (error, response, body) => {
                                        console.log(error, '    error of transitionForJiraIssue');
                                        console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                        // console.log(response, '    response of transitionForJiraIssue');
                                        console.log(body, '    body of transitionForJiraIssue');
    
                                        if(isMakePatrollerActive){
                                            constant.function.updatePatrollerTransition(id, '61');
                                        }
                                        else{
                                            constant.function.updatePatrollerTransition(id, '51');
                                        }
                                    });
                                }
            
                                newLog.update({ $set: { jiraIssueKeyId: body.key, isIssueCreatedOnJira: true } }, (error, resp) => {
                                    if(resp){
                                        // return;
                                    }
                                    else{
                                        // return;
                                    }
                                });
            
                            });
            
                        }
                    }
                    else{
                        let patrollerLog = {
                            date: moment.utc().format(),
                            isPatrollerAssignedByAdmin: isMakePatrollerActive ? false : true,
                            isPatrollerAssignedAndActivatedByAdmin: isMakePatrollerActive ? true : false,
                            patroller: findLocation.patroller,
                            patrollerEmail: findLocation.patroller.email,
                            patrollerId: findLocation.patroller.patrollerId,
                            companyName: findLocation.patroller.companyName,
                            statusChangedFrom: '',
                            statusChangedTo: isMakePatrollerActive ? 'active': 'pending',
                            currentstatus: isMakePatrollerActive ? 'active': 'pending'
                        };
                        let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                        // let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, patrollerLog, { new: true }).sort({ createdAt: -1 });
                        if(findUpdatePatrollerLog){
                            console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');
                            // console.log(findUpdatePatrollerLog.isIssueCreatedOnJira, '    findUpdatePatrollerLog.isIssueCreatedOnJira');
            
                            let previousDescription = '';
                            let description = '';
                            if(isMakePatrollerActive){
                                // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned and activated by admin for location.`;
                                description = `* Admin Activated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                            }
                            else{
                                // description = `* Patroller ${findLocation.patroller.email} (${findLocation.patroller.patrollerId}) is assigned by admin for location.`;
                                description = `* Admin Associated: ${findLocation.patroller.patrollerId} ${findLocation.patroller.companyName}.`;
                            }
                            let textToPrint = '';
            
                            let id = findUpdatePatrollerLog.jiraIssueKeyId;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
                                if(response.statusCode == 201){
                                    if(isMakePatrollerActive){
                                        constant.function.updatePatrollerTransition(id, '61');
                                    }
                                    else if(!isMakePatrollerActive && (lastStatus == 'none')){
                                        constant.function.updatePatrollerTransition(id, '21');
                                    }
                                    else{
                                        constant.function.updatePatrollerTransition(id, '51');
                                    }
                                }
                            });
    
                            // let getJiraIssueUrl = {
                            //     url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                            //     auth: constant.jiraCredentials.auth,
                            //     method: 'GET',
                            //     body: {},
                            //     json: true
                            // };
                            // request( getJiraIssueUrl, (error, response, body) => {
                            //     console.log(error, '    error of get issue in jira api 9');
                            //     console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                            //     // console.log(response, '    response of get issue in jira api');
                            //     console.log(body, '    body of get issue in jira api');
                            //     // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                            //     if(response.statusCode == 200){
                            //         previousDescription = body.fields.description.content[0].content[0].text+'\n';
                            //         textToPrint = previousDescription + description;
    
                            //         let jiraServiceDeskoptions = constant.function.updatePatrollerRequestForJiraIssue(body.key, textToPrint);
                                    
                            //         request( jiraServiceDeskoptions , (error, response, body) => {
                            //             console.log(error, '    error of update issue in jira service desk 7');
                            //             console.log(response.statusCode, '    response.statusCode of update issue in jira service desk');
                            //             // console.log(response, '    response of update issue in jira service desk');
                            //             console.log(body, '    body of update issue in jira service desk');
    
                            //             if(response.statusCode == 204){
                            //                 if(isMakePatrollerActive){
                            //                     constant.function.updatePatrollerTransition(id, '31');
                            //                 }
                            //                 else{
                            //                     constant.function.updatePatrollerTransition(id, '11');
                            //                 }
                            //             }
    
                            //         });
                                    
                            //     }
                            // });
            
                        }
                    }
    
                    let distance;
                    let x;
                    let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                    request(link, function (error, response, body){
                        // console.log('error:', error);
                        // console.log('response -- :', response, ': -- response');
                        console.log('statusCode:', response.statusCode);
                        console.log('body:', body);
                        x = JSON.parse(body);
                        console.log('Distance: ', x.rows[0].elements[0].distance.text);
                        if(x.status == 'OK'){
                            distance = x.rows[0].elements[0].distance.text;
                            sendEmailToPatroller(distance);
                        }
                        else{
                            distance = 0;
                            sendEmailToPatroller(distance);
                        }
                    });
    
                    function sendEmailToPatroller(distance){
                        if(isMakePatrollerActive){
                            emailService.adminAssignsPatrollerToLocationEmailToPatroller(findLocation, 'activated', 'Activated', distance, (err, resp) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(resp);
                                }
                            });
    
                            emailService.adminAssignsPatrollerToLocationEmailToHost(findLocation, 'activated', 'Activated', distance, (err, resp) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(resp);
                                }
                            });
                        }
                        else{
                            emailService.adminAssignsPatrollerToLocationEmailToPatroller(findLocation, 'associated', 'Associated', distance, (err, resp) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(resp);
                                }
                            });
                        }
                    }
    
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: isMakePatrollerActive ? constant.message.patrollerRequestActivated : constant.message.patrollerRequestAssociated,
                        data: []
                    });
                }
                else{
                    constant.function.parkingLotNotFound(res);
                }
    
            }
            else{
                constant.function.dataNotFound(res);
            }
        }

        async function sendEmailToHostAndPatrollerWhenAdminDisablesRelation(location, previousPatroller){

            let findPatroller = await User.findOne({ _id: previousPatroller, isDeleted: false });
            if(findPatroller){
                // Email sent to patroller if admin or host ends patrol relation
                emailService.hostEndedPatrolRelation(location, findPatroller, false, (err, resp) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(resp);
                    }
                });
            }

            // Email sent to host if admin ends patrol relation
            emailService.adminEndedPatrolRelation(location, (err, resp) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(resp);
                }
            });
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.removePatrollerByAdmin = async (req, res) => {
    try {
        let loggedInUser = req.user._id;
        // console.log(req.body, '   req.body of removePatrollerByAdmin');
        const { location, removePatrollerPermanently } = req.body;

        let hostOradmin = await User.findOne( { $or: [{ _id: loggedInUser, role: '1', isDeleted: false }, { _id: loggedInUser, role: '2', isDeleted: false }] } );
        if(hostOradmin){

            let isManager = hostOradmin.isManager;

            let updatedJson = {
                patrollerAssignedStatus: 'none',
                isPatrollerRequested: false,
                isPatrollerPending: false,
                isPatrollerActive: false,
                // patroller: null
            };
    
            // let updateLocation = await ParkingLot.findOneAndUpdate({ _id: location, isDeleted: false }, { $set: updatedJson }, { new: true }).populate('manager patroller');
            let updateLocation = await ParkingLot.findOneAndUpdate({ _id: location, isDeleted: false }, { $set: updatedJson }).populate('manager patroller');
            if(updateLocation){

                let patrollerLog = {
                    date: moment.utc().format(),
                    isPatrollerRemovedByAdmin: hostOradmin.isManager ? false : true,
                    isPatrollerRemovedByHost: hostOradmin.isManager ? true : false,
                    // patroller: '',
                    patrollerEmail: '',
                    patrollerId: '',
                    companyName: '',
                    statusChangedFrom: '',
                    statusChangedTo: 'none',
                    currentstatus: 'none'
                };
                let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                if(findUpdatePatrollerLog){
                    console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');
    
                    let previousDescription = '';
                    let description = ``;
                    let textToPrint = '';
    
                    if(removePatrollerPermanently){
                        // description = `* Patroller ${updateLocation.patroller.email} (${updateLocation.patroller.patrollerId}) removed by admin from location.(Patroller removed permanently from location)`;
                        description = isManager ? `* Host disabled patrolling services` : `* Admin removed patroller & disabled patrolling services`;
    
                        let id = findUpdatePatrollerLog.jiraIssueKeyId;
                        let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                        request( addCommentJson, (error, response, body) => {
                            console.log(error, '    error of addCommentJson');
                            console.log(response.statusCode, '    response.statusCode of addCommentJson');
                            // console.log(response, '    response of addCommentJson');
                            console.log(body, '    body of addCommentJson');
                            if(response.statusCode == 201){
                                if(updateLocation.patrollerAssignedStatus == 'requested'){
                                    let transitionForJiraIssue = {
                                        url: constant.jiraCredentials.createIssueUrl+`/${id}/transitions`,
                                        auth: constant.jiraCredentials.auth,
                                        method: 'POST',
                                        body: {
                                            transition: {
                                                id: '91'
                                            }
                                        },
                                        json: true
                                    };
                        
                                    request( transitionForJiraIssue, (error, response, body) => {
                                        console.log(error, '    error of transitionForJiraIssue');
                                        console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                        // console.log(response, '    response of transitionForJiraIssue');
                                        console.log(body, '    body of transitionForJiraIssue');
                                        if(response.statusCode == 204){
                                            constant.function.updatePatrollerTransition(id, '71');
                                        }
                                    });
                                }
                                else if(updateLocation.patrollerAssignedStatus == 'requestedAndNotFound'){
                                    constant.function.updatePatrollerTransition(id, '61');
                                }
                                else if(updateLocation.isPatrollerPending){
                                    constant.function.updatePatrollerTransition(id, '71');
                                }
                            }
                        });
                    }
                    else{
                        // description = `* Patroller ${updateLocation.patroller.email} (${updateLocation.patroller.patrollerId}) removed by admin from location.`;
                        description = isManager ? `* Host disabled patrolling services & auto-requested another relationship` : `* Admin removed patroller & auto-requested another relationship`;
    
                        let id = findUpdatePatrollerLog.jiraIssueKeyId;
                        let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                        request( addCommentJson, (error, response, body) => {
                            console.log(error, '    error of addCommentJson');
                            console.log(response.statusCode, '    response.statusCode of addCommentJson');
                            // console.log(response, '    response of addCommentJson');
                            console.log(body, '    body of addCommentJson');
                            if(response.statusCode == 201){
                                if(updateLocation.isPatrollerRequested && updateLocation.patrollerAssignedStatus == 'requested'){
                                    constant.function.updatePatrollerTransition(id, '101');
                                    findAndAssignNewPatroller(updateLocation);
                                }
                                else if(updateLocation.isPatrollerRequested && updateLocation.patrollerAssignedStatus == 'requestedAndNotFound'){
                                    let transitionForJiraIssue = {
                                        url: constant.jiraCredentials.createIssueUrl+`/${id}/transitions`,
                                        auth: constant.jiraCredentials.auth,
                                        method: 'POST',
                                        body: {
                                            transition: {
                                                id: '61'
                                            }
                                        },
                                        json: true
                                    };
                        
                                    request( transitionForJiraIssue, (error, response, body) => {
                                        console.log(error, '    error of transitionForJiraIssue');
                                        console.log(response.statusCode, '    response.statusCode of transitionForJiraIssue');
                                        // console.log(response, '    response of transitionForJiraIssue');
                                        console.log(body, '    body of transitionForJiraIssue');
                                        if(response.statusCode == 204){
                                            constant.function.updatePatrollerTransition(id, '11');
                                            findAndAssignNewPatroller(updateLocation);
                                        }
                                    });
                                }
                                else if(updateLocation.isPatrollerPending){
                                    constant.function.updatePatrollerTransition(id, '81');
                                    findAndAssignNewPatroller(updateLocation);
                                }
                                else if(updateLocation.isPatrollerActive){
                                    constant.function.updatePatrollerTransition(id, '11');
                                    findAndAssignNewPatroller(updateLocation);
                                }
                            }
                        });
                    }
                }

                async function findAndAssignNewPatroller(parkingLot){
                    let previousPatrollers = parkingLot.patrollerHistory;
                    let query = previousPatrollers.length == 0 ? { location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false } : { _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 160934, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false };
                    // let nearPatrollers = await User.find({ _id: { $nin: previousPatrollers }, location: { $near: { $maxDistance: 4400000, $geometry: { type: "Point", coordinates: [ parkingLot.longitude, parkingLot.latitude ] } } }, isPatroller: true, isActivated: true, isDeleted: false });
                    let nearPatrollers = await User.find(query);
                    console.log(nearPatrollers, '     near patrollers in assignPatrollerForLocation api');
                    if(nearPatrollers){
                        if(nearPatrollers.length == 0){
                            updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                            console.log('Update jira ticket 3333');
                        }
                        else{
                            let getAvailablePatrollerListForLog = constant.function.getAvailablePatrollerListForLog(nearPatrollers);

                            let getRandomNumber = Math.floor(Math.random() * (nearPatrollers.length));
                            let findPatroller = nearPatrollers[getRandomNumber];

                            // let findLocation = await ParkingLot.findOne({ zone: location, isDeleted: false });
                            let findLocation = await ParkingLot.findOneAndUpdate({ _id: parkingLot, isDeleted: false }, { $set: { patroller: findPatroller, isPatrollerRequested: true, patrollerAssignedStatus: 'requested', patrollerRequestedDate: moment.utc().format() } }, { new: true });
                            if(findLocation){

                                findLocation.patrollerHistory.push(findPatroller);
                                findLocation.save();

                                createPatrollerLog(findPatroller);

                                let distance;
                                let x;
                                let link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${findPatroller.latitude},${findPatroller.longitude}&destinations=${findLocation.latitude},${findLocation.longitude}&key=${constant.googlePlacesApiKey}`;
                                request(link, function (error, response, body){
                                    // console.log('error:', error);
                                    // console.log('response -- :', response, ': -- response');
                                    console.log('statusCode:', response.statusCode);
                                    console.log('body:', body);
                                    x = JSON.parse(body);
                                    console.log('Distance: ', x.rows[0].elements[0].distance.text);
                                    if(x.status == 'OK'){
                                        distance = x.rows[0].elements[0].distance.text;
                                        requestPatroller();
                                    }
                                    else{
                                        distance = 0;
                                        requestPatroller();
                                    }
                                });

                                async function createPatrollerLog(findPatroller){
                                    let patrollerLog = {
                                        date: moment.utc().format(),
                                        isNewPatrollerAssigned: true,
                                        patroller: findPatroller,
                                        patrollerEmail: findPatroller.email,
                                        patrollerId: findPatroller.patrollerId,
                                        companyName: findPatroller.companyName,
                                        statusChangedFrom: '',
                                        statusChangedTo: 'requested',
                                        currentstatus: 'requested'
                                    };
                                    let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: updateLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                                    if(findUpdatePatrollerLog){
                                        console.log(findUpdatePatrollerLog, '    findUpdatePatrollerLog');


                                        setTimeout(() => {
                                            let previousDescription = '';
                                            // let description = `* New patroller assigned is ${findPatroller.email} (${findPatroller.patrollerId}), previous one opted out location.`;
                                            let description = getAvailablePatrollerListForLog +`* Request Issued: ${findPatroller.patrollerId} ${findPatroller.companyName}.`;
                                            let textToPrint = '';
                        
                                            let id = findUpdatePatrollerLog.jiraIssueKeyId;
                                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                                            request( addCommentJson, (error, response, body) => {
                                                console.log(error, '    error of addCommentJson');
                                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                                // console.log(response, '    response of addCommentJson');
                                                console.log(body, '    body of addCommentJson');
                                                if(response.statusCode == 201){
                                                    constant.function.updatePatrollerTransition(id, '41');
                                                }
                                            });

                                        }, 10000);





                                    }
                                }

                                function requestPatroller() {
                                    emailService.requestForPatroller(findLocation, findPatroller, distance, (err, resp) => {
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
                                }
                            }
                            else{
                                // constant.function.parkingLotNotFound(res);
                            }
                        }
                    }
                    else{
                        updateJiraTicketForLocationIfNoPatrollerFound(parkingLot);
                    }
                }

                async function updateJiraTicketForLocationIfNoPatrollerFound(findLocation){
                    console.log('Update jira ticket');

                    setTimeout(async () => {
                        let patrollerLog = {
                            date: moment.utc().format(),
                            isNoPatrollerFound: true,
                            // patroller: findPatroller,
                            // patrollerEmail: findPatroller.email,
                            statusChangedFrom: '',
                            statusChangedTo: 'requested',
                            currentstatus: 'requested'
                        };
                        let findUpdatePatrollerLog = await PatrollerLogs.findOneAndUpdate({ location: findLocation, isActive: true }, { $push: { logs: patrollerLog } }, { new: true }).sort({ createdAt: -1 });
                        if(findUpdatePatrollerLog){
                            let previousDescription = '';
                            // let description = `* No patroller found for location, try creating new patroller and then assign OR assign one of the existing patroller manually.`;
                            let description = `* No patroller found; Admin interaction required.`;
                            let textToPrint = '';
        
                            let id = findUpdatePatrollerLog.jiraIssueKeyId;
                            let addCommentJson = constant.function.addCommentToJiraIssue(id, description);
                            request( addCommentJson, (error, response, body) => {
                                console.log(error, '    error of addCommentJson');
                                console.log(response.statusCode, '    response.statusCode of addCommentJson');
                                // console.log(response, '    response of addCommentJson');
                                console.log(body, '    body of addCommentJson');
                                if(response.statusCode == 201){
                                    constant.function.updatePatrollerTransition(id, '31');
                                }
                            });
        
                            findLocation.update({ $set: { patrollerAssignedStatus: 'requestedAndNotFound', isPatrollerRequested: true, patrollerRequestedDate: moment.utc().format() } }, (reject, resolve) => {
                                if(resolve){
                                    return;
                                }
                                else{
                                    return;
                                }
                            });   
                        }
                    }, 10000);



                }

                updateLocation.update({ $set: { patroller: null } }, (error, resp) => {
                    if(resp){
                        // return;
                    }
                    else{
                        // return;
                    }
                });

                // if(updateLocation.patrollerAssignedStatus == 'requestedAndNotFound'){
                //     updateLocation.update({ $set: { patroller: null } }, (error, resp) => {
                //         if(resp){
                //             // return;
                //         }
                //         else{
                //             // return;
                //         }
                //     });
                // }

                if(updateLocation.patrollerAssignedStatus == 'active'){

                    let isHost = hostOradmin.isManager ? true : false;
                    
                    // Email sent to patroller if admin or host ends patrol relation
                    emailService.hostEndedPatrolRelation(updateLocation, updateLocation.patroller, isHost, (err, resp) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(resp);
                        }
                    });

                    // Email sent to host if admin ends patrol relation
                    if(hostOradmin.role == '1'){
                        emailService.adminEndedPatrolRelation(updateLocation, (err, resp) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(resp);
                            }
                        });
                    }

                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: removePatrollerPermanently ? constant.message.patrollerRemovedFromLocation + `. A message has been sent to ${updateLocation.patroller.companyName} to remove its signage` : constant.message.patrollerRequestBeingProcessed,
                        data: []
                    });
                }
                else{
                    return res.status(constant.httpCode.success).json({
                        success: true,
                        code: constant.httpCode.success,
                        message: removePatrollerPermanently ? constant.message.patrollerRemovedFromLocation : constant.message.patrollerRequestBeingProcessed,
                        data: []
                    });
                }
            }
            else{
                constant.function.parkingLotNotFound(res);
            }

        }
        else{
            constant.function.unauthorizedAccess(res);
        }

    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.createCustomerInJira = async (req, res) => {
    try {
        // console.log(req.body, '  createCustomerInJira req.body');
        let { _id } = req.body;

        let user = await User.findOne({ _id: _id });
        if(user){
            if(user.isCustomerCreatedOnJira){
                return res.status(constant.httpCode.success).json({
                    success: false,
                    code: constant.httpCode.badRequest,
                    message: constant.message.customerAlreadyInJira,
                    data: []
                });
            }
            else{
                // constant.function.createCustomerInJira(user);

                let createJiraCustomerJson = {
                    url: constant.jiraCredentials.createCustomerUrl,
                    auth: constant.jiraCredentials.auth,
                    method: 'POST',
                    body: {
                        displayName: user.email,
                        email: user.email
                    },
                    json: true
                };
    
                request( createJiraCustomerJson, (error, response, body) => {
                    console.log(error, '    error of create customer in jira api');
                    console.log(response.statusCode, '    response.statusCode of create customer in jira api');
                    // console.log(response, '    response of create customer in jira api');
                    console.log(body, '    body of create customer in jira api');
    
                    if(response.statusCode == 201){
                        user.update({ $set: { jiraCustomerAccountId: body.accountId, isCustomerCreatedOnJira: true } }, (reject, resolve) => {
                            if(resolve){
                                return;
                            }
                            else{
                                return;
                            }
                        });

                        return res.status(constant.httpCode.success).json({
                            success: true,
                            code: constant.httpCode.success,
                            message: constant.message.customerCreatedInJira,
                            data: []
                        });

                    }
                    else{
                        let getJiraUsersJson = constant.function.getCustomersFromJira();
                        request( getJiraUsersJson, (error, response, body) => {
                            console.log(error, '    error of get customers in jira api');
                            console.log(response.statusCode, '    response.statusCode of get customers in jira api');
                            // console.log(response, '    response of get customers in jira api');
                            console.log(body, '    body of get customers in jira api');
    
                            if(response.statusCode == 200){
                                let flag = false;
                                for(let i=0;i<body.length;i++){
                                    if(body[i].emailAddress == user.email){
                                        flag = true;
                                        user.update({ $set: { jiraCustomerAccountId: body[i].accountId, isCustomerCreatedOnJira: true } }, (reject, resolve) => {
                                            if(resolve){
                                                return;
                                            }
                                            else{
                                                return;
                                            }
                                        });
                                        break;
                                    }
                                }

                                if(flag){
                                    return res.status(constant.httpCode.success).json({
                                        success: true,
                                        code: constant.httpCode.success,
                                        message: constant.message.customerCreatedInJira,
                                        data: []
                                    });
                                }
                                else{
                                    return res.status(constant.httpCode.success).json({
                                        success: false,
                                        code: constant.httpCode.badRequest,
                                        message: constant.message.customerNotCreatedInJira,
                                        data: []
                                    });
                                }

                            }
                            else{
                                console.log('Error finding customers in jira');

                                return res.status(constant.httpCode.success).json({
                                    success: false,
                                    code: constant.httpCode.badRequest,
                                    message: constant.message.customerNotCreatedInJira,
                                    data: []
                                });
                            }
                        });
                    }
    
                });
            }
        }
        else{
            constant.function.userNotFound(res);
        }
    } catch (err) {
        constant.function.serverError(res, err);
    }
}

exports.sendEmailVerificationLink = async (req, res) => {
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
            let emailVerificationNumber = constant.function.generateActivationNumber();
            let encryptedEmail = cryptr.encrypt(email);
            let emailVerificationLink = constant.function.getEmailVerificationLink(emailVerificationNumber, encryptedEmail);
            console.log(emailVerificationLink, '----email verification link');
            
            let updateUser = await User.findOneAndUpdate({ email: email, isDeleted: false }, { $set: { emailVerificationNumber: emailVerificationNumber } }, { new: true });
            if(updateUser){
                emailService.verifyEmail(email, emailVerificationLink, updateUser.firstName, (err, resp) => {
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
                            message: constant.message.verifyEmailNow,
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

exports.postVerifyEmail = async (req, res) => {
    try {
        let { jpn, verify, etl } = req.body;
        let decryptedEmail = cryptr.decrypt(etl);
        let emailVerificationNumber = jpn;

        let randomNumber = constant.function.generateActivationNumber();
        let updateUser = await User.findOneAndUpdate({ email: decryptedEmail, isDeleted: false, emailVerificationNumber: emailVerificationNumber }, { $set: { isEmailVerified: true, emailVerificationNumber: randomNumber } }, { new: true });
        if(updateUser){
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.emailVerified,
                data: updateUser.email
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
    } catch (err) {
        constant.function.serverError(res, err);
    }
}