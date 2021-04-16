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

router.post('/disbursementwebhookapiofbraintree', users_controller.disbursementWebhookApiOfBraintree);

router.post('/verifyotpandsignup', users_controller.verifyOtpAndSignup);

router.post('/signup', users_controller.signUp);

router.post('/signin', users_controller.signIn);

router.post('/forgotpassword', users_controller.forgotPassword);

router.post('/setpassword', users_controller.setPassword);

router.post('/changepassword', auth, users_controller.changePassword);


// Admin routes **********************************************************************

router.get('/getdashboarddata', auth, admin_auth, users_controller.getDashboardData);

router.post('/createuser', auth, admin_auth, users_controller.createUser);

router.get('/getuserbyid', auth, admin_auth, users_controller.getUserById);

router.post('/getallusers', auth, admin_auth, users_controller.getAllUsers);

router.post('/searchuser', auth, admin_auth, users_controller.searchUser);

module.exports = router;
