const { isJWT, getPayload } = require("../utils/jwt");
const { CustomeError } = require("../utils/handlerErrors");
const { errLogin, noAuth } = require("../errors");
const auth = (req, res, next) => {
  console.log("wtf");
  if (req.headers.authorization) {
    isJWT(req.headers.authorization)
      ? (req.user = { _id: getPayload(req.headers.authorization)._id })
      : next(new CustomeError(errLogin.code, errLogin.message));
  } else {
    next(new CustomeError(noAuth.code, noAuth.message));
  }
  next();
};

module.exports = auth;
