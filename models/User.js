let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jwt = require('jsonwebtoken');
let mongoosePaginate = require('mongoose-paginate');
let WalletHistory = require('../models/WalletHistory');
let ParkingLot = require('./ParkingLot');
let Transaction = require('./Transaction');

const userSchema = Schema({
    attachableId: {
        type: String
    },
    isDataSavedInQBO: {
        type: Boolean,
        default: false
    },
    jiraCustomerAccountId: {
        type: String,
        default: ''
    },
    isCustomerCreatedOnJira: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String
    },
    hostId: {
        type: String
    },
    patrollerId: {
        type: String
    },
    braintreeCustomerId: {
        type: Number
    },
    autoReloadWallet: {
        type: Boolean,
        default: false
    },
    autoReloadPlanId: {
        type: String,
        default: ''
    },
    autoReloadAmount: {
        type: String,
        default: '10.00'
    },
    companyName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        index: true
    },
    companyEmail: {
        type: String,
        lowercase: true
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    },
    countryCode: {
        type: String
    },
    mobileNumber: {
        type: String
    },

    businessCountryCode: {
        type: String
    },
    businessMobileNumber: {
        type: String
    },

    address: {
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

    mailingAddress: {
        type: String
    },
    apartmentNumber: {
        type: String
    },
    patrollingDistanceToCover: {
        type: Number
    },
    stateLicenseNumber: {
        type: String
    },

    vehicles: [{
        licensePlateNumber: {
            type: String
        },
        stateRegistered: {
            type: String
        },
        nickName: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    }],
    role: {
        type: String,
        default: '3',
        enum: ['1', '2', '3', '4']
    },
    isUser: {
        type: Boolean,
        default: false
    },
    isManager: {
        type: Boolean,
        default: false
    },
    isPatroller: {
        type: Boolean,
        default: false
    },
    isAccountSwitchedFromUserToManager: {
        type: Boolean,
        default: false
    },
    isAccountSwitchedFromUserToManagerByAdmin: {
        type: Boolean,
        default: false
    },
    userToManagerSwitchDate: {
        type: String
    },
    activationNumber: {
        type: Number
    },
    emailOtp: {
        type: Number
    },
    mobileOtp: {
        type: Number
    },
    walletBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    walletHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'WalletHistory'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationNumber: {
        type: Number
    },
    isActivated: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    parkingLots: [{
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

userSchema.plugin(mongoosePaginate);

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({
        _id: this.id,
        firstName: this.firstName,
        role: this.role,
        isManager: this.isManager
    }, process.env.secret);
    return token;
}

userSchema.methods.addParkingLotToUser = function (parkingLot){
    this.parkingLots.push(parkingLot);
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
