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

module.exports = router;
