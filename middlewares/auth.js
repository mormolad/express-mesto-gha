const { isJWT, getPayload } = require("../utils/jwt");
const { sendErr } = require("../utils/handlerErrors");
const { noAuth } = require("../errors");
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    isJWT(req.headers.authorization)
      ? (req.user = { _id: getPayload(req.headers.authorization)._id })
      : sendErr({ code: noAuth.code, message: noAuth.message }, res);
  } else {
    return sendErr({ code: noAuth.code, message: noAuth.message }, res);
  }
  next();
};

module.exports = auth;
