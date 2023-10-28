const Joi = require("joi");

module.exports.login = async (request, response, next) => {
  let rules = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
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

module.exports.register = async (request, response, next) => {
  let rules = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobile: Joi.string().required(),
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
