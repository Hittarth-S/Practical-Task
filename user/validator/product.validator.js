const Joi = require("joi");

// Validator for GET PRODUCT LIST FUNCTION
module.exports.getProductList = (request, response, next) => {
    let rules = Joi.object().keys({
        page: Joi.number().required(),
        sizePerPage: Joi.number().required(),
        search: Joi.string(),
        status: Joi.string().valid("active", "inactive", "comingSoon")
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