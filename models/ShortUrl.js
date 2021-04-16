let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');

const shortUrlSchema = Schema({
    shortId: {
        type: String
    },
    parkingLotId: {
        type: String
    },
    transactionId: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

shortUrlSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
