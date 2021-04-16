let ParkingLot = require('../models/ParkingLot');
let User = require('../models/User');
let Transaction = require('../models/Transaction');
let Wnine = require('../models/Wnine');
let AuthToken = require('../models/AuthToken');
let socket = require('../socket/socketEvents');
let constant = require('../constants/constant');

exports.sendDashboardDataForAdmin = async ()=>{
    try {
        let users, managers, parkingLots, transactions, wNines, authToken;
        getIntuitToken()
        // const options = {
        //     sort: { createdAt: -1 },
        //     page: 1,
        //     limit: 10
        // };

        // // let userList = await User.paginate({ role: '3', isDeleted: false }, options);
        // // let userList = await User.paginate({ $or: [ { isUser: true, isDeleted: false }, { role: '2', "transactions.0": { "$exists": true }, isDeleted: false } ] }, options);
        // let userList = await User.paginate({ isUser: true, isDeleted: false }, options);
        // if(userList){
        //     users = userList;
        //     getManagers();
        // }
        // else{
        //     users = {};
        //     getManagers();
        // }

        // async function getManagers(){
        //     let managerList = await User.paginate({ isManager: true, isDeleted: false }, options);
        //     if(managerList){
        //         managers = managerList;
        //         getParkingPlaces();
        //     }
        //     else{
        //         managers = {};
        //         getParkingPlaces();
        //     }
        // }

        // async function getParkingPlaces(){
        //     let parkingLotsList = await ParkingLot.paginate({ isDeleted: false }, options);
        //     if(parkingLotsList){
        //         parkingLots = parkingLotsList;
        //         getTransactions();
        //     }
        //     else{
        //         parkingLots = {};
        //         getTransactions();
        //     }
        // }

        // async function getTransactions(){
        //     let transactionList = await Transaction.paginate({ isDeleted: false }, options);
        //     if(transactionList){
        //         transactions = transactionList;
        //         getWNines();
        //     }
        //     else{
        //         transactions = {};
        //         getWNines();
        //     }
        // }

        // async function getWNines(){
        //     let wNinesList = await Wnine.paginate({ isDeleted: false }, options);
        //     if(wNinesList){
        //         wNines = wNinesList;
        //         getIntuitToken();
        //     }
        //     else{
        //         wNines = {};
        //         getIntuitToken();
        //     }
        // }

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
                // users: users,
                // managers: managers,
                // parkingLots: parkingLots,
                // transactions: transactions,
                // wNines: wNines,
                authToken: authToken
            };
            
            // console.log(socket, '    socket for dashboard data');

            socket.getSocket().emit('getDashboardDataForAdmin', {
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: result
            });
        }
        
    } catch (err) {
        console.log('Server error finding dashboard data for admin in socket_controller', err);
        socket.getSocket().emit('getDashboardDataForAdmin', {
            success: false,
            code: constant.httpCode.internalServerError,
            message: constant.message.serverError,
            data: err
        });
    }
}

exports.getParkingLot = async (id)=>{
    try {
        // console.log(id,'   iddddd');
        let parkingLot = await ParkingLot.findOne({ _id: id, isActivated: true, isDeleted: false }).populate('wNine manager');
        if(parkingLot){
            // console.log(socket.getSocket().id, 'Success in socket controller');
            // socket.getSocket().emit('getParkingLotDataById', {
            //     success: true,
            //     code: constant.httpCode.success,
            //     message: constant.message.dataFound,
            //     data: parkingLot
            // });
            console.log(socket,'   socket getParkingLotDataById in socket controller');
            socket.getSocket().emit('getParkingLotDataById', {
                success: true,
                code: constant.httpCode.success,
                message: constant.message.dataFound,
                data: parkingLot
            });
        }
        else{
            console.log(socket,'    Not found');
            socket.getSocket().emit('getParkingLotDataById', {
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.dataNotFound,
                data: []
            });
            console.log('Error finding parking lot');
        }
    } catch (err) {
        console.log('Server error finding parking lot in socket_controller', err);
        socket.getSocket().emit('getParkingLotDataById', {
            success: false,
            code: constant.httpCode.internalServerError,
            message: constant.message.serverError,
            data: err
        });
    }
}

exports.getMyProfile = async (id)=>{
    try {
        // console.log(id,'   id of user profile');
        let user = await User.findOne({ _id: id, isDeleted: false }).populate({path: 'transactions parkingLots walletHistory', options: { sort: { createdAt: -1 } } });
        if(user){
            console.log(socket,'   socket getMyProfile in socket controller');
            socket.getSocket().emit('getMyProfile', {
                success: true,
                code: constant.httpCode.success,
                message: constant.message.userFound,
                data: user
            });
        }
        else{
            // console.log(socket,'    Not found');
            socket.getSocket().emit('getMyProfile', {
                success: false,
                code: constant.httpCode.notFound,
                message: constant.message.userNotFound,
                data: []
            });
            console.log('Error finding my profile');
        }
    } catch (err) {
        console.log('Server error finding my profile in socket_controller', err);
        socket.getSocket().emit('getParkingLotDataById', {
            success: false,
            code: constant.httpCode.internalServerError,
            message: constant.message.serverError,
            data: err
        });
    }
}