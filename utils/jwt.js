const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv").config();
const UserModel = require("../models/user");

const { SECRET_KEY = "secret" } = process.env;

const getJWT = (payload) =>
  jwt.sign({ _id: payload }, SECRET_KEY, {
    expiresIn: "7d",
  });

const isJWT = (token) =>
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return false;
    return UserModel.findById(decoded._id)
      .then((user) =>
        Boolean(user))
      .catch(() =>
        false);
  });

const getPayload = (token) =>
  jwt.verify(token, SECRET_KEY, (err, decoded) =>
    decoded);

module.exports = {
  getJWT,
  isJWT,
  getPayload,
};
