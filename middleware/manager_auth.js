let User = require('../models/User');
let constant = require('../constants/constant');

async function managerAuth(req,res,next){
    try{
        let loggedInUser = req.user._id;
        // let user = await User.findOne({ _id: loggedInUser, role: '2', isDeleted: false });
        let user = await User.findOne( { _id: loggedInUser, isDeleted: false, $or: [ { role: '2'}, { isManager: true } ] } );
        if(user){
            req.manager = user;
            next();
        }
        else{
            constant.function.unauthorizedAccess(res);
        }
    } catch(err){
        constant.function.serverError(res);
    }
}

module.exports = managerAuth;