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
        found: 302
    },
    message: {
        validationError: 'Validation error, try again',
        accessDenied: 'Access denied, no token found',
        accountCreated: 'Your account has been created successfully',
        userAccountCreated: 'Account created, please enter OTP sent in mobile and email',
        userAccountCreatedByAdmin: 'Account created, details are sent to user via email',
        emailAlreadyExist: 'This email is taken, try another',
        mobileNumberAlreadyExist: 'This mobile number is taken, try another',
    },
    regEx: {
        passwordRegEx: '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}'
    },
    emailSubject: {
        signup: ' park account created successfully',
        resetPassword: ' park password help',
        verifyEmail: ' park Email Verification'
    },
    function: {
        signUpWelcomeMessageInSms: (name, accountType) =>{
            return `Hi ${name}, Thank you for joining Park! Your ${accountType} account is successfully created. We promise not to be a bother, but please note that we do send text notifications of bookings & expirations for your convenience. Happy parking!`
        },
        unauthorizedAccess: (res) => {
            return res.status(constant.httpCode.success).json({
                success: false,
                code: constant.httpCode.unauthorized,
                message: constant.message.unauthorized,
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
    }
};

module.exports = constant;