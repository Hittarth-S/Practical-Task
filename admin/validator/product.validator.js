const Joi = require("joi");

/* Import File Validation Function */
const { imageValidation } = require("../../helpers/file.validation");

// Validator for ADD PRODUCT FUNCTION
module.exports.addProduct = async (request, response, next) => {
    let rules = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
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

// Validator for UPDATE PRODUCT FUNCTION
module.exports.updateProduct = async (request, response, next) => {
    let rules = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        status: Joi.string().required().valid("active", "inactive", "comingSoon")
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

// Validator for ADD PRODUCT IMAGE FUNCTION
module.exports.addProductImage = (request, response, next) => {
    let rules = Joi.object().keys({
        id: Joi.string().required(),
    });
    const { error } = rules.validate(request.params);
    if (error) {
        return response
            .status(422)
            .json({ status: false, message: error, data: null });
    } else {

        if (
            request.files && request.files.image
        ) {

            

            const images = request.files.image;

            if (images.length == undefined && images.name.length > 1) {
                const imageValidationStatus = imageValidation(images);
                if (imageValidationStatus.status === false) {
                    return response
                        .status(422)
                        .json({
                            status: false,
                            message: imageValidationStatus.message,
                            data: null,
                        });
                }
                request.body.source = images;
                return next();
            } else {
                return response
                    .status(422)
                    .json({
                        status: false,
                        message: 'Image File not Supported',
                        data: null,
                    });
            }
        } else {
            // return next();
            return response
                .status(422)
                .json({
                    status: false,
                    message: 'Product Image Not Found',
                    data: null,
                });

        }
    }
};

// Validator for UPDATE PRODUCT IMAGE FUNCTION
module.exports.updateProductImage = (request, response, next) => {
    let rules = Joi.object().keys({
        id: Joi.string().required(),
        productImageId: Joi.string().required(),
    });
    const { error } = rules.validate(request.params);
    if (error) {
        return response
            .status(422)
            .json({ status: false, message: error, data: null });
    } else {

        if (
            request.files && request.files.image
        ) {


            const images = request.files.image;

            if (images.length == undefined && images.name.length > 1) {
                const imageValidationStatus = imageValidation(images);
                if (imageValidationStatus.status === false) {
                    return response
                        .status(422)
                        .json({
                            status: false,
                            message: imageValidationStatus.message,
                            data: null,
                        });
                }
                request.body.source = images;
                return next();
            } else {
                return response
                    .status(422)
                    .json({
                        status: false,
                        message: 'Image File not Supported',
                        data: null,
                    });
            }
        } else {
            // return next();
            return response
                .status(422)
                .json({
                    status: false,
                    message: 'Product Image Not Found',
                    data: null,
                });

        }
    }
};

// Validator for DELETE PRODUCT IMAGE FUNCTION
module.exports.deleteProductImage = (request, response, next) => {
    let rules = Joi.object().keys({
        id: Joi.string().required(),
        productImageId: Joi.string().required(),
    });
    const { error } = rules.validate(request.params);
    if (error) {
        return response
            .status(422)
            .json({ status: false, message: error, data: null });
    } else {
        return next();
    }
};