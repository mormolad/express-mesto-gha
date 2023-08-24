const bcrypt = require("bcryptjs");
const { getJWT } = require("../utils/jwt");
const UserModel = require("../models/user");
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email или парль не могут быть пустыми" });
  }

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(403).send({
          message: "Такого пользователя не существует",
        });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);
        }
        return result
          ? res.status(200).send({ message: getJWT(user._id) })
          : res.status(401).send({
              message: "Пароль не верный",
            });
      });
    })
    .catch((err) => {
      return res.status(401).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email или парль не могут быть пустыми" });
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
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
        });
      } else if (err.code === 11000) {
        return res.status(409).send({
          message: "Такой пользователь существует",
        });
      }
      return res.status(500).send({ message: "ошибка сервера" });
    });
};

module.exports = {
  createUser,
  login,
};
