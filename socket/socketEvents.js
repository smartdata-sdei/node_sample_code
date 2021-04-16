let socket_event = null;
let socket_controller = require('../routes-controller/socket-controller');

module.exports.getSocket = function(){
    // console.log(socket_event,'     getSocket in socketEvents');
    return socket_event;
}

module.exports.createSocket = function(io){
    try {
        // console.log(io, 'io in socketEvents, Socket created');
        io.on('connection', function (socket){
            // console.log('Socket created 111');
            socket.emit('getMessage', { data: 'World' });
            // console.log('Socket created 222');
            socket.on('sendMessage', function (data){
              console.log(data, '-->message data from frontend');
            });

            socket.on('getParkingLotById', function (id){
                socket_controller.getParkingLot(id);
            });

            // console.log(socket , '    socket at app start in socketEvents');
            socket_event = socket;
        });
    } catch (err) {
        console.log(err, "Error occur in socket");
    }
}
