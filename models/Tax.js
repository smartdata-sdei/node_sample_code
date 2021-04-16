let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const taxSchema = Schema({
    stateColorado: {
        type: Number
    },
    countryEagle: {
        type: Number
    },
    cityAvon: {
        type: Number
    },
    specialDistrict: {
        type: Number
    },
    combinedTaxRate: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Tax', taxSchema);
