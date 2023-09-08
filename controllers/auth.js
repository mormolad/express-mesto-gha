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
        throw new CustomeError(errLogin.code, errLogin.message);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log("err login", err);
          throw new CustomeError(errLogin.code, errLogin.message);
        }

        if (!result) {
          console.log("result mast true", result);
          throw new CustomeError(errLogin.code, errLogin.message);
        }
        console.log(getJWT(user._id));
        return res.status(200).send({ message: getJWT(user._id) });
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomeError(errLogin.code, errLogin.message);
  }
  bcrypt.hash(password, 10).then((hash) => {
    UserModel.create({ email, password: hash })
      .then((user) => {
        const { email, name, about, avatar } = user;
        return res
          .status(201)
          .send({ message: { email, name, about, avatar } });
      })
      .catch(next);
  });
};

module.exports = {
  createUser,
  login,
};
