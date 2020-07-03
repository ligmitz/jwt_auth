const joi = require('@hapi/joi');

const validateRegister = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data);
}

const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;