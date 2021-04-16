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
    }
}

module.exports = validate;
