let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let admin_auth = require('../middleware/admin_auth');
let manager_auth = require('../middleware/manager_auth');
let patroller_auth = require('../middleware/patroller_auth');
let users_controller = require('../routes-controller/users-controller');

/* GET users listing. */
router.get('/', function (req, res, next){
  res.send('Respond with a resource');
});

router.get('/test', users_controller.test);

router.get('/findTerms', users_controller.findTerms);

router.get('/findDepartments', users_controller.findDepartments);

router.get('/findPaymentMethods', users_controller.findPaymentMethods);

router.get('/findClasses', users_controller.findClasses);

router.get('/findAccounts', users_controller.findAccounts);

router.get('/findItems', users_controller.findItems);

router.get('/findVendors', users_controller.findVendors);


router.get('/createtokenforquickbooks', auth, admin_auth, users_controller.createTokenForQuickBooks);

router.get('/createtokenforquickbookscallback', users_controller.createTokenForQuickBooksCallBack);

router.post('/disbursementwebhookapiofbraintree', users_controller.disbursementWebhookApiOfBraintree);

// router.post('/adminsignup', users_controller.adminSignUp);

router.post('/sendotpforregister', users_controller.sendOtpForRegister);

router.post('/verifyotpandsignup', users_controller.verifyOtpAndSignup);

router.post('/verifyotpandpatrollersignup', users_controller.verifyOtpAndPatrollerSignup);

router.post('/signup', users_controller.signUp);

router.get('/verify', users_controller.verify);

router.post('/signin', users_controller.signIn);

router.post('/forgotpassword', users_controller.forgotPassword);

router.post('/setpassword', users_controller.setPassword);

router.post('/postsetpassword', users_controller.postSetPassword);

router.post('/changepassword', auth, users_controller.changePassword);

router.post('/addvehicle', auth, users_controller.addVehicle);

router.post('/editvehicle', auth, users_controller.editVehicle);

router.post('/removevehicle', auth, users_controller.removeVehicle);

router.get('/getmyprofile', auth, users_controller.getMyProfile);

router.post('/checkifemailalreadyavailable', auth, users_controller.checkIfEmailAlreadyAvailable);

router.put('/editmyaccount', auth, users_controller.editMyAccount);

router.put('/editmyprofile', auth, users_controller.editMyProfile);

router.put('/changeemail', auth, users_controller.changeEmail);

router.post('/changemobilenumber', auth, users_controller.changeMobileNumber);

router.post('/verifyotpandeditprofile', auth, users_controller.verifyOtpAndEditProfile);

router.post('/verifyotpandeditprofileofpatroller', auth, users_controller.verifyOtpAndEditProfileOfPatroller);

router.get('/getmytransactions', auth, users_controller.getMyTransactions);

router.post('/addmoneytowallet', auth, users_controller.addMoneyToWallet);

router.get('/getmywallethistory', auth, users_controller.getMyWalletHistory);


// Admin routes **********************************************************************

router.get('/getdashboarddata', auth, admin_auth, users_controller.getDashboardData);

router.post('/createuser', auth, admin_auth, users_controller.createUser);

router.get('/getuserbyid', auth, admin_auth, users_controller.getUserById);

router.put('/edituser', auth, admin_auth, users_controller.editUser);

router.delete('/deleteuser', auth, admin_auth, users_controller.deleteUser);

router.post('/getallusers', auth, admin_auth, users_controller.getAllUsers);

router.post('/searchuser', auth, admin_auth, users_controller.searchUser);

router.get('/activateuser', auth, admin_auth, users_controller.activateUser);

router.get('/deactivateuser', auth, admin_auth, users_controller.deActivateUser);


router.post('/createmanager', auth, admin_auth, users_controller.createManager);

router.get('/getmanagerbyid', auth, admin_auth, users_controller.getManagerById);

router.put('/editmanager', auth, admin_auth, users_controller.editManager);

router.delete('/deletemanager', auth, admin_auth, users_controller.deleteManager);

router.get('/getallmanagerslist', auth, admin_auth, users_controller.getAllManagersList); // No Pagination used

router.post('/getallmanagers', auth, admin_auth, users_controller.getAllManagers); // Pagination used

router.post('/searchmanager', auth, admin_auth, users_controller.searchManager);


// Manager routes **********************************************************************

router.get('/getdashboarddataformanager', auth, manager_auth, users_controller.getDashboardDataForManager);

router.get('/getdashboarddataforpatroller', auth, users_controller.getDashboardDataForPatroller);

router.post('/getallpatrollers', auth, admin_auth, users_controller.getAllPatrollers);

router.post('/getallviolations', auth, admin_auth, users_controller.getAllViolations);

router.post('/searchviolations', auth, users_controller.searchViolations);

router.post('/getmyviolations', auth, patroller_auth, users_controller.getMyViolations);

router.post('/getviolationsformanager', auth, manager_auth, users_controller.getViolationsForManager);

router.post('/createparkinglot', auth, users_controller.createParkingLot);

router.post('/editparkinglot', auth, users_controller.editParkingLot);

router.get('/activateparkinglot', auth, users_controller.activateParkingLot);

router.get('/deactivateparkinglot', auth, users_controller.deActivateParkingLot);

router.post('/getallparkinglots', auth, admin_auth, users_controller.getAllParkingLots);

router.get('/getparkinglotsforpatrollerrequest', auth, users_controller.getParkingLotsForPatrollerRequest);

router.post('/makerequestforpatroller', auth, users_controller.makeRequestForPatroller);

router.post('/getmyparkinglots', auth, manager_auth, users_controller.getMyParkingLots);

router.post('/getpatrollerparkinglots', auth, patroller_auth, users_controller.getPatrollerParkingLots);

router.post('/getpatrolleractiveparkinglots', auth, patroller_auth, users_controller.getPatrollerActiveParkingLots);

router.post('/acceptpatrollerrequest', auth, patroller_auth, users_controller.acceptPatrollerRequest);

router.post('/activatepatrollerrequest', auth, patroller_auth, users_controller.activatePatrollerRequest);

router.get('/optoutlocation', auth, patroller_auth, users_controller.optOutLocation);

router.post('/createviolation', auth, patroller_auth, users_controller.createViolation);

router.get('/getactivelocationsforpatroller', auth, patroller_auth, users_controller.getActiveLocationsForPatroller);

router.get('/getviolationbyid', auth, users_controller.getViolationById);

router.post('/searchparkinglot', auth, users_controller.searchParkingLot);

router.delete('/deleteparkinglot', auth, users_controller.deleteParkingLot);

router.get('/getparkinglotbyid', users_controller.getParkingLotById);

router.get('/getparkinglotbyidforadmin', auth, users_controller.getParkingLotByIdForAdmin);

router.get('/getparkinglotbyidforpatroller', auth, users_controller.getParkingLotByIdForPatroller);

router.get('/getnearbyparkinglots', users_controller.getNearByParkingLots);

router.get('/getnearbypatrollersforlocation', auth, users_controller.getNearByPatrollersForLocation);

router.get('/getparkinglotbyzonenumber', users_controller.getParkingLotByZoneNumber);

router.get('/gettax', users_controller.getTax);

router.post('/updatetax', auth, admin_auth, users_controller.updateTax);

router.post('/sendotp', users_controller.sendOtp);

router.post('/verifyotp', users_controller.verifyOtp);

router.post('/setuppassword', users_controller.setUpPassword);

// router.post('/guestsignup', users_controller.guestSignUp);

router.get('/getclienttoken', users_controller.getClientToken);

router.post('/createpurchase', users_controller.createPurchase);

router.post('/createfullrefund', users_controller.createFullRefund);

router.get('/getbraintreecustomerbycustomerid', users_controller.getBraintreeCustomerByCustomerId);

router.get('/removesavedcard', users_controller.removeSavedCard);

router.get('/setcardasdefault', users_controller.setCardAsDefault);

router.post('/addcreditcard', users_controller.addCreditCard);

router.get('/addbraintreecustomeridinuser', auth, users_controller.addBraintreeCustomerIdInUser);

router.get('/getbraintreeplans', auth, users_controller.getBraintreePlans);

router.post('/editmyplanid', auth, users_controller.editMyPlanId);

router.get('/turnonoffautoreloadwallet', auth, users_controller.turnOnOffAutoReloadWallet);

router.post('/createtransaction', auth, users_controller.createTransaction);

router.post('/getalltransactions', auth, users_controller.getAllTransactions);

// router.post('/gettransactionsformanager', auth, users_controller.getTransactionsForManager);

router.get('/getusertransactions', auth, users_controller.getUserTransactions);

router.get('/gettransactionbyid', auth, users_controller.getTransactionById);

router.post('/searchtransaction', auth, users_controller.searchTransaction);

router.post('/gettransactionbydatefilter', auth, users_controller.getTransactionByDateFilter);

// router.get('/getparkinglotsandusers', auth, users_controller.getParkingLotsAndUsers);

router.post('/getparkinglotandtransaction', users_controller.getParkingLotAndTransaction);

router.post('/gettransactiondataforcsv', auth, admin_auth, users_controller.getTransactionDataForCsv);

router.post('/sendcontactusform', users_controller.sendContactUsForm);

router.post('/getallcontactmessages', auth, admin_auth, users_controller.getAllContactMessages);

router.post('/searchcontactmessages', auth, admin_auth, users_controller.searchContactMessages);

router.delete('/deletecontactusmessage', auth, admin_auth, users_controller.deleteContactUsMessage);

// router.get('/switchaccounttohost', auth, users_controller.switchAccountToHost);

router.post('/getmonthlyrevenue', auth, admin_auth, users_controller.getMonthlyRevenue);

router.get('/getplacessuggestions', users_controller.getPlacesSuggestions);

router.get('/getlatlongbyplaceid', users_controller.getLatLongByPlaceId);

router.get('/getusersdataforcsv', auth, admin_auth, users_controller.getUsersDataForCsv);

router.get('/getmanagersdataforcsv', auth, admin_auth, users_controller.getManagersDataForCsv);

router.get('/getparkinglotsdataforcsv', auth, admin_auth, users_controller.getParkingLotsDataForCsv);

router.get('/getwninedataforcsv', auth, admin_auth, users_controller.getWNineDataForCsv);

router.get('/getallwnineforms', auth, admin_auth, users_controller.getAllWNineForms);

router.post('/getmywnineforms', auth, users_controller.getMyWNineForms);

router.get('/getwninebyid', auth, users_controller.getWNineById);

router.post('/checkifssnalreadyavailable', auth, users_controller.checkIfSsnAlreadyAvailable);

router.post('/checkifeinalreadyavailable', auth, users_controller.checkIfEinAlreadyAvailable);

router.post('/addmywnine', auth, users_controller.addMyWNine);

router.post('/editmywnine', auth, users_controller.editMyWNine);

router.post('/createcustomerinqbo', auth, admin_auth, users_controller.createCustomerInQbo);

router.post('/createclassinqbo', auth, admin_auth, users_controller.createClassInQbo);

router.post('/createvendorinqbo', auth, admin_auth, users_controller.createVendorInQbo);

router.post('/createtransactioninqbo', auth, admin_auth, users_controller.createTransactionInQbo);

router.post('/createpatroller', auth, admin_auth, users_controller.createPatroller);

router.put('/editpatroller', auth, admin_auth, users_controller.editPatroller);

router.delete('/deletepatroller', auth, admin_auth, users_controller.deletePatroller);

router.post('/getactivereservationsforpatroller', auth, patroller_auth, users_controller.getActiveReservationsForPatroller);

router.post('/getactivebootedviolationsforpatroller', auth, patroller_auth, users_controller.getActiveBootedViolationsForPatroller);

router.get('/setviolationstatus', auth, users_controller.setViolationStatus);

router.put('/editpatrolleraccount', auth, users_controller.editPatrollerAccount);

router.post('/requestnewpatrollerifnotfoundforlocation', auth, users_controller.requestNewPatrollerIfNotFoundForLocation);

router.post('/assignpatrollerforlocation', auth, users_controller.assignPatrollerForLocation);

router.post('/assignpatrollerbyadmin', auth, admin_auth, users_controller.assignPatrollerByAdmin);

router.post('/removepatrollerbyadmin', auth, users_controller.removePatrollerByAdmin);

router.post('/createcustomerinjira', auth, admin_auth, users_controller.createCustomerInJira);

router.post('/sendemailverificationlink', users_controller.sendEmailVerificationLink);

router.post('/postverifyemail', users_controller.postVerifyEmail);

module.exports = router;
