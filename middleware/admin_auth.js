let User = require('../models/User');
let constant = require('../constants/constant');

async function adminAuth(req,res,next){
    try{
        let loggedInUser = req.user._id;
        let user = await User.findOne({ _id: loggedInUser, role: '1', isDeleted: false });
        if(user){
            next();
        }
        else{
            constant.function.unauthorizedAccess(res);
        }
    } catch(err){
        constant.function.serverError(res);
    }
}

module.exports = adminAuth;