const Joi = require("joi");

// Validator for UPDATE USER FUNCTION
module.exports.updateUser = async (request, response, next) => {
    let rules = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
        status: Joi.number().required()
    });

    const { error } = rules.validate(request.body);
    if (error) {
        return response
            .status(422)
            .json({ status: false, message: error, data: null });
    } else {
        return next();
    }
};

// Validator for GET USER LIST FUNCTION
module.exports.getUsersList = (request, response, next) => {
    let rules = Joi.object().keys({
        page: Joi.number().required(),
        sizePerPage: Joi.number().required(),
        search: Joi.string(),
    });
    const { error } = rules.validate(request.query);
    if (error) {
        return response
            .status(422)
            .json({ status: false, message: error, data: null });
    } else {
        return next();
    }
};