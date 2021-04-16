let User = require('../models/User');
let WalletHistory = require('../models/WalletHistory');

let constant = require('../constants/constant');
let environment = require('../environments/environment');

let Cryptr = require('cryptr');
let cryptr = new Cryptr(constant.secretKeys.cryptrSecretKey);

let braintree = require('braintree');
let gateway = new braintree.BraintreeGateway({
    environment: constant.braintreeCredentials.environment,
    merchantId: constant.braintreeCredentials.merchantId,
    publicKey: constant.braintreeCredentials.publicKey,
    privateKey: constant.braintreeCredentials.privateKey
});

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
                    mobileNumber: mobileNumber
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

                    }
                    else{
                        console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                    }

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
                        mobileNumber: mobileNumber
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
                            
                        }
                        else{
                            console.log(constant.message.errorFindingQuickBooksTokenFromDatabase);
                        }

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
                    hash: hashed
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
