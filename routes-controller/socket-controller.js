let ParkingLot = require('../models/ParkingLot');
let User = require('../models/User');

exports.getParkingLot = async (id)=>{
    try {
        // console.log(id,'   iddddd');
        let parkingLot = await ParkingLot.findOne({ _id: id, isActivated: true, isDeleted: false }).populate('wNine manager');
        if(parkingLot){
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
