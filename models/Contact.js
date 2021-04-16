let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');

const contactSchema = Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        index: true
    },
    countryCode: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    message: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', contactSchema);
