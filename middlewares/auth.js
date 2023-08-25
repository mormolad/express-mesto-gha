const { isJWT, getPayload } = require("../utils/jwt");

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    isJWT(req.headers.authorization)
      ? (req.user = { _id: getPayload(req.headers.authorization)._id })
      : res.status(401).send({ message: "Необходима авторизация" });
  } else {
    return res.status(401).send({ message: "Необходима авторизация" });
  }
  next();
};

module.exports = auth;
