let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');

const walletHistorySchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionId: {
        type: String
    },
    currentBalance: {
        type: Number
    },
    previousBalance: {
        type: Number
    },
    amountCredited: {
        type: Number
    },
    amountDebited: {
        type: Number
    },
    isCredited: {
        type: Boolean
    },
    isCreditDoneFromAutoReload: {
        type: Boolean,
        default: false
    },
    // creditCard: {
    //     type: JSON
    // },
    success: {
        type: Boolean
    },
    date: {
        type: String
    },
    location: {
        type: String
    },
    zone: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

walletHistorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('WalletHistory', walletHistorySchema);
