let joi = require('@hapi/joi');
let constant = require('../constants/constant');

let validate = {
    signup: (body)=>{
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            countryCode : joi.string().required(),
            mobileNumber : joi.string().required(),
            role: joi.string().required(),
            isManager: joi.required(),
            recaptchaReactive: joi.string()
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    patrollerSignUp: (body)=>{
        const schema = joi.object().keys({
            companyName: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            companyEmail: joi.string().email().trim().allow(''),
            countryCode : joi.string().required(),
            mobileNumber : joi.string().required(),
            businessCountryCode : joi.string().required(),
            businessMobileNumber : joi.string().required(),
            address : joi.string().required(),
            latitude : joi.number().required(),
            longitude : joi.number().required(),
            // city : joi.string().required(),
            // state : joi.string().required(),
            // zipCode : joi.string().required(),
            mailingAddress : joi.string().required(),
            // mailingCity : joi.string().required(),
            // mailingState : joi.string().required(),
            // mailingZipCode : joi.string().required(),
            apartmentNumber : joi.string().allow(''),
            patrollingDistanceToCover : joi.string().required(),
            stateLicenseNumber : joi.string().allow(''),
            role: joi.string().required(),
            isManager: joi.required(),
            isPatroller: joi.required(),
            recaptchaReactive: joi.string()
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    guestSignup: (body)=>{
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            mobileNumber : joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    validateOtpProcess: (body)=>{
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            mobileNumber : joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    createUser: (body)=>{
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            countryCode : joi.string().required(),
            mobileNumber : joi.string().required(),
            role: joi.string().required(),
            isManager: joi.required(),
            // address: joi.string().required(),
            // city: joi.string().required(),
            // state: joi.string().required(),
            // zipcode: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    createManager: (body)=>{
        const schema = joi.object().keys({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            countryCode : joi.string().required(),
            mobileNumber : joi.string().required(),
            role: joi.string().required(),
            isManager: joi.required(),
            // address: joi.string().required(),
            // city: joi.string().required(),
            // state: joi.string().required(),
            // zipcode: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    createPatroller: (body)=>{
        const schema = joi.object().keys({
            companyName: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required().trim(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
            companyEmail: joi.string().email().trim().allow(''),
            countryCode : joi.string().required(),
            mobileNumber : joi.string().required(),
            businessCountryCode : joi.string().required(),
            businessMobileNumber : joi.string().required(),
            address : joi.string().required(),
            latitude : joi.number().required(),
            longitude : joi.number().required(),
            mailingAddress : joi.string().required(),
            apartmentNumber : joi.string().allow(''),
            patrollingDistanceToCover : joi.string().required(),
            stateLicenseNumber : joi.string().allow(''),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },

    verify: (body)=>{
        const schema = joi.object().keys({
            jpn: joi.string().required(),
            etl: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    signIn: (body)=>{
        const schema = joi.object().keys({
            email: joi.string().email().required().trim(),
            password: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    forgotPassword: (body)=>{
        const schema = joi.object().keys({
            email: joi.string().email().required().trim()
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    setPassword: (body)=>{
        const schema = joi.object().keys({
            jpn: joi.string().required(),
            etl: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    postSetPassword: (body)=>{
        const schema = joi.object().keys({
            email: joi.string().required(),
            password: joi.string().required().regex(constant.regEx.passwordRegEx),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    changePassword: (body)=>{
        const schema = joi.object().keys({
            currentPassword: joi.string().required(),
            newPassword: joi.string().required().regex(constant.regEx.passwordRegEx),
            confirmNewPassword: joi.string().required().regex(constant.regEx.passwordRegEx),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateId: (body)=>{
        const schema = joi.object().keys({
            id: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateIdAndDate: (body)=>{
        const schema = joi.object().keys({
            id: joi.string().required(),
            date: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateParkingLot: (body)=>{
        const schema = joi.object().keys({
            manager: joi.string(),
            parkingLotName: joi.string().required(),
            latitude: joi.required(),
            longitude: joi.required(),
            address: joi.string().required(),
            // zone: joi.string().required(),
            totalSpaces: joi.string().required(),
            parkingFee: joi.number().required(),
            convenienceFee: joi.number().required(),
            maxHours: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateLatitudeLongitude: (body)=>{
        const schema = joi.object().keys({
            page: joi.string().required(),
            perPage: joi.string().required(),
            latitude: joi.string().required(),
            longitude: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateLatitudeLongitudeForLocation: (body)=>{
        const schema = joi.object().keys({
            // page: joi.string().required(),
            // perPage: joi.string().required(),
            latitude: joi.string().required(),
            longitude: joi.string().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    },
    validateTaxRates: (body)=>{
        const schema = joi.object().keys({
            _id: joi.string().required(),
            stateColorado: joi.number().required(),
            countryEagle: joi.number().required(),
            cityAvon: joi.number().required(),
            specialDistrict: joi.number().required(),
        });
        const { value, error } = joi.validate(body, schema, { abortEarly: false });
        if(error && error.details){
            return { error };
        }
        else{
            return { value };
        }
    }
}

module.exports = validate;
