let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');

const wNineSchema = Schema({
    attachableId: {
        type: String
    },
    isDataSavedInQBO: {
        type: Boolean,
        default: false
    },
    w9Id: {
        type: String
    },
    earningToVendor: {
        type: Number
    },
    earningToAdmin: {
        type: Number
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    w9name: {
        type: String
    },
    w9firstName: {
        type: String
    },
    w9middleName: {
        type: String
    },
    w9lastName: {
        type: String
    },
    w9businessName: {
        type: String
    },
    w9irsTaxClassification: {
        type: String
    },
    w9individualSoleProprietorOrSingleMemberLlc: {
        type: Boolean
    },
    w9cCorporation: {
        type: Boolean
    },
    w9sCorporation: {
        type: Boolean
    },
    w9partnership: {
        type: Boolean
    },
    w9trustEstate: {
        type: Boolean
    },
    w9limitedLiabilityCompanyEnterTaxClassification: {
        type: Boolean
    },
    w9limitedLiabilityCompanyEnterTaxClassificationInput: {
        type: String
    },
    w9LlcCCorporation: {
        type: Boolean
    },
    w9LlcSCorporation: {
        type: Boolean
    },
    w9LlcPartnership: {
        type: Boolean
    },
    w9other: {
        type: Boolean
    },
    w9otherInput: {
        type: String
    },
    w9exemptPayeeCode: {
        type: String
    },
    w9exemptionFromFatcaReportingCode: {
        type: String
    },
    w9address: {
        type: String
    },
    w9city: {
        type: String
    },
    w9state: {
        type: String
    },
    w9zipcode: {
        type: String
    },
    w9accountNumbers: {
        type: String
    },
    w9selectTaxId: {
        type: String
    },
    w9isSsnFilled: {
        type: Boolean
    },
    w9socialSecurityNumber: {
        type: String
    },
    w9employerIdentificationNumber: {
        type: String
    },
    bankName: {
        type: String
    },
    accountNameAttachedTo: {
        type: String
    },
    accountNickName: {
        type: String
    },
    routingNumber: {
        type: String
    },
    accountNumber: {
        type: String
    },
    confirmAccountNumber: {
        type: String
    },
    acceptTerms: {
        type: Boolean
    },
    acceptTermsTime: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

wNineSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Wnine', wNineSchema);
