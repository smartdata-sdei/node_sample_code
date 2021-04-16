let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');
let ParkingLot = require('./ParkingLot');

const violationSchema = Schema({
    attachableId: {
        type: String
    },
    isDataSavedInQBO: {
        type: Boolean,
        default: false
    },

    violationId: {
        type: String
    },

    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patroller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parkingLot: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    parkingLotName: {
        type: String
    },
    address: {
        type: String
    },
    zone: {
        type: String
    },

    stateRegistered: {
        type: String
    },
    license: {
        type: String
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    color: {
        type: String
    },
    vin: {
        type: String
    },

    status: {
        type: String,
        enum: ['booted', 'towed', 'paid', 'dismissed']
    },
    sortStatus: {
        type: String,
        enum: ['B', 'T', 'Z']
    },

    statusChanges: [{
        statusChangedBy: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        date: {
            type: Date
        }
    }],

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

violationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Violation', violationSchema);
