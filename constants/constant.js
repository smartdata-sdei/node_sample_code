let Cryptr = require('cryptr');
let shortid = require('shortid');
let cryptr = new Cryptr('xyz');
let request = require('request');
let QuickBooks = require('node-quickbooks');
let braintree = require('braintree');
let environment = require('../environments/environment');
let constant = {
    googlePlacesApiKey: '',
    secretKeys: {
        cryptrSecretKey: ''
    },
    jiraCredentials: {
        createCustomerUrl: '',
        getCustomersUrl: '',
        createIssueUrl: '',
        customerSupport_projectKey: 'DESK',
        productDevelopment_projectKey: 'OPS',
        opsWorkFlowPatrol: 'PW',
        productOrder_issuetypeName: 'Product Order',
        apiIssue_issuetypeName: 'API Issue',
        supportUserId: '',
        auth: {
            user: '',
            pass: ''
        },
        supportAuth: {
            user: '',
            pass: ''
        },
    },
    snipcartCredentials: {
        secretApiKey: ''
    },
    taxCloudCredentials: {
        apiKey: '', // Test API key
        apiLoginID: '', // Test login ID

        TIC: '0',
        // TIC: '91000',
        // TIC: '10010',
        verifyAddressUrl: '',
        lookupUrl: '',
        authorizedWithCaptureUrl: '',
        returnedUrl: '',
        origin: {
            Address1: '',
            Address2: '',
            City: '',
            State: '',
            Zip5: '',
            Zip4: ''
        }
    },
    braintreeCredentials: {
        fixedConvenienceFee: 0.30,
        creditCardPercentage: 2.9,

        environment: braintree.Environment.Sandbox,
        merchantId: '',
        publicKey: '',
        privateKey: ''
    },
    intuitCredentials: {
        clientId: '',
        clientSecret: '',
        environment: 'sandbox',
        redirectUri: '',
        companyId: '',
        merchantId: ''
    },
    intuitRef: {
        default_ClassRefName: '000000',
        default_ClassRefValue: '5000000000000142480',


        braintree_VendorRefName: 'Braintree',
        braintree_VendorRefValue: '150',

        snipcart_VendorRefName: 'Snipcart',
        snipcart_VendorRefValue: '151',

        buildASign_VendorRefName: 'BuildASign',
        buildASign_VendorRefValue: '149',

        taxCloud_VendorRefName: 'TaxCloud',
        taxCloud_VendorRefValue: '152',


        net30_SalesTermRefName: 'Net 30',
        net30_SalesTermRefValue: '3',


        parking_DepartmentRefName: 'Parking',
        parking_DepartmentRefValue: '2',

        products_DepartmentRefName: 'Products',
        products_DepartmentRefValue: '29',



        creditCard_PaymentMethodRefName: 'Credit Card',
        creditCard_PaymentMethodRefValue: '9',

        wallet_PaymentMethodRefName: 'Wallet',
        wallet_PaymentMethodRefValue: '8',


        creditCardProcessingFixed_DepositToAccountRefName: 'Bank Charges & Fees:Credit Card Processing Fixed',
        creditCardProcessingFixed_DepositToAccountRefValue: '96',

        creditCardProcessingVariable_DepositToAccountRefName: 'Bank Charges & Fees:Credit Card Processing Variable',
        creditCardProcessingVariable_DepositToAccountRefValue: '95',

        pcbOperating_DepositToAccountRefName: 'PCB Operating',
        pcbOperating_DepositToAccountRefValue: '91',

        walletClearingAccount_DepositToAccountRefName: 'Wallet Clearing Account',
        walletClearingAccount_DepositToAccountRefValue: '102',

        undepositedFunds_DepositToAccountRefName: 'Undeposited Funds',
        undepositedFunds_DepositToAccountRefValue: '4',

        braintreeTransactionSettlement_DepositToAccountRefName: 'Braintree Transaction Settlement',
        braintreeTransactionSettlement_DepositToAccountRefValue: '110',


        lotProfitSplitParking_AccountRefName: 'Lot Profit Split Parking',
        lotProfitSplitParking_AccountRefValue: '98',


        servicesParkingFee_ItemRefName: 'Parking Fee',
        servicesParkingFee_ItemRefValue: '21',

        convenienceFee_ItemRefName: 'Convenience Fee',
        convenienceFee_ItemRefValue: '20',

        creditCardProcessingFixed_ItemRefName: 'Credit Card Processing Fixed',
        creditCardProcessingFixed_ItemRefValue: '24',

        creditCardProcessingVariable_ItemRefName: 'Credit Card Processing Variable',
        creditCardProcessingVariable_ItemRefValue: '25',

        walletFunds_ItemRefName: 'Wallet Funds',
        walletFunds_ItemRefValue: '23',


        SP1001812SPNA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park No Arrow Aluminum',
        SP1001812SPNA80REFAL_ItemRefValue: '24',

        SP1001812SPLA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park Left Arrow Aluminum',
        SP1001812SPLA80REFAL_ItemRefValue: '30',

        SP1001812SPRA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park Right Arrow Aluminum',
        SP1001812SPRA80REFAL_ItemRefValue: '31',

        SP1001812SPBA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park Bidirectional Arrow Aluminum',
        SP1001812SPBA80REFAL_ItemRefValue: '32',

        SP1001812SPDA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park Down Arrow Aluminum',
        SP1001812SPDA80REFAL_ItemRefValue: '33',

        SP1001812SPAA80REFAL_ItemRefName: 'Signs:18\"x12\" Parking Sign  Park Angled Arrow Aluminum',
        SP1001812SPAA80REFAL_ItemRefValue: '34',

        SP1002418SPNA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park No Arrow Aluminum',
        SP1002418SPNA80REFAL_ItemRefValue: '35',

        SP1002418SPLA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Left Arrow Aluminum',
        SP1002418SPLA80REFAL_ItemRefValue: '36',

        SP1002418SPRA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Right Arrow Aluminum',
        SP1002418SPRA80REFAL_ItemRefValue: '37',

        SP1002418SPBA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Bidirectional Arrow Aluminum',
        SP1002418SPBA80REFAL_ItemRefValue: '38',

        SP1002418SPDA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Down Arrow Aluminum',
        SP1002418SPDA80REFAL_ItemRefValue: '39',

        SP1002418SPUA80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Up Arrow Aluminum',
        SP1002418SPUA80REFAL_ItemRefValue: '40',

        SP1002418SPCP80REFAL_ItemRefName: 'Signs:24\"x18\" Entrance Sign  Park Customer Parking Aluminum',
        SP1002418SPCP80REFAL_ItemRefValue: '41',

        discountsSigns_ItemRefName: 'Discounts - Signs',
        discountsSigns_ItemRefValue: '29',

        otherECommerceVariable_ItemRefName: 'Other:ECommerce Variable',
        otherECommerceVariable_ItemRefValue: '32',

        otherSalesTax_ItemRefName: 'Sales tax',
        otherSalesTax_ItemRefValue: '30',

        otherSalesTaxPreparationVariable_ItemRefName: 'Other:Sales Tax Preparation Variable',
        otherSalesTaxPreparationVariable_ItemRefValue: '44',

  
    },
    awsCredentials: {
        s3: {
            bucketName: ''
        },
        accessKeys: {
            accessKeyId: '',
            secretAccessKey: '',
            region: ''
        }
    },
    httpCode: {
        processing: 102,
        success: 200, // Go to success
        created: 201, // Go to success
        accepted: 202, // Go to success
        nonAuthInfo: 203, // Go to success
        noContent: 204, // Give data null and go to success
        found: 302,
        badRequest: 400,
        unauthorized: 401,
        subscriptionRequired: 402,
        forbidden: 403,
        notFound: 404,
        methodNotAllowed: 405,
        notAcceptable: 406,
        conflict: 409,
        noDataFound: 410,
        unProcessable: 422,
        internalServerError: 500,
        networkConnectTimeout: 599,
    },
    message: {
        validationError: 'Validation error, try again',
        accessDenied: 'Access denied, no token found',
        accountCreated: 'Your account has been created successfully',
        userAccountCreated: 'Account created, please enter OTP sent in mobile and email',
        userAccountCreatedByAdmin: 'Account created, details are sent to user via email',
        emailAlreadyExist: 'This email is taken, try another',
        mobileNumberAlreadyExist: 'This mobile number is taken, try another',
        emailAndMobileNumberAlreadyExist: 'This email & mobile number are taken, try another',
        invalidInputs: 'Email/Password is incorrect',
        userFound: 'User found',
        userNotFound: 'User not found',
        userUpdated: 'User updated successfully',
        userDeleted: 'User deleted successfully',
        driverUpdated: 'Driver updated successfully',
        driverDeleted: 'Driver deleted successfully',
        hostUpdated: 'Host updated successfully',
        hostDeleted: 'Host deleted successfully',
        patrollerUpdated: 'Patroller updated successfully',
        patrollerDeleted: 'Patroller deleted successfully',
        errorDeletingPatroller: 'Error deleting patroller, try after some time',
        contactUsMessageDeleted: 'Contact message deleted successfully',
        contactUsMessageNotFound: 'Contact message not found',
        errorCreatingAdmin: 'Error in creating admin profile',
        errorCreatingUser: 'Error in creating user profile',
        parkingSpaceCreated: 'New location created successfully',
        parkingSpaceUpdated: 'Location updated successfully',
        errorCreatingParkingSpace: 'Error in creating new location',
        profileFound: 'Profile found',
        profileNotFound: 'Profile not found',
        serverError: 'Something went wrong. Please try again or contact customer support',
        errorSendingEmail: 'Error in sending email, try again',
        resetPasswordNow: 'Check your email and reset your password now',
        verifyEmailNow: 'Check your email for verification link',
        emailVerified: 'Your Email is now Verified',
        sessionTimeout: 'Session timeout',
        signInSuccess: 'Signin success',
        accountNotActive: 'Account not active, please contact admin',
        setPasswordNow: 'Set password now',
        unauthorized: 'Unauthorized access',
        errorCreatingPassword: 'Error in creating password',
        passwordChangedSuccessfully: 'Password changed successfully',
        errorInPasswordChange: 'Invalid current password, try again',
        emailRequired: 'Email is required',
        passwordRequired: 'Password is required',
        mobileNumberRequired: 'Mobile number is required',
        usersFound: 'Users list found',
        usersNotFound: 'Users list not found',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'last name is required',
        addressRequired: 'Address is required',
        cityRequired: 'City name is required',
        stateRequired: 'State is required',

        dataSaved: 'Data saved',
        dataFound: 'Data found',
        dataNotFound: 'Data not found',
        dataAlreadyExists: 'Data already exists',

        refundGenerated: 'Refund generated',
        errorGeneratingRefund: 'Error generating refund',
        refundAlreadyGenerated: 'Refund already generated for this transaction',

        spotsNotFound: 'No results found within 50 miles',

        vehicleAdded: 'Vehicle added successfully',
        vehicleEdit: 'Vehicle edit successfully',
        vehicleRemoved: 'Vehicle removed successfully',

        parkingLotFound: 'Location found',
        parkingLotNotFound: 'Location not found',
        parkingLotDeleted: 'Location deleted successfully',
        requestCancelledForPatroller: 'Relationship Ended',

        errorCreatingTransaction: 'Error in transaction',
        transactionCreated: 'Your booking is confirmed',
        bookingNotAvailable: 'Booking not available, spaces full',

        accountNotVerified: 'Account not verified, click on link sent in email to verify your account',
        accountVerified: 'Account verified, now you can login to your account',

        taxRateUpdated: 'Tax rates updated successfully',
        taxRateNotUpdated: 'Error in tax rates update',

        userAlreadyExist: 'Email already verified, just signin directly',
        enterOtpNow: 'Enter OTP now',
        errorOccur: 'Error occur, try again',

        invalidOtp: 'OTP does not match, try again',
        setupPasswordNow: 'Setup password now',

        errorSendingContactUsForm: 'Error sending your message, try again',
        contactUsFormSent: 'Your message is received successfully',
        accountSwitchedToHost: 'You have created a Host Account',
        errorSwitchingAccountToHost: 'Error creating account to Host, try again',
        linkExpired: 'Link expired',

        wNineCreated: 'W-9 created successfully',
        errorCreatingWnine: 'Error creating W-9 form, try again',
        wNineUpdated: 'W-9 updated successfully',
        errorUpdatingWnine: 'Error updatig W-9 form, try again',

        signUpWelcomeMessageInSms: 'Thanks again for joining  Park! We promise not to spam you, but please note that we do send text notifications of bookings and expiration notices entirely for your convenience. You can always toggle these on/off in your profile settings. Happy parking!',

        moneyAddedToWallet: 'Money added to wallet successsfully',
        errorAddingMoneyToWallet: 'Error adding money to wallet',

        cardRemoved: 'Card removed successfully',
        errorRemovingSavedCard: 'Error removing card, try later',

        cardSetDefault: 'Card set to Default successfully',
        errorSettingCardAsDefault: 'Error Setting Card as Default, try again',

        braintreeCustomerFound: 'Braintree customer found',
        braintreeCustomerNotFound: 'Braintree customer not found',

        braintreePlansFound: 'Braintree plans found',
        braintreePlansNotFound: 'Braintree plans not found',

        createTokenForQuickBooks: 'Create new Token for Quickbooks API hit',
        quickBooksTokenSaved: 'Quickbooks token saved successfully',
        errorSavingQuickBooksToken: 'Error saving quickbooks token',
        errorFindingQuickBooksTokenFromDatabase: 'Error finding Quickbooks token from database',

        patrollerRequestSent: 'Patrol services pending',
        patrollerRequestAccepted: 'Please verify and activate this location',
        patrollerRequestActivated: 'Patroller is now Active',
        patrollerRequestAssociated: 'Patroller manually Associated',

        violationNotSaved: 'Error saving violation',
        violationSaved: 'Violation saved',
        violationUpdated: 'Violation status updated successfully',

        customerCreatedInQbo: 'Customer data created in QBO',
        customerNotCreatedInQbo: 'Error creating Customer in QBO',
        customerAlreadyInQbo: 'Customer data already present in QBO',

        locationCreatedInQbo: 'Location data created in QBO',
        locationNotCreatedInQbo: 'Error creating Location in QBO',
        locationAlreadyInQbo: 'Location data already present in QBO',

        vendorCreatedInQbo: 'Vendor data created in QBO',
        vendorNotCreatedInQbo: 'Error creating Vendor in QBO',
        vendorAlreadyInQbo: 'Vendor data already present in QBO',

        transactionCreatedInQbo: 'Transaction data created in QBO',
        transactionNotCreatedInQbo: 'Error creating Transaction in QBO',
        transactionAlreadyInQbo: 'Transaction data already present in QBO',

        noPatrollerPopulatesForLocation: 'Sorry, we do not yet have patrolling services in your area. We will create an internal work ticket regarding the matter and will follow up with you via email as soon as we find a solution. - The  Park Team',
        patrollerRequestReceived: 'We have received your request and will get back to you via email',
        patrollerAlreadyRequested: 'Patroller already requested for Location',
        patrollerRemovedFromLocation: 'Patrolling services are disabled for this location',
        patrollerRequestBeingProcessed: 'Existing patroller has been removed and new patrol service has been requested',

        customerCreatedInJira: 'Customer data created in Jira',
        customerNotCreatedInJira: 'Error creating Customer in Jira',
        customerAlreadyInJira: 'Customer data already present in Jira',
    },
    regEx: {
        // passwordRegEx: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}'
        // passwordRegEx: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
        passwordRegEx: /^.{7,}$/,
    },
    emailSubject: {
        signup: ' park account created successfully',
        resetPassword: ' park password help',
        verifyEmail: ' park Email Verification',
        accountCreated: ' park account created',
        parkingLotCreated: ' park location created',
        otpHelp: ' park OTP help',
        parkingPass: ' park Pass',
        extendParkingTime: 'Extend Parking time',
        patrollerRequest: 'New Service Request',
        patrollerRequestAccepted: 'Patrol Service Accepted',
        patrollerActivated: 'Patrol Service Activated',
        patrollerDeleted: 'Patroller Deleted',
        patrollerRelationEnded: 'Patrol Services Disabled',
        function: {
            newPatrollerRequest: (zone) => {
                return ` Park Zone ${zone} - New Service Request`;
            },
            patrollerRequestAccepted: (zone) => {
                return ` Park Zone ${zone} - Patrol Service Accepted`;
            },
            patrollerActivated: (zone) => {
                return ` Park Zone ${zone} - Patrol Service Activated`;
            },
            patrollerOptOut: (zone) => {
                return ` Park Zone ${zone} - Patroller Relationship Ended`;
            },
            patrollerRelationEnded: (zone) => {
                return ` Park Zone ${zone} - Patrol Services Disabled`;
            },
            adminAssignsPatroller: (zone, assignOrActivate) => {
                return ` Park Zone ${zone} - Admin ${assignOrActivate} Patrol Relationship`;
            },
            timeExpiryPatroller: (zone) => {
                return ` Park Zone ${zone} - Service Request Time Expiry`;
            }
        }
    },
    function: {
        signUpWelcomeMessageInSms: (name, accountType) =>{
            return `Hi ${name}, Thank you for joining  Park! Your ${accountType} account is successfully created. We promise not to be a bother, but please note that we do send text notifications of bookings & expirations for your convenience. Happy parking!`
            // return `Hi ${name}, Thank you for joining  Park! Your ${accountType} account is successfully created. We promise not to be a bother, but please note that we do send text notifications of bookings & expirations for your convenience. You can always manage these & other preferences in your profile settings. Happy parking!`
        },
        chargeableMessageForQBO: (perHourRate, totalMinutes, totalChargeableMinutes) =>{
            return `Listed Rate/Hr: $${perHourRate.toFixed(2)}; Total Parking Minutes: ${totalMinutes}; Chargeable Minutes: ${totalChargeableMinutes}`
        },
        minParkingChargeableMessageForQBO: (perHourRate, actualParkingFee, totalMinutes, totalChargeableMinutes) =>{
            return `Minimum $0.10 charged to customer; Parking Fee "$${actualParkingFee.toFixed(2)}" < $0.10 Minimum; Listed Rate/Hr: $${perHourRate.toFixed(2)}; Total Parking Minutes: ${totalMinutes}; Chargeable Minutes: ${totalChargeableMinutes}`
        },
        getEmailVerificationLink: (emailVerificationNumber, encryptedEmail) =>{
            return `${environment.web_url}verifyemail?jpn=${emailVerificationNumber}&verify=true&etl=${encryptedEmail}`;
        },
        unauthorizedAccess: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.unauthorized,
                message: constant.message.unauthorized,
                data: []
            });
        },
        invalidCredentials: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.invalidInputs,
                data: []
            });
        },
        userNotFound: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.userNotFound,
                data: []
            });
        },
        dataFound: (res) => {
            return res.status(constant.httpCode.success).json({
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: []
            });
        },
        dataNotFound: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
        },
        emailAlreadyExistFunction: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.emailAlreadyExist,
                data: []
            });
        },
        mobileNumberAlreadyExistFunction: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.mobileNumberAlreadyExist,
                data: []
            });
        },
        emailAndMobileNumberAlreadyExistFunction: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.badRequest,
                message: constant.message.emailAndMobileNumberAlreadyExist,
                data: []
            });
        },
        serverError: (res, err) => {
            console.log(err,'   server error');
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.internalServerError,
                message: constant.message.serverError,
                data: err
            });
        },
        validationError: (res, errorArray) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                statusCode: constant.httpCode.badRequest,
                message: constant.message.validationError,
                data: errorArray
            });
        },
        parkingLotNotFound: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.parkingLotNotFound,
                data: []
            });
        },
        generateActivationNumber: () => {
            return Math.floor(1000 + Math.random() * 9000); // Generates 4 digits number only
            // return Math.floor((Math.random() * 574119) + 54);
        },
        generateSixDigitNumber: () => {
            return Math.floor(100000 + Math.random() * 900000); // Generates 6 digits number only
        },
        generateShortId: () => {
            return shortid.generate().replace(/[-_]/g, parseInt(Math.random()*10));
        },
        getModulusRoundUp: (number) => {
            let regEx1 = new RegExp(/^\d{1}.?\d{3}$/);
            let regEx2 = new RegExp(/^\d{2}.?\d{3}$/);
            let regEx3 = new RegExp(/^\d{3}.?\d{3}$/);
            let regEx4 = new RegExp(/^\d{4}.?\d{3}$/);

            let result = Math.floor(number * 1000) / 1000 + '';
            if(regEx1.test(result) || regEx2.test(result) || regEx3.test(result) || regEx4.test(result)){
                // console.log(true);
                let testNum = Math.floor( parseFloat(result) * 100) / 100;
                return parseFloat(((testNum)+0.01).toFixed(2));
            }
            else{
                // console.log(false);
                return  parseFloat(((Math.floor(parseFloat(result) * 100)) / 100).toFixed(2));
            }
        },
        getModulusRoundDown: (number) => {
            return Math.floor( parseFloat( (number * 100).toFixed(2) ) ) / 100;
        },
        getArrayDifference: (a1, a2) => {
            let a = [], diff = [];
            for(let i=0;i<a1.length;i++){
                a[a1[i]] = true;
            }
            for(let i=0;i<a2.length;i++){
                if (a[a2[i]]){
                    delete a[a2[i]];
                }
                else{
                    a[a2[i]] = true;
                }
            }
            for(let k in a){
                diff.push(k);
            }
            return diff;
        },
        getAvailablePatrollerListForLog: (patrollers) => {
            let text = `Available patrollers\n`;
            patrollers.forEach(element => {
text = `${text} - ${element.patrollerId} ${element.companyName}\n`
            });
            return text;
        },
        getJiraIssueHeading: (location) => {
            let textToPrint = `Host Name: ${location.manager.firstName} ${location.manager.lastName}
Host Telephone: ${location.manager.countryCode} ${location.manager.mobileNumber}
Host email: ${location.manager.email}
Location Address: ${location.address}`;
            return textToPrint;
        },
        getJiraIssue: (id) => {
            let getJiraIssueUrl = {
                url: constant.jiraCredentials.createIssueUrl+`/${id}`,
                auth: constant.jiraCredentials.auth,
                method: 'GET',
                body: {},
                json: true
            };
            request( getJiraIssueUrl, (error, response, body) => {
                console.log(error, '    error of get issue in jira api');
                console.log(response.statusCode, '    response.statusCode of get issue in jira api');
                // console.log(response, '    response of get issue in jira api');
                console.log(body, '    body of get issue in jira api');
                // console.log(body.fields.description.content[0].content[0].text, '    body of get issue in jira api');
                if(response.statusCode == 200){
                    return body.fields.description.content[0].content[0].text;
                }
                else{
                    return '';
                }
            });
        },
        createCustomerInJira: (newUser) => {
            let createJiraCustomerJson = {
                url: constant.jiraCredentials.createCustomerUrl,
                auth: constant.jiraCredentials.auth,
                method: 'POST',
                body: {
                    displayName: newUser.email,
                    email: newUser.email
                },
                json: true
            };

            request( createJiraCustomerJson, (error, response, body) => {
                console.log(error, '    error of create customer in jira api');
                console.log(response.statusCode, '    response.statusCode of create customer in jira api');
                // console.log(response, '    response of create customer in jira api');
                // console.log(body, '    body of create customer in jira api');

                if(response.statusCode == 201){
                    newUser.update({ $set: { jiraCustomerAccountId: body.accountId, isCustomerCreatedOnJira: true } }, (reject, resolve) => {
                        if(resolve){
                            return;
                        }
                        else{
                            return;
                        }
                    });
                }
                else{
                    let getJiraUsersJson = constant.function.getCustomersFromJira();
                    request( getJiraUsersJson, (error, response, body) => {
                        console.log(error, '    error of get customers in jira api');
                        console.log(response.statusCode, '    response.statusCode of get customers in jira api');
                        // console.log(response, '    response of get customers in jira api');
                        // console.log(body, '    body of get customers in jira api');

                        if(response.statusCode == 200){
                            let flag = false;
                            for(let i=0;i<body.length;i++){
                                if(body[i].emailAddress == newUser.email){
                                    flag = true;
                                    newUser.update({ $set: { jiraCustomerAccountId: body[i].accountId, isCustomerCreatedOnJira: true } }, (reject, resolve) => {
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

                            if(!flag){
                                newUser.update({ $set: { jiraCustomerAccountId: '', isCustomerCreatedOnJira: false } }, (reject, resolve) => {
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
                            console.log('Error finding customers in jira');
                            newUser.update({ $set: { jiraCustomerAccountId: '', isCustomerCreatedOnJira: false } }, (reject, resolve) => {
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

            });  
        },
        getCustomersFromJira: () => {
            return {
                url: constant.jiraCredentials.getCustomersUrl,
                auth: constant.jiraCredentials.auth,
                method: 'GET',
                body: {},
                json: true
            }
        },
        createCustomerDataForQuickBooks: (newUser) => {
            return {
                FullyQualifiedName: newUser.firstName+' '+newUser.lastName,
                PrimaryEmailAddr: {
                    Address: newUser.email
                },
                DisplayName: newUser.userId,
                PreferredDeliveryMethod: 'None', // Its value is 'Print later' on QBO, check it
                Taxable: false,
                // Suffix: 'Br',
                // Title: 'Mr',
                // MiddleName: '',
                Notes: newUser.userId,
                FamilyName: newUser.lastName,
                PrimaryPhone: {
                    FreeFormNumber: newUser.countryCode+' '+newUser.mobileNumber
                },
                // CompanyName: 'test company name',
                // BillAddr: {
                //     CountrySubDivisionCode: 'CA',
                //     City: 'Mountain View test',
                //     PostalCode: '44444',
                //     Line1: '123@1122 Main Street',
                //     Country: 'USA'
                // },
                GivenName: newUser.firstName
            }
        },
        updateCustomerDataInQuickBooks: (updateUser, SyncToken) => {
            return {
                SyncToken: SyncToken,
                Id: updateUser.attachableId,
                sparse: true,

                // domain: 'QBO',
                PrimaryEmailAddr: {
                    Address: updateUser.email
                },
                // DisplayName: updateUser.userId,
                PreferredDeliveryMethod: 'None',
                GivenName: updateUser.firstName, // First name
                FullyQualifiedName: updateUser.firstName+' '+updateUser.lastName,
                // BillWithParent: false,
                // Job: false,
                // BalanceWithJobs: 85.0,
                PrimaryPhone: {
                    FreeFormNumber: updateUser.countryCode+' '+updateUser.mobileNumber
                },
                Active: true,
                // MetaData: {
                //     CreateTime: '2014-09-11T16:49:28-07:00',
                //     LastUpdatedTime: '2015-07-23T11:07:55-07:00'
                // },
                // BillAddr: {
                //     City: 'Half Moon Bay',
                //     Line1: '12 Ocean Dr.',
                //     PostalCode: '94213',
                //     Lat: '37.4307072',
                //     Long: '-122.4295234',
                //     CountrySubDivisionCode: 'CA'
                // },
                // MiddleName: 'Mac',
                Taxable: false,
                // Balance: 85.0,
                // CompanyName: 'test company name',
                FamilyName: updateUser.lastName, // Last name
                // PrintOnCheckName: 'print on check name'
            }
        },
        createVendorDataForQuickBooks: (newWNine, host) => {
            return {
                // domain: 'QBO',
                PrimaryEmailAddr: {
                    Address: host.email
                },
                DisplayName: newWNine.w9Id,
                // CurrencyRef: {
                //     name: 'United States Dollar',
                //     value: 'USD'
                // },
                GivenName: newWNine.w9individualSoleProprietorOrSingleMemberLlc ? newWNine.w9firstName : host.firstName, // First name
                // Title: 'Ms.',
                PrimaryPhone: {
                    FreeFormNumber: host.countryCode+' '+host.mobileNumber
                },
                Active: true,
                // MetaData: {
                //     CreateTime: '2015-07-28T12:51:21-07:00',
                //     LastUpdatedTime: '2015-07-28T12:51:21-07:00'
                // },
                Vendor1099: true,
                BillAddr: {
                    City: newWNine.w9city,
                    Country: 'U.S.A',
                    Line1: newWNine.w9address,
                    //   Line2: 'Dianne Bradley',
                    //   Line3: '29834 Mustang Ave.',
                    PostalCode: newWNine.w9zipcode,
                    CountrySubDivisionCode: constant.function.getStateAbbreviation(newWNine.w9state)
                },
                Mobile: {
                    FreeFormNumber: host.countryCode+' '+host.mobileNumber
                },
                // WebAddr: {
                //     URI: 'http://test.com'
                // },
                // Balance: 0,
                // SyncToken: '0',
                // Suffix: 'Sr.',
                CompanyName: newWNine.w9individualSoleProprietorOrSingleMemberLlc ? '' : newWNine.w9name, // Company name
                FamilyName: newWNine.w9individualSoleProprietorOrSingleMemberLlc ? newWNine.w9lastName : host.lastName, // Last name
                TaxIdentifier: newWNine.w9isSsnFilled ? constant.function.formatSsn(cryptr.decrypt(newWNine.w9socialSecurityNumber)) : constant.function.formatEin(cryptr.decrypt(newWNine.w9employerIdentificationNumber)),
                // AcctNum: newWNine.accountNumber,
                PrintOnCheckName: newWNine.accountNickName, // Account name
                sparse: false
            }
        },
        updateVendorDataInQuickBooks: (updateWNine, host, SyncToken) => {
            return {
                SyncToken: SyncToken,
                Id: updateWNine.attachableId,
                sparse: true,
                
                PrimaryEmailAddr: {
                    Address: host.email
                },
                Vendor1099: true,
                // domain: 'QBO',
                GivenName: updateWNine.w9individualSoleProprietorOrSingleMemberLlc ? updateWNine.w9firstName : host.firstName, // First name
                // DisplayName: updateWNine.w9Id, // W9 id
                BillAddr: {
                    City: updateWNine.w9city,
                    Country: 'U.S.A',
                    Line1: updateWNine.w9address,
                    PostalCode: updateWNine.w9zipcode,
                    // Lat: '37.445013',
                    // Long: '-122.1391443',
                    CountrySubDivisionCode: constant.function.getStateAbbreviation(updateWNine.w9state)
                },
                PrintOnCheckName: updateWNine.accountNickName, // Account name
                FamilyName: updateWNine.w9individualSoleProprietorOrSingleMemberLlc ? updateWNine.w9lastName : host.lastName, // Last name
                TaxIdentifier: updateWNine.w9isSsnFilled ? constant.function.formatSsn(cryptr.decrypt(updateWNine.w9socialSecurityNumber)) : constant.function.formatEin(cryptr.decrypt(updateWNine.w9employerIdentificationNumber)),
                PrimaryPhone: {
                    FreeFormNumber: host.countryCode+' '+host.mobileNumber
                },
                // AcctNum: updateWNine.accountNumber,
                CompanyName: updateWNine.w9individualSoleProprietorOrSingleMemberLlc ? '' : updateWNine.w9name, // Company name
                Mobile: {
                    FreeFormNumber: host.countryCode+' '+host.mobileNumber
                },
                // WebAddr: {
                //     URI: 'http://www.booksbybessie.com'
                // },
                Active: true,
                // Balance: 0,
                // MetaData: {
                //     CreateTime: '2014-09-12T10:07:56-07:00',
                //     LastUpdatedTime: '2015-07-28T13:34:38-07:00'
                // }
            }
        },
        createLocationDataForQuickBooks: (location) => {
            return {
                Name: constant.function.getStateAbbreviation(location.state)+':'+location.zone
            }
        },
        updateLocationDataInQuickBooks: (location, SyncToken) => {
            return {
                SyncToken: SyncToken,
                Id: location.attachableId,
                sparse: true,

                // FullyQualifiedName: 'Marketing Department',
                // domain: 'QBO',
                Name: location.zone,
                // SubClass: false,
                Active: true,
                // MetaData: {
                //     CreateTime: '2013-08-13T11:52:48-07:00',
                //     LastUpdatedTime: '2013-08-13T11:52:48-07:00'
                // }
            }
        },
        createSalesReceiptForParkingWithCreditCardPaymentInQuickBooks: (user, location, transaction) => {
            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: constant.intuitRef.creditCard_PaymentMethodRefName,
                    value: constant.intuitRef.creditCard_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    name: constant.intuitRef.undepositedFunds_DepositToAccountRefName,
                    value: constant.intuitRef.undepositedFunds_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                    // name: location.zone,
                    // value: location.attachableId
                },
                CustomerMemo: {
                    value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                },
                // Id: transaction.transactionId,
                DocNumber: transaction.transactionId,
                Line: [
                    {
                        Description: transaction.isMinParkingFeeCase ? constant.function.minParkingChargeableMessageForQBO(location.parkingFee, transaction.actualParkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes) : constant.function.chargeableMessageForQBO(location.parkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes),
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            Qty: transaction.isMinParkingFeeCase ? 1 : transaction.totalChargeableMinutes,
                            UnitPrice: transaction.isMinParkingFeeCase ? 0.10 : (location.parkingFee)/60,
                            ItemRef: {
                                name: constant.intuitRef.servicesParkingFee_ItemRefName,
                                value: constant.intuitRef.servicesParkingFee_ItemRefValue
                            },
                            ClassRef: {
                                name: location.zone,
                                value: location.attachableId
                            }
                        },
                        LineNum: 1,
                        Amount: transaction.userParkingFee
                    },
                    {
                        Description: '',
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            Qty: 1,
                            UnitPrice: constant.braintreeCredentials.fixedConvenienceFee,
                            ItemRef: {
                                name: constant.intuitRef.convenienceFee_ItemRefName,
                                value: constant.intuitRef.convenienceFee_ItemRefValue
                            },
                            ClassRef: {
                                name: location.zone,
                                value: location.attachableId
                            }
                        },
                        LineNum: 1,
                        Amount: constant.braintreeCredentials.fixedConvenienceFee
                    },
                    // {
                    //     Description: '',
                    //     DetailType: 'SalesItemLineDetail', // Sales type
                    //     SalesItemLineDetail: {
                    //         TaxCodeRef: {
                    //             value: 'NON' // Value must be TAX or NON
                    //         },
                    //         // Qty: 1,
                    //         // UnitPrice: constant.braintreeCredentials.fixedConvenienceFee,
                    //         ItemRef: {
                    //             name: constant.intuitRef.creditCardProcessingFixed_ItemRefName,
                    //             value: constant.intuitRef.creditCardProcessingFixed_ItemRefValue
                    //         },
                    //         ClassRef: {
                    //             name: location.zone,
                    //             value: location.attachableId
                    //         }
                    //     },
                    //     LineNum: 1,
                    //     Amount: -(constant.braintreeCredentials.fixedConvenienceFee)
                    // },
                    // {
                    //     Description: '',
                    //     DetailType: 'SalesItemLineDetail', // Sales type
                    //     SalesItemLineDetail: {
                    //         TaxCodeRef: {
                    //             value: 'NON' // Value must be TAX or NON
                    //         },
                    //         // Qty: 1,
                    //         // UnitPrice: constant.braintreeCredentials.fixedConvenienceFee,
                    //         ItemRef: {
                    //             name: constant.intuitRef.creditCardProcessingVariable_ItemRefName,
                    //             value: constant.intuitRef.creditCardProcessingVariable_ItemRefValue
                    //         },
                    //         ClassRef: {
                    //             name: location.zone,
                    //             value: location.attachableId
                    //         }
                    //     },
                    //     LineNum: 1,
                    //     Amount: -(transaction.creditCardFee)
                    // }
                ]
            }
        },
        createSalesReceiptForParkingWithWalletPaymentInQuickBooks: (user, location, transaction) => {
            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: constant.intuitRef.wallet_PaymentMethodRefName,
                    value: constant.intuitRef.wallet_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    name: constant.intuitRef.walletClearingAccount_DepositToAccountRefName,
                    value: constant.intuitRef.walletClearingAccount_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                    // name: location.zone,
                    // value: location.attachableId
                },
                CustomerMemo: {
                    value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                },
                // Id: transaction.transactionId,
                DocNumber: transaction.transactionId,
                Line: [
                    {
                        Description: transaction.isMinParkingFeeCase ? constant.function.minParkingChargeableMessageForQBO(location.parkingFee, transaction.actualParkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes) : constant.function.chargeableMessageForQBO(location.parkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes),
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            // Qty: transaction.totalMinutes,
                            Qty: transaction.isMinParkingFeeCase ? 1 : transaction.totalChargeableMinutes, // 43
                            UnitPrice: transaction.isMinParkingFeeCase ? 0.10 : (location.parkingFee)/60, // 0.166666667
                            ItemRef: {
                                name: constant.intuitRef.servicesParkingFee_ItemRefName,
                                value: constant.intuitRef.servicesParkingFee_ItemRefValue
                            },
                            ClassRef: {
                                name: location.zone,
                                value: location.attachableId
                            }
                        },
                        LineNum: 1,
                        Amount: transaction.userParkingFee // 7.71
                    },
                    {
                        Description: '',
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            Qty: 1,
                            UnitPrice: constant.braintreeCredentials.fixedConvenienceFee,
                            ItemRef: {
                                name: constant.intuitRef.convenienceFee_ItemRefName,
                                value: constant.intuitRef.convenienceFee_ItemRefValue
                            },
                            ClassRef: {
                                name: location.zone,
                                value: location.attachableId
                            }
                        },
                        LineNum: 1,
                        Amount: constant.braintreeCredentials.fixedConvenienceFee
                    },
                    // {
                    //     Description: '',
                    //     DetailType: 'SalesItemLineDetail', // Sales type
                    //     SalesItemLineDetail: {
                    //         TaxCodeRef: {
                    //             value: 'NON' // Value must be TAX or NON
                    //         },
                    //         // Qty: 1,
                    //         UnitPrice: transaction.parkingTaxes,
                    //         ItemRef: {
                    //             name: constant.intuitRef.otherSalesTax_ItemRefName,
                    //             value: constant.intuitRef.otherSalesTax_ItemRefValue
                    //         },
                    //         ClassRef: {
                    //             name: location.zone,
                    //             value: location.attachableId
                    //         }
                    //     },
                    //     LineNum: 1,
                    //     Amount: transaction.parkingTaxes
                    // },
                    {
                        Description: '',
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            ItemRef: {
                                name: constant.intuitRef.walletFunds_ItemRefName,
                                value: constant.intuitRef.walletFunds_ItemRefValue
                            },
                            ClassRef: {
                                name: constant.intuitRef.default_ClassRefName,
                                value: constant.intuitRef.default_ClassRefValue
                            }
                        },
                        LineNum: 1,
                        Amount: -(transaction.amount)
                    }
                ]
            }
        },
        createSalesReceiptForWalletLoadInQuickBooks: (user, walletLoad) => {
            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: constant.intuitRef.creditCard_PaymentMethodRefName,
                    value: constant.intuitRef.creditCard_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    name: constant.intuitRef.undepositedFunds_DepositToAccountRefName,
                    value: constant.intuitRef.undepositedFunds_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                },
                CustomerMemo: {
                    value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                },
                // Id: walletLoad.transactionId,
                DocNumber: walletLoad.transactionId,
                Line: [
                    {
                        Description: '',
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            // Qty: 1,
                            UnitPrice: walletLoad.amountCredited,
                            ItemRef: {
                                name: constant.intuitRef.walletFunds_ItemRefName,
                                value: constant.intuitRef.walletFunds_ItemRefValue
                            },
                            ClassRef: {
                                name: constant.intuitRef.default_ClassRefName,
                                value: constant.intuitRef.default_ClassRefValue
                            }
                        },
                        LineNum: 1,
                        Amount: walletLoad.amountCredited
                    },
                    // {
                    //     Description: '',
                    //     DetailType: 'SalesItemLineDetail', // Sales type
                    //     SalesItemLineDetail: {
                    //         TaxCodeRef: {
                    //             value: 'NON' // Value must be TAX or NON
                    //         },
                    //         ItemRef: {
                    //             name: constant.intuitRef.creditCardProcessingFixed_ItemRefName,
                    //             value: constant.intuitRef.creditCardProcessingFixed_ItemRefValue
                    //         },
                    //         ClassRef: {
                    //             name: constant.intuitRef.default_ClassRefName,
                    //             value: constant.intuitRef.default_ClassRefValue
                    //         }
                    //     },
                    //     LineNum: 1,
                    //     Amount: -(constant.braintreeCredentials.fixedConvenienceFee)
                    // },
                    // {
                    //     Description: '',
                    //     DetailType: 'SalesItemLineDetail', // Sales type
                    //     SalesItemLineDetail: {
                    //         TaxCodeRef: {
                    //             value: 'NON' // Value must be TAX or NON
                    //         },
                    //         ItemRef: {
                    //             name: constant.intuitRef.creditCardProcessingVariable_ItemRefName,
                    //             value: constant.intuitRef.creditCardProcessingVariable_ItemRefValue
                    //         },
                    //         ClassRef: {
                    //             name: constant.intuitRef.default_ClassRefName,
                    //             value: constant.intuitRef.default_ClassRefValue
                    //         }
                    //     },
                    //     LineNum: 1,
                    //     Amount: -(walletLoad.creditCardFee)
                    // }
                ]
            }
        },
        createDepositInQuickBooks: (disbursementId, creditCardFundsHoldingAccount, linkedTxnArray, creditCardProcessingFixed, creditCardProcessingVariable, ccFixedDescription, ccVariableDescription) => {
            // ******Creating One Deposit for All Transactions in Disbursement******
            return {
                DepositToAccountRef: {
                    name: constant.intuitRef.pcbOperating_DepositToAccountRefName,
                    value: constant.intuitRef.pcbOperating_DepositToAccountRefValue
                },
                TotalAmt: creditCardFundsHoldingAccount,
                // domain: 'QBO',
                sparse: false,
                // CurrencyRef: {
                //     value: 'USD',
                //     name: 'United States Dollar'
                // },
                // DocNumber: '4f4f4f',
                PrivateNote: disbursementId,
                Line: [
                    {
                        Amount: creditCardFundsHoldingAccount,
                        LinkedTxn: linkedTxnArray,
                        DepositLineDetail: {
                            AccountRef: {
                                name: constant.intuitRef.undepositedFunds_DepositToAccountRefName,
                                value: constant.intuitRef.undepositedFunds_DepositToAccountRefValue
                            }
                        }
                    },
                    {
                        DetailType: 'DepositLineDetail',
                        Amount: -(creditCardProcessingFixed),
                        DepositLineDetail: {
                            AccountRef: {
                                name: constant.intuitRef.creditCardProcessingFixed_DepositToAccountRefName,
                                value: constant.intuitRef.creditCardProcessingFixed_DepositToAccountRefValue
                            },
                            Entity: {
                                name: constant.intuitRef.braintree_VendorRefName,
                                value: constant.intuitRef.braintree_VendorRefValue
                            }
                        },
                        Description: ccFixedDescription
                    },
                    {
                        DetailType: 'DepositLineDetail',
                        Amount: -(creditCardProcessingVariable),
                        DepositLineDetail: {
                            AccountRef: {
                                name: constant.intuitRef.creditCardProcessingVariable_DepositToAccountRefName,
                                value: constant.intuitRef.creditCardProcessingVariable_DepositToAccountRefValue
                            },
                            Entity: {
                                name: constant.intuitRef.braintree_VendorRefName,
                                value: constant.intuitRef.braintree_VendorRefValue
                            }
                        },
                        Description: ccVariableDescription
                    }
                ],
                TxnTaxDetail: {}
            }
        },
        createVendorBillInQuickBooks: (vendorId, vendorAttachableId, location, transaction) => {
            return {
                VendorRef: {
                    // name: 'ScRTQRx7r',
                    // value: '109'
                    name: vendorId,
                    value: vendorAttachableId
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                },
                SalesTermRef: {
                    name: constant.intuitRef.net30_SalesTermRefName,
                    value: constant.intuitRef.net30_SalesTermRefValue
                },
                // Id: transaction.transactionId,
                DocNumber: transaction.transactionId,
                Line: [
                    {
                        DetailType: 'ItemBasedExpenseLineDetail',
                        Amount: transaction.earningToLot,
                        ItemBasedExpenseLineDetail: {
                            Qty: transaction.isMinParkingFeeCase ? 1 : transaction.totalChargeableMinutes, // 43
                            // UnitPrice: transaction.isMinParkingFeeCase ? 0.10 : (location.parkingFee)/60, // 0.166666667
                            UnitPrice: transaction.isMinParkingFeeCase? 0.075 : transaction.earningToLot / transaction.totalChargeableMinutes,
                            ItemRef: {
                                name: constant.intuitRef.servicesParkingFee_ItemRefName,
                                value: constant.intuitRef.servicesParkingFee_ItemRefValue
                            },
                            ClassRef: {
                                name: location.zone,
                                value: location.attachableId
                            }
                        },
                        Description: transaction.isMinParkingFeeCase ? constant.function.minParkingChargeableMessageForQBO(location.parkingFee, transaction.actualParkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes) : constant.function.chargeableMessageForQBO(location.parkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes),
                    }
                ]


                // Line: [
                //     {
                //         DetailType: 'AccountBasedExpenseLineDetail',
                //         Amount: transaction.earningToLot,
                //         AccountBasedExpenseLineDetail: {
                //             AccountRef: {
                //                 name: constant.intuitRef.lotProfitSplitParking_AccountRefName,
                //                 value: constant.intuitRef.lotProfitSplitParking_AccountRefValue
                //             },
                //             ClassRef: {
                //                 name: location.zone,
                //                 value: location.attachableId
                //             }
                //         },
                //         Description: constant.function.chargeableMessageForQBO(location.parkingFee, transaction.totalMinutes, transaction.totalChargeableMinutes),
                //     }
                // ]
            }
        },
        createRefundReceiptForParkingTransaction: (user, refundedTransaction, newTransaction) => {
            let lineItemsArray = [
                {
                    Description: `Refunded transaction: ${refundedTransaction.transactionId}; Listed Rate/Hr: $${refundedTransaction.lotRate.toFixed(2)}; Total Parking Minutes: ${refundedTransaction.totalMinutes}; Chargeable Minutes: ${refundedTransaction.totalChargeableMinutes}`,
                    DetailType: 'SalesItemLineDetail', // Sales type
                    SalesItemLineDetail: {
                        TaxCodeRef: {
                            value: 'NON' // Value must be TAX or NON
                        },
                        Qty: refundedTransaction.totalChargeableMinutes,
                        UnitPrice: refundedTransaction.isMinParkingFeeCase ? 0.10 : (refundedTransaction.lotRate)/60,
                        ItemRef: {
                            name: constant.intuitRef.servicesParkingFee_ItemRefName,
                            value: constant.intuitRef.servicesParkingFee_ItemRefValue
                        },
                        ClassRef: {
                            name: refundedTransaction.zone,
                            value: refundedTransaction.zoneAttachableId
                        }
                    },
                    LineNum: 1,
                    Amount: refundedTransaction.userParkingFee
                },
                {
                    Description: '',
                    DetailType: 'SalesItemLineDetail', // Sales type
                    SalesItemLineDetail: {
                        TaxCodeRef: {
                            value: 'NON' // Value must be TAX or NON
                        },
                        Qty: 1,
                        UnitPrice: constant.braintreeCredentials.fixedConvenienceFee,
                        ItemRef: {
                            name: constant.intuitRef.convenienceFee_ItemRefName,
                            value: constant.intuitRef.convenienceFee_ItemRefValue
                        },
                        ClassRef: {
                            name: refundedTransaction.zone,
                            value: refundedTransaction.zoneAttachableId
                        }
                    },
                    LineNum: 1,
                    Amount: constant.braintreeCredentials.fixedConvenienceFee
                },
                {
                    Description: '',
                    DetailType: 'SalesItemLineDetail', // Sales type
                    SalesItemLineDetail: {
                        TaxCodeRef: {
                            value: 'NON' // Value must be TAX or NON
                        },
                        // Qty: 1,
                        UnitPrice: refundedTransaction.parkingTaxes,
                        ItemRef: {
                            name: constant.intuitRef.otherSalesTax_ItemRefName,
                            value: constant.intuitRef.otherSalesTax_ItemRefValue
                        },
                        ClassRef: {
                            name: refundedTransaction.zone,
                            value: refundedTransaction.zoneAttachableId
                        }
                    },
                    LineNum: 1,
                    Amount: refundedTransaction.parkingTaxes
                }
            ];

            // Payment done from Wallet
            if(refundedTransaction.isPaymentDoneFromWallet){
                lineItemsArray.push(
                    {
                        Description: '',
                        DetailType: 'SalesItemLineDetail', // Sales type
                        SalesItemLineDetail: {
                            TaxCodeRef: {
                                value: 'NON' // Value must be TAX or NON
                            },
                            // Qty: 1,
                            UnitPrice: -(refundedTransaction.amount),
                            ItemRef: {
                                name: constant.intuitRef.walletFunds_ItemRefName,
                                value: constant.intuitRef.walletFunds_ItemRefValue
                            },
                            ClassRef: {
                                name: constant.intuitRef.default_ClassRefName,
                                value: constant.intuitRef.default_ClassRefValue
                            }
                        },
                        LineNum: 1,
                        Amount: -(refundedTransaction.amount)
                    }
                )
            }

            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.wallet_PaymentMethodRefName : constant.intuitRef.creditCard_PaymentMethodRefName,
                    value: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.wallet_PaymentMethodRefValue : constant.intuitRef.creditCard_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    // name: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.walletClearingAccount_DepositToAccountRefName : constant.intuitRef.pcbOperating_DepositToAccountRefName,
                    // value: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.walletClearingAccount_DepositToAccountRefValue : constant.intuitRef.pcbOperating_DepositToAccountRefValue
                    name: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.walletClearingAccount_DepositToAccountRefName : constant.intuitRef.undepositedFunds_DepositToAccountRefName,
                    value: refundedTransaction.isPaymentDoneFromWallet ? constant.intuitRef.walletClearingAccount_DepositToAccountRefValue : constant.intuitRef.undepositedFunds_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                },
                // CustomerMemo: {
                //     value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                // },
                // Id: refundedTransaction.transactionId,
                // DocNumber: refundedTransaction.transactionId,
                DocNumber: newTransaction.transactionId,
                Line: lineItemsArray
            }
        },
        createVendorCreditForParkingTransaction: (refundedTransaction, newTransaction) => {
            return {
                // TotalAmt: refundedTransaction.earningToLot,
                // TxnDate: '2014-12-23',
                // APAccountRef: {
                //     name: 'Accounts Payable (A/P)',
                //     value: '33'
                // },
                VendorRef: {
                    name: refundedTransaction.associatedVendorId,
                    value: refundedTransaction.associatedVendorAttachableId
                },
                DepartmentRef: {
                    name: constant.intuitRef.parking_DepartmentRefName,
                    value: constant.intuitRef.parking_DepartmentRefValue
                },
                // DocNumber: refundedTransaction.transactionId,
                DocNumber: newTransaction.transactionId,
                Line: [
                    {
                        DetailType: 'ItemBasedExpenseLineDetail', // Sales type
                        Amount: refundedTransaction.earningToLot,
                        ItemBasedExpenseLineDetail: {
                            Qty: refundedTransaction.totalChargeableMinutes,
                            UnitPrice: refundedTransaction.isMinParkingFeeCase? 0.075 : refundedTransaction.earningToLot / refundedTransaction.totalChargeableMinutes,
                            ItemRef: {
                                name: constant.intuitRef.servicesParkingFee_ItemRefName,
                                value: constant.intuitRef.servicesParkingFee_ItemRefValue
                            },
                            ClassRef: {
                                name: refundedTransaction.zone,
                                value: refundedTransaction.zoneAttachableId
                            }
                        },
                        Description: `Refunded transaction: ${refundedTransaction.transactionId}; Listed Rate/Hr: $${refundedTransaction.lotRate.toFixed(2)}; Total Parking Minutes: ${refundedTransaction.totalMinutes}; Chargeable Minutes: ${refundedTransaction.totalChargeableMinutes}`
                    }
                ],
            }
        },
        createRefundReceiptForSnipcartOrder: (user, refundedTransaction, newTransaction) => {
            let newItemsArrayForQBO = [];
            refundedTransaction.customizedItems.forEach(element => {
                let oneItemForQbo = {
                    Description: element.name,
                    DetailType: 'SalesItemLineDetail', // Sales type
                    SalesItemLineDetail: {
                        TaxCodeRef: {
                            value: 'NON' // Value must be TAX or NON
                        },
                        Qty: element.quantity,
                        UnitPrice: element.unitPrice,
                        ItemRef: {
                            name: constant.intuitRef[`SP`+`${element.id}`+`_ItemRefName`],
                            value: constant.intuitRef[`SP`+`${element.id}`+`_ItemRefValue`]
                        },
                        // ClassRef: {
                        //     name: constant.intuitRef.default_ClassRefName,
                        //     value: constant.intuitRef.default_ClassRefValue
                        // }
                    },
                    LineNum: 1,
                    Amount: element.totalPrice
                };
                newItemsArrayForQBO.push(oneItemForQbo);
            });
            newItemsArrayForQBO.push(
                {
                    Description: `Refunded transaction: ${refundedTransaction.transactionId};`,
                    DetailType: 'SalesItemLineDetail', // Sales type
                    SalesItemLineDetail: {
                        TaxCodeRef: {
                            value: 'NON' // Value must be TAX or NON
                        },
                        // Qty: 1,
                        UnitPrice: refundedTransaction.taxesTotal,
                        ItemRef: {
                            name: constant.intuitRef.otherSalesTax_ItemRefName,
                            value: constant.intuitRef.otherSalesTax_ItemRefValue
                        },
                        // ClassRef: {
                        //     name: refundedTransaction.zone,
                        //     value: refundedTransaction.zoneAttachableId
                        // }
                    },
                    LineNum: 1,
                    Amount: refundedTransaction.taxesTotal
                }
            );
            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: constant.intuitRef.creditCard_PaymentMethodRefName,
                    value: constant.intuitRef.creditCard_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    name: constant.intuitRef.pcbOperating_DepositToAccountRefName,
                    value: constant.intuitRef.pcbOperating_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                // CustomerMemo: {
                //     value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                // },
                // Id: refundedTransaction.transactionId,
                // DocNumber: refundedTransaction.transactionId,
                DocNumber: newTransaction.transactionId,
                Line: newItemsArrayForQBO
            }
        },
        createVendorCreditForSnipcartOrder: (refundedTransaction, newTransaction) => {
            let amount = (refundedTransaction.total*0.02).toFixed(2);
            return {
                // TotalAmt: refundedTransaction.earningToLot,
                // TxnDate: '2014-12-23',
                // APAccountRef: {
                //     name: 'Accounts Payable (A/P)',
                //     value: '33'
                // },
                VendorRef: {
                    name: constant.intuitRef.snipcart_VendorRefName,
                    value: constant.intuitRef.snipcart_VendorRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                // DocNumber: refundedTransaction.transactionId,
                DocNumber: newTransaction.transactionId,
                Line: [
                    {
                        DetailType: 'ItemBasedExpenseLineDetail', // Sales type
                        Amount: amount,
                        ItemBasedExpenseLineDetail: {
                            Qty: '',
                            UnitPrice: amount,
                            ItemRef: {
                                name: constant.intuitRef.otherECommerceVariable_ItemRefName,
                                value: constant.intuitRef.otherECommerceVariable_ItemRefValue
                            },
                            // ClassRef: {
                            //     name: refundedTransaction.zone,
                            //     value: refundedTransaction.zoneAttachableId
                            // }
                        },
                        Description: `Refunded transaction: ${refundedTransaction.transactionId}; Taxable Subtotal $${(refundedTransaction.total).toFixed(2)} * 0.02 = $${amount}`
                    }
                ],
            }
        },
        createSalesReceiptForSnipcartOrder: (user, cart, newItemsArrayForQBO) => {
            return {
                CustomerRef: {
                    name: user.userId,
                    value: user.attachableId
                },
                PaymentMethodRef: {
                    name: constant.intuitRef.creditCard_PaymentMethodRefName,
                    value: constant.intuitRef.creditCard_PaymentMethodRefValue
                },
                DepositToAccountRef: {
                    name: constant.intuitRef.undepositedFunds_DepositToAccountRefName,
                    value: constant.intuitRef.undepositedFunds_DepositToAccountRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                CustomerMemo: {
                    value: 'Thank you for your business and have a great day!' // Message displayed on sales receipt
                },
                // Id: cart.invoiceNumber,
                DocNumber: cart.invoiceNumber,
                Line: newItemsArrayForQBO
            }
        },
        createBillForSnipcartOrder: (cart) => {
            let amount = (cart.total*0.02).toFixed(2);
            return {
                VendorRef: {
                    name: constant.intuitRef.snipcart_VendorRefName,
                    value: constant.intuitRef.snipcart_VendorRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                SalesTermRef: {
                    name: constant.intuitRef.net30_SalesTermRefName,
                    value: constant.intuitRef.net30_SalesTermRefValue
                },
                // Id: cart.invoiceNumber,
                DocNumber: cart.invoiceNumber,
                Line: [
                    {
                        DetailType: 'ItemBasedExpenseLineDetail',
                        Amount: amount,
                        ItemBasedExpenseLineDetail: {
                            Qty: '',
                            UnitPrice: amount,
                            ItemRef: {
                                name: constant.intuitRef.otherECommerceVariable_ItemRefName,
                                value: constant.intuitRef.otherECommerceVariable_ItemRefValue
                            },
                            // ClassRef: {
                            //     name: location.zone,
                            //     value: location.attachableId
                            // }
                        },
                        Description: `Taxable Subtotal $${(cart.total).toFixed(2)} * 0.02 = $${amount}`
                    }
                ]
            }
        },
        createPurchaseOrderForBuildASign: (cart) => {
            let newItemsArrayForQBO = [];
            cart.items.forEach(element => {
                let oneItemForQbo = {
                    DetailType: 'ItemBasedExpenseLineDetail',
                    Amount: element.quantity * 10.00,
                    // Id: '1',
                    ItemBasedExpenseLineDetail: {
                        ItemRef: {
                            name: constant.intuitRef[`SP`+`${element.id}`+`_ItemRefName`],
                            value: constant.intuitRef[`SP`+`${element.id}`+`_ItemRefValue`]
                        },
                        // CustomerRef: {
                        //     name: 'Cool Cars',
                        //     value: '3'
                        // },
                        Qty: element.quantity,
                        // TaxCodeRef: {
                        //     value: 'NON'
                        // },
                        // BillableStatus: 'NotBillable',
                        UnitPrice: 10.00,

                    }
                };
                newItemsArrayForQBO.push(oneItemForQbo);
            });
            return {
                VendorRef: {
                    name: constant.intuitRef.buildASign_VendorRefName,
                    value: constant.intuitRef.buildASign_VendorRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                // EmailStatus: 'NotSet',
                DocNumber: cart.invoiceNumber,
                // ShipAddr: {
                //     Line4: 'Half Moon Bay, CA  94213',
                //     Line3: '65 Ocean Dr.',
                //     Id: '121',
                //     Line1: 'Grace Pariente',
                //     Line2: 'Cool Cars'
                // },

                // TxnDate: '2015-07-28',
                TotalAmt: newItemsArrayForQBO.length * 10.00,
                Line: newItemsArrayForQBO,
            }
        },
        createBillForTaxCloud: (cart) => {
            // let amount = (cart.total*0.125);
            let amount = ((cart.total/100)*0.125);
            return {
                VendorRef: {
                    name: constant.intuitRef.taxCloud_VendorRefName,
                    value: constant.intuitRef.taxCloud_VendorRefValue
                },
                DepartmentRef: {
                    name: constant.intuitRef.products_DepartmentRefName,
                    value: constant.intuitRef.products_DepartmentRefValue
                },
                // SalesTermRef: {
                //     name: constant.intuitRef.net30_SalesTermRefName,
                //     value: constant.intuitRef.net30_SalesTermRefValue
                // },
                // Id: cart.invoiceNumber,
                DocNumber: cart.invoiceNumber,
                Line: [
                    {
                        DetailType: 'ItemBasedExpenseLineDetail',
                        Amount: amount,
                        ItemBasedExpenseLineDetail: {
                            Qty: '1',
                            UnitPrice: amount,
                            ItemRef: {
                                name: constant.intuitRef.otherSalesTaxPreparationVariable_ItemRefName,
                                value: constant.intuitRef.otherSalesTaxPreparationVariable_ItemRefValue
                            },
                            // ClassRef: {
                            //     name: location.zone,
                            //     value: location.attachableId
                            // }
                        },
                        Description: `Non-member State Sales Tax Preparation Fee: ${cart.shippingAddress.province}; 0.125% * $${cart.total} = $${amount}`
                    }
                ]
            }
        },
        createRequestForJiraIssue: (summary, textToPrint, issuetype) => {
            let requestForJiraIssue = {
                fields: {
                    project: {
                        key: issuetype == '1' ? constant.jiraCredentials.customerSupport_projectKey : constant.jiraCredentials.productDevelopment_projectKey
                    },
                    summary: summary,
                    description: {
                        type: 'doc',
                        version: 1,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: textToPrint
                                    }
                                ]
                            }
                        ]
                    },
                    customfield_10021: [
                        {
                            value: 'Impediment'
                        }
                    ],
                    issuetype: {
                        name: issuetype == '1' ? constant.jiraCredentials.productOrder_issuetypeName : 'Bug'
                    }
                }
            };

            if(issuetype == '1'){
                delete requestForJiraIssue.fields.customfield_10021;
            }

            console.log(requestForJiraIssue, '   requestForJiraIssue');
            return {
                url: constant.jiraCredentials.createIssueUrl,
                auth: constant.jiraCredentials.auth,
                method: 'POST',
                body: requestForJiraIssue,
                json: true
            }
        },
        createPatrollerRequestForJiraIssue: (summary, textToPrint, manager) => {
            let requestForJiraIssue = {
                fields: {
                    project: {
                        key: constant.jiraCredentials.opsWorkFlowPatrol
                    },
                    summary: summary,
                    description: {
                        type: 'doc',
                        version: 1,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: textToPrint
                                    }
                                ]
                            }
                        ]
                    },
                    // customfield_10021: [
                    //     {
                    //         value: 'Impediment'
                    //     }
                    // ],
                    issuetype: {
                        name: 'Task'
                    },
                    reporter: {
                        id: constant.jiraCredentials.supportUserId
                    },
                },
                // transition: {
                //     id: '11'
                // }
            };

            // if(!manager.isCustomerCreatedOnJira){
            //     delete requestForJiraIssue.fields.reporter;
            // }

            console.log(requestForJiraIssue, '   patrollerRequestForJiraIssue');
            return {
                url: constant.jiraCredentials.createIssueUrl,
                auth: constant.jiraCredentials.auth,
                method: 'POST',
                body: requestForJiraIssue,
                json: true
            }
        },
        updatePatrollerRequestForJiraIssue: (issueKey, textToPrint) => {
            let requestForJiraIssue = {
                fields: {
                    project: {
                        key: constant.jiraCredentials.opsWorkFlowPatrol
                    },
                    // summary: summary,
                    description: {
                        type: 'doc',
                        version: 1,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: textToPrint
                                    }
                                ]
                            }
                        ]
                    },
                }
            };

            return {
                url: constant.jiraCredentials.createIssueUrl+`/${issueKey}`,
                auth: constant.jiraCredentials.auth,
                method: 'PUT',
                body: requestForJiraIssue,
                json: true
            }
        },
        updatePatrollerTransition: (issueKey, transitionId) => {
            let transitionForJiraIssue = {
                url: constant.jiraCredentials.createIssueUrl+`/${issueKey}/transitions`,
                // url: 'https://simplepark.atlassian.net/rest/api/3/issue/OWP-7/transitions',
                auth: constant.jiraCredentials.auth,
                method: 'POST',
                body: {
                    transition: {
                        id: transitionId
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

            // return {
            //     url: constant.jiraCredentials.createIssueUrl+`/${issueKey}/transitions`,
            //     auth: constant.jiraCredentials.auth,
            //     method: 'POST',
            //     body: transitionForJiraIssue,
            //     json: true
            // }
        },
        addCommentToJiraIssue: (issueKey, textToPrint) =>{
            let bodyData = {
                // visibility: {
                //     type: "role",
                //     value: constant.jiraCredentials.supportUserId
                // },
                body: {
                    type: "doc",
                    version: 1,
                    content: [{
                        type: "paragraph",
                        content: [
                            {
                                text: textToPrint,
                                type: "text"
                            }
                        ]
                    }]
                }
            };

            let addCommentJson = {
                url: constant.jiraCredentials.createIssueUrl+`/${issueKey}/comment`,
                auth: constant.jiraCredentials.supportAuth,
                method: 'POST',
                body: bodyData,
                json: true
            };

            return addCommentJson;

            // request( addCommentJson, (error, response, body) => {
            //     console.log(error, '    error of addCommentJson');
            //     console.log(response.statusCode, '    response.statusCode of addCommentJson');
            //     // console.log(response, '    response of addCommentJson');
            //     console.log(body, '    body of addCommentJson');
            // });
        },
        getQuickBooksTokenFromDatabase: (getToken) => {
            return new QuickBooks(
                constant.intuitCredentials.clientId,
                constant.intuitCredentials.clientSecret,
                getToken.access_token,
                false, // no token secret for oAuth 2.0
                constant.intuitCredentials.companyId, // RealmId, ie company id
                false, // use the sandbox? - true for sandbox
                true, // enable debugging?
                null, // set minorversion, or null for the latest version
                '2.0', //oAuth version
                getToken.refresh_token
            );
        },
        getStateAbbreviation: (stateName) => {
            for(let i=0;i<constant.UsStates.length;i++){
                if(constant.UsStates[i].name == stateName){
                    return constant.UsStates[i].abbreviation;
                }
            }
        },
        formatSsn: (number) => {
            let m = '';
            for(let i=0;i<9;i++){
                if(i==3){
                    m=m+'-';
                }
                if(i==5){
                    m=m+'-'+number[i];
                }
                else{
                    m=m+number[i];
                }
            }
            return m;
        },
        formatEin: (number) => {
            let m = '';
            for(let i=0;i<9;i++){
                if(i==2){
                    m=m+'-'+number[i];
                }
                else{
                    m=m+number[i];
                }
            }
            return m;
        },
        formatMobileNumber: (number) => {
            let m = '(';
            for(let i=0;i<10;i++){
                if(i==3){
                    m=m+') ';
                }
                else if(i==6){
                    m=m+'-'+number[i];
                }
                else{
                    m=m+number[i];
                }
            }
            return m;
        }
    },
    customTimeVariables: [
        'chargeTimeStartSunday',
        'chargeTimeEndSunday',
        'freeTimeStartSunday',
        'freeTimeEndSunday',
        'freeTimeStartSundaySecond',
        'freeTimeEndSundaySecond',

        'chargeTimeStartMonday',
        'chargeTimeEndMonday',
        'freeTimeStartMonday',
        'freeTimeEndMonday',
        'freeTimeStartMondaySecond',
        'freeTimeEndMondaySecond',

        'chargeTimeStartTuesday',
        'chargeTimeEndTuesday',
        'freeTimeStartTuesday',
        'freeTimeEndTuesday',
        'freeTimeStartTuesdaySecond',
        'freeTimeEndTuesdaySecond',

        'chargeTimeStartWednesday',
        'chargeTimeEndWednesday',
        'freeTimeStartWednesday',
        'freeTimeEndWednesday',
        'freeTimeStartWednesdaySecond',
        'freeTimeEndWednesdaySecond',

        'chargeTimeStartThursday',
        'chargeTimeEndThursday',
        'freeTimeStartThursday',
        'freeTimeEndThursday',
        'freeTimeStartThursdaySecond',
        'freeTimeEndThursdaySecond',

        'chargeTimeStartFriday',
        'chargeTimeEndFriday',
        'freeTimeStartFriday',
        'freeTimeEndFriday',
        'freeTimeStartFridaySecond',
        'freeTimeEndFridaySecond',

        'chargeTimeStartSaturday',
        'chargeTimeEndSaturday',
        'freeTimeStartSaturday',
        'freeTimeEndSaturday',
        'freeTimeStartSaturdaySecond',
        'freeTimeEndSaturdaySecond'
    ],
    UsStates: [
        {
            name: 'Alabama',
            abbreviation: 'AL'
        },
        {
            name: 'Alaska',
            abbreviation: 'AK'
        },
        {
            name: 'American Samoa',
            abbreviation: 'AS'
        },
        {
            name: 'Arizona',
            abbreviation: 'AZ'
        },
        {
            name: 'Arkansas',
            abbreviation: 'AR'
        },
        {
            name: 'California',
            abbreviation: 'CA'
        },
        {
            name: 'Colorado',
            abbreviation: 'CO'
        },
        {
            name: 'Connecticut',
            abbreviation: 'CT'
        },
        {
            name: 'Delaware',
            abbreviation: 'DE'
        },
        {
            name: 'District Of Columbia',
            abbreviation: 'DC'
        },
        {
            name: 'Federated States Of Micronesia',
            abbreviation: 'FM'
        },
        {
            name: 'Florida',
            abbreviation: 'FL'
        },
        {
            name: 'Georgia',
            abbreviation: 'GA'
        },
        {
            name: 'Guam',
            abbreviation: 'GU'
        },
        {
            name: 'Hawaii',
            abbreviation: 'HI'
        },
        {
            name: 'Idaho',
            abbreviation: 'ID'
        },
        {
            name: 'Illinois',
            abbreviation: 'IL'
        },
        {
            name: 'Indiana',
            abbreviation: 'IN'
        },
        {
            name: 'Iowa',
            abbreviation: 'IA'
        },
        {
            name: 'Kansas',
            abbreviation: 'KS'
        },
        {
            name: 'Kentucky',
            abbreviation: 'KY'
        },
        {
            name: 'Louisiana',
            abbreviation: 'LA'
        },
        {
            name: 'Maine',
            abbreviation: 'ME'
        },
        {
            name: 'Marshall Islands',
            abbreviation: 'MH'
        },
        {
            name: 'Maryland',
            abbreviation: 'MD'
        },
        {
            name: 'Massachusetts',
            abbreviation: 'MA'
        },
        {
            name: 'Michigan',
            abbreviation: 'MI'
        },
        {
            name: 'Minnesota',
            abbreviation: 'MN'
        },
        {
            name: 'Mississippi',
            abbreviation: 'MS'
        },
        {
            name: 'Missouri',
            abbreviation: 'MO'
        },
        {
            name: 'Montana',
            abbreviation: 'MT'
        },
        {
            name: 'Nebraska',
            abbreviation: 'NE'
        },
        {
            name: 'Nevada',
            abbreviation: 'NV'
        },
        {
            name: 'New Hampshire',
            abbreviation: 'NH'
        },
        {
            name: 'New Jersey',
            abbreviation: 'NJ'
        },
        {
            name: 'New Mexico',
            abbreviation: 'NM'
        },
        {
            name: 'New York',
            abbreviation: 'NY'
        },
        {
            name: 'North Carolina',
            abbreviation: 'NC'
        },
        {
            name: 'North Dakota',
            abbreviation: 'ND'
        },
        {
            name: 'Northern Mariana Islands',
            abbreviation: 'MP'
        },
        {
            name: 'Ohio',
            abbreviation: 'OH'
        },
        {
            name: 'Oklahoma',
            abbreviation: 'OK'
        },
        {
            name: 'Oregon',
            abbreviation: 'OR'
        },
        {
            name: 'Palau',
            abbreviation: 'PW'
        },
        {
            name: 'Pennsylvania',
            abbreviation: 'PA'
        },
        {
            name: 'Puerto Rico',
            abbreviation: 'PR'
        },
        {
            name: 'Rhode Island',
            abbreviation: 'RI'
        },
        {
            name: 'South Carolina',
            abbreviation: 'SC'
        },
        {
            name: 'South Dakota',
            abbreviation: 'SD'
        },
        {
            name: 'Tennessee',
            abbreviation: 'TN'
        },
        {
            name: 'Texas',
            abbreviation: 'TX'
        },
        {
            name: 'Utah',
            abbreviation: 'UT'
        },
        {
            name: 'Vermont',
            abbreviation: 'VT'
        },
        {
            name: 'Virgin Islands',
            abbreviation: 'VI'
        },
        {
            name: 'Virginia',
            abbreviation: 'VA'
        },
        {
            name: 'Washington',
            abbreviation: 'WA'
        },
        {
            name: 'West Virginia',
            abbreviation: 'WV'
        },
        {
            name: 'Wisconsin',
            abbreviation: 'WI'
        },
        {
            name: 'Wyoming',
            abbreviation: 'WY'
        }
    ],
};

module.exports = constant;