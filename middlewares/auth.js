const { isJWT, getPayload } = require("../utils/jwt");
const { CustomeError } = require("../utils/handlerErrors");
const { errLogin } = require("../errors");
const { celebrate, Joi } = require("celebrate");
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    isJWT(req.headers.authorization)
      ? (req.user = { _id: getPayload(req.headers.authorization)._id })
      : next(new CustomeError(errLogin.code, errLogin.message));
  } else {
    next(new CustomeError(errLogin.code, errLogin.message));
  }
  next();
};

module.exports = auth;
