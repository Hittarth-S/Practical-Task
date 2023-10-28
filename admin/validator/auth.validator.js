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
    // role: Joi.string().required().valid("ADMIN", "SUPER-ADMIN"),
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

module.exports.changePassword = (request, response, next) => {
  let rules = Joi.object().keys({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required(),
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

module.exports.getAdminList = (request, response, next) => {
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

module.exports.userPass = async (request, response, next) => {
  let rules = Joi.object().keys({
    password: Joi.string().required(),
  });

  const { error } = rules.validate(request.body);

  rules = Joi.object().keys({
    id: Joi.string.required(),
  });

  const { error2 } = rules.validate(request.params);

  if (error) {
    return response
      .status(422)
      .json({ status: false, message: error, data: null });
  } else if (error2) {
    return response
      .status(422)
      .json({ status: false, message: error2, data: null });
  } else {
    return next();
  }
};
