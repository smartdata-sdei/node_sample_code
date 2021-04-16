let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const authTokenSchema = Schema({
    x_refresh_token_expires_in: {
        type: Number
    },
    access_token: {
        type: String
    },
    token_type: {
        type: String
    },
    refresh_token: {
        type: String
    },
    id_token: {
        type: String
    },
    expires_in: {
        type: Number
    },
    isValid: {
        type: Boolean
    },
    refreshTokenExpiresOnDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('AuthToken', authTokenSchema);
