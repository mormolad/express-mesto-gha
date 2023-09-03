const { isJWT, getPayload } = require("../utils/jwt");
const { CustomeError } = require("../utils/handlerErrors");
const { noAuth } = require("../errors");
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    isJWT(req.headers.authorization)
      ? (req.user = { _id: getPayload(req.headers.authorization)._id })
      : next(new CustomeError(noAuth.code, noAuth.message));
  } else {
    next(new CustomeError(noAuth.code, noAuth.message));
  }
  next();
};

module.exports = auth;
