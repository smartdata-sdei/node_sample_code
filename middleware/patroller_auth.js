let User = require('../models/User');
let constant = require('../constants/constant');

async function patrollerAuth(req,res,next){
    try{
        let loggedInUser = req.user._id;
        let patroller = await User.findOne( { _id: loggedInUser, isDeleted: false, isPatroller: true, role: '4' } );
        if(patroller){
            req.patroller = patroller;
            next();
        }
        else{
            constant.function.unauthorizedAccess(res);
        }
    } catch(err){
        constant.function.serverError(res);
    }
}

module.exports = patrollerAuth;