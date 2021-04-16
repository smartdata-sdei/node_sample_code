let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');
let Transaction = require('./Transaction');
let Wnine = require('./Wnine');
let Violation = require('./Violation');
let PatrollerLogs = require('./PatrollerLogs');

const parkingLotSchema = Schema({
    attachableId: {
        type: String
    },
    isDataSavedInQBO: {
        type: Boolean,
        default: false
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patroller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    patrollerLogs: [{
        type: Schema.Types.ObjectId,
        ref: 'PatrollerLogs'
    }],

    patrollerHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    patrollerAssignedStatus: {
        type: String,
        default: 'none' // [none, requestedAndNotFound, requested, pending, active]
    },

    isPatrollerRequested: {
        type: Boolean,
        default: false
    },
    patrollerRequestedDate: {
        type: Date
    },

    isPatrollerPending: {
        type: Boolean,
        default: false
    },
    patrollerPendingDate: {
        type: Date
    },

    isPatrollerActive: {
        type: Boolean,
        default: false
    },
    patrollerActiveDate: {
        type: Date
    },

    violations: [{
        type: Schema.Types.ObjectId,
        ref: 'Violation'
    }],

    wNine: {
        type: Schema.Types.ObjectId,
        ref: 'Wnine'
    },
    bestWayToDescribeThisLocation: {
        type: String
    },
    isParkingSpotsCoveredOrUncovered: {
        type: String
    },
    isPayToParkSpacesDesignatedOrUnspecified: {
        type: String
    },
    parkingLotName: {
        type: String
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String
    },
    streetNumber: {
        type: String
    },
    route: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postalCode: {
        type: String
    },
    zone: {
        type: String
    },
    totalSpaces: {
        type: Number
    },
    spacesAvailable: {
        type: Number
    },
    parkingFee: {
        type: Number
    },
    convenienceFee: {
        type: Number
    },
    maxHours: {
        type: Number
    },
    isLocationHavingApartment: {
        type: Boolean,
        default: false
    },
    apartmentNumber: {
        type: String
    },


    isCustomizeWeeklyParkingFee: {
        type: Boolean,
        default: false
    },
    // Sunday
    parkingFeeSunday: {
        type: Number
    },
    chargeTimeStartSunday: {
        type: String
    },
    chargeTimeEndSunday: {
        type: String
    },
    isAddFreeTimeSunday: {
        type: Boolean
    },
    freeTimeStartSunday: {
        type: String
    },
    freeTimeEndSunday: {
        type: String
    },
    isAddFreeTimeSundaySecond: {
        type: Boolean
    },
    freeTimeStartSundaySecond: {
        type: String
    },
    freeTimeEndSundaySecond: {
        type: String
    },

    // Monday
    parkingFeeMonday: {
        type: Number
    },
    chargeTimeStartMonday: {
        type: String
    },
    chargeTimeEndMonday: {
        type: String
    },
    isAddFreeTimeMonday: {
        type: Boolean
    },
    freeTimeStartMonday: {
        type: String
    },
    freeTimeEndMonday: {
        type: String
    },
    isAddFreeTimeMondaySecond: {
        type: Boolean
    },
    freeTimeStartMondaySecond: {
        type: String
    },
    freeTimeEndMondaySecond: {
        type: String
    },

    // Tuesday
    parkingFeeTuesday: {
        type: Number
    },
    chargeTimeStartTuesday: {
        type: String
    },
    chargeTimeEndTuesday: {
        type: String
    },
    isAddFreeTimeTuesday: {
        type: Boolean
    },
    freeTimeStartTuesday: {
        type: String
    },
    freeTimeEndTuesday: {
        type: String
    },
    isAddFreeTimeTuesdaySecond: {
        type: Boolean
    },
    freeTimeStartTuesdaySecond: {
        type: String
    },
    freeTimeEndTuesdaySecond: {
        type: String
    },

    // Wednesday
    parkingFeeWednesday: {
        type: Number
    },
    chargeTimeStartWednesday: {
        type: String
    },
    chargeTimeEndWednesday: {
        type: String
    },
    isAddFreeTimeWednesday: {
        type: Boolean
    },
    freeTimeStartWednesday: {
        type: String
    },
    freeTimeEndWednesday: {
        type: String
    },
    isAddFreeTimeWednesdaySecond: {
        type: Boolean
    },
    freeTimeStartWednesdaySecond: {
        type: String
    },
    freeTimeEndWednesdaySecond: {
        type: String
    },

    // Thursday
    parkingFeeThursday: {
        type: Number
    },
    chargeTimeStartThursday: {
        type: String
    },
    chargeTimeEndThursday: {
        type: String
    },
    isAddFreeTimeThursday: {
        type: Boolean
    },
    freeTimeStartThursday: {
        type: String
    },
    freeTimeEndThursday: {
        type: String
    },
    isAddFreeTimeThursdaySecond: {
        type: Boolean
    },
    freeTimeStartThursdaySecond: {
        type: String
    },
    freeTimeEndThursdaySecond: {
        type: String
    },

    // Friday
    parkingFeeFriday: {
        type: Number
    },
    chargeTimeStartFriday: {
        type: String
    },
    chargeTimeEndFriday: {
        type: String
    },
    isAddFreeTimeFriday: {
        type: Boolean
    },
    freeTimeStartFriday: {
        type: String
    },
    freeTimeEndFriday: {
        type: String
    },
    isAddFreeTimeFridaySecond: {
        type: Boolean
    },
    freeTimeStartFridaySecond: {
        type: String
    },
    freeTimeEndFridaySecond: {
        type: String
    },

    // Saturday
    parkingFeeSaturday: {
        type: Number
    },
    chargeTimeStartSaturday: {
        type: String
    },
    chargeTimeEndSaturday: {
        type: String
    },
    isAddFreeTimeSaturday: {
        type: Boolean
    },
    freeTimeStartSaturday: {
        type: String
    },
    freeTimeEndSaturday: {
        type: String
    },
    isAddFreeTimeSaturdaySecond: {
        type: Boolean
    },
    freeTimeStartSaturdaySecond: {
        type: String
    },
    freeTimeEndSaturdaySecond: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: true
    },
    isActivated: {
        type: Boolean,
        default: true
    },
    isDeactivatedByAdmin: {
        type: Boolean,
        default: false
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],

    isSignageOrdered: {
        type: Boolean,
        default: false
    },
    signageOrderedDate: {
        type: Date
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

parkingLotSchema.index({ location: '2dsphere' });

parkingLotSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
