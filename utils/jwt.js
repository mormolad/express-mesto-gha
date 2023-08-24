const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { SECRET_KEY = "secret" } = process.env;

const getJWT = (payload) => {
  return jwt.sign({ _id: payload }, SECRET_KEY, {
    expiresIn: "7d",
  });
};

const isJWT = (token) => {
  return jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) return false;
    return UserModel.findById(decoded._id)
      .then((user) => {
        return Boolean(user);
      })
      .catch((err) => false);
  });
};

const getPayload = (token) => {
  return jwt.verify(token, SECRET_KEY, function (err, decoded) {
    return decoded;
  });
};

module.exports = {
  getJWT,
  isJWT,
  getPayload,
};
