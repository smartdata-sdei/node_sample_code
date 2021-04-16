let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let User = require('./User');
let ParkingLot = require('./ParkingLot');

const transactionSchema = Schema({
    attachableId: {
        type: String
    },
    isDataSavedInQBO: {
        type: Boolean,
        default: false
    },
    vendorBillAttachableId: {
        type: String
    },
    isVendorBillSavedInQBO: {
        type: Boolean,
        default: false
    },
    purchaseOrderAttachableId: {
        type: String
    },
    ispurchaseOrderSavedInQBO: {
        type: Boolean,
        default: false
    },

    refundReceiptAttachableId: {
        type: String
    },
    isRefundReceiptSavedInQBO: {
        type: Boolean,
        default: false
    },
    vendorCreditAttachableId: {
        type: String
    },
    isVendorCreditSavedInQBO: {
        type: Boolean,
        default: false
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFirstName: {
        type: String
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isGuestCheckout: {
        type: Boolean,
        default: false
    },
    userEmail: {
        type: String
    },
    countryCode: {
        type: String
    },
    userMobileNumber: {
        type: String
    },
    parkingLot: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingLot'
    },
    // vehicleDetails: [{
    //     carName: {
    //         type: String
    //     },
    //     licensePlateNumber: {
    //         type: String
    //     },
    // }],
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: String
    },
    licensePlateNumber: {
        type: String
    },
    stateRegistered: {
        type: String
    },
    nickName: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    userStartTime: {
        type: String
    },
    userEndTime: {
        type: String
    },
    totalMinutes: {
        type: Number
    },
    totalChargeableMinutes: {
        type: Number
    },
    userParkingFee: {
        type: Number
    },
    actualParkingFee: {
        type: Number
    },
    transactionId: {
        type: String
    },
    // creditCard: {
    //     type: JSON
    // },
    parkingLotName: {
        type: String
    },
    address: {
        type: String
    },
    isLocationHavingApartment: {
        type: Boolean
    },
    apartmentNumber: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    zone: {
        type: String
    },
    zoneAttachableId: {
        type: String
    },
    lotRate: {
        type: Number
    },
    // lotConvenienceFee: {
    //     type: Number
    // },
    amountWithoutTaxes: {
        type: Number
    },
    amount: {
        type: Number
    },
    braintreeConvenienceFee: { // Credit card fixed fee
        type: Number
    },
    creditCardFee: { // Credit card percentage fee
        type: Number
    },
    totalIncomeToBraintree: {
        type: Number
    },
    parkingTaxes: {
        type: Number
    },
    earningToLot: {
        type: Number
    },
    earningToAdmin: {
        type: Number
    },
    earningToVendorPercentage: {
        type: Number
    },
    earningToAdminPercentage: {
        type: Number
    },
    extendTimeCase: {
        type: Boolean,
        default: false
    },
    isPaymentDone: {
        type: Boolean,
        default: false
    },
    paymentSentToLot: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isExtendTimeMessageSent: {
        type: Boolean,
        default: false
    },
    isTimeExtendedForThisTransaction: {
        type: Boolean,
        default: false
    },
    associatedVendorId: {
        type: String
    },
    associatedVendorAttachableId: {
        type: String
    },
    associatedW9Name: {
        type: String
    },
    associatedSocialSecurityNumber: {
        type: String
    },
    associatedEmployerIdentificationNumber: {
        type: String
    },
    isPaymentDoneFromWallet: {
        type: Boolean
    },
    isParkingTransaction: {
        type: Boolean,
        default: false
    },
    isWalletHistory: {
        type: Boolean,
        default: false
    },
    isMinParkingFeeCase: {
        type: Boolean,
        default: false // true if user parking fee value is less than $0.10
    },

    currentBalance: {
        type: Number
    },
    amountCredited: {
        type: Number
    },
    amountDebited: {
        type: Number
    },
    creditCardFundsHoldingAccount: {
        type: Number
    },
    isCredited: {
        type: Boolean
    },
    isCreditDoneFromAutoReload: {
        type: Boolean,
        default: false
    },
    success: {
        type: Boolean
    },
    date: {
        type: String
    },

    isRefundGeneratedTransaction: {
        type: Boolean,
        default: false
    },
    refundedTransaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    isRefundGeneratedForThisTransaction: {
        type: Boolean,
        default: false
    },
    refundGeneratedDate: {
        type: Date
    },
    isRefundCreditedIntoWallet: {
        type: Boolean
    },

    accountId: {
        type: Number
    },
    baseTotal: {
        type: Number
    },
    billingAddress: {
        type: JSON
    },
    completionDate: {
        type: Number
    },
    creationDate: {
        type: Number
    },
    currency: {
        type: String
    },
    customFields: {
        type: Array
    },
    defaultTaxes: {
        type: Array
    },
    discounts: {
        type: Array
    },
    discountsTotal: {
        type: String
    },
    email: {
        type: String
    },
    exported: {
        type: Boolean
    },
    id: {
        type: String
    },
    invoiceNumber: {
        type: String
    },
    items: {
        type: Array
    },
    customizedItems: {
        type: Array
    },
    itemsTotal: {
        type: Number
    },
    itemsTotalWithoutTaxes: {
        type: Number
    },
    paymentGatewayInvoiceId: {
        type: String
    },
    paymentGatewayTransactionId: {
        type: String
    },
    paymentGatewayUsed: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    refunds: {
        type: Array
    },
    shipToBillingAddress: {
        type: Boolean
    },
    shippingAddress: {
        type: JSON
    },
    status: {
        type: String
    },
    summary: {
        type: JSON
    },
    taxProvider: {
        type: String
    },
    taxes: {
        type: Array
    },
    taxesTotal: {
        type: Number
    },
    token: {
        type: String
    },
    total: {
        type: Number
    },
    totalPriceWithoutDiscountsAndTaxes: {
        type: Number
    },
    isSnipcartOrderTransaction: {
        type: Boolean,
        default: false
    },
    isRefundCreatedInSnipcart: {
        type: Boolean,
        default: false
    },
    isRefundCreatedInTaxCloud: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

transactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Transaction', transactionSchema);
