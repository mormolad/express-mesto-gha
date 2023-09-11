const bcrypt = require("bcryptjs");
const { getJWT } = require("../utils/jwt");
const UserModel = require("../models/user");
const { CustomeError } = require("../utils/handlerErrors");
const { emptyField, errLogin } = require("../errors");

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomeError(emptyField.code, emptyField.message);
  }
  UserModel.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new CustomeError(errLogin.code, errLogin.message));
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return next(new CustomeError(errLogin.code, errLogin.message));
        }
        if (!result) {
          return next(new CustomeError(errLogin.code, errLogin.message));
        }
        return res.status(200).send({ message: getJWT(user._id) });
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  if (!email || !password) {
    throw new CustomeError(errLogin.code, errLogin.message);
  }
  bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => {
        const userRes = user.toObject();
        delete userRes.password;
        return res.status(201).send({ userRes });
      })
      .catch(next);
  });
};

module.exports = {
  createUser,
  login,
};
