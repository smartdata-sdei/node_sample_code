let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');
let ParkingLot = require('./ParkingLot');

const patrollerLogsSchema = Schema({
    isIssueCreatedOnJira: {
        type: Boolean,
        default: false
    },
    jiraIssueKeyId: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    zone: {
        type: String
    },
    requestCreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    logs: [{
        date: {
            type: Date
        },
        isNoPatrollerFound: {
            type: Boolean
        },
        isPatrollerAssignedByAdmin: {
            type: Boolean
        },
        isPatrollerAssignedAndActivatedByAdmin: {
            type: Boolean
        },
        isPatrollerRemovedByAdmin: {
            type: Boolean
        },
        isPatrollerRemovedByHost: {
            type: Boolean
        },
        isNewRequest: {
            type: Boolean
        },
        isNotResponded: {
            type: Boolean
        },
        isRequestAccepted: {
            type: Boolean
        },
        isRequestActivated: {
            type: Boolean
        },
        isRequestDeclined: {
            type: Boolean
        },
        isNewPatrollerAssigned: {
            type: Boolean
        },
        patroller: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        patrollerEmail: {
            type: String
        },
        patrollerId: {
            type: String
        },
        companyName: {
            type: String
        },
        statusChangedFrom: {
            type: String
        },
        statusChangedTo: {
            type: String
        },
        currentstatus: {
            type: String
        },
        message: {
            type: String
        },
    }],

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

patrollerLogsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PatrollerLogs', patrollerLogsSchema);
