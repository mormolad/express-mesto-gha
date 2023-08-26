const bcrypt = require("bcryptjs");
const { getJWT } = require("../utils/jwt");
const UserModel = require("../models/user");
const { createErr, sendErr } = require("../utils/handlerErrors");
const { emptyField, errLogin } = require("../errors");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    createErr(emptyField.code, emptyField.message);
  }
  UserModel.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        createErr(errLogin.code, errLogin.message);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          createErr(410, err); // debug
        }
        return result
          ? res.status(200).send({ message: getJWT(user._id) })
          : createErr(errLogin.code, errLogin.message);
      });
    })
    .catch((err) => {
      sendErr(err, res);
    });
};

const createUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    createErr(errLogin.code, errLogin.message);
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return UserModel.create({ email, password: hash });
    })
    .then((_id) => {
      return res.status(201).send(_id);
    })
    .catch((err) => {
      sendErr(err, res);
    });
};

module.exports = {
  createUser,
  login,
};
