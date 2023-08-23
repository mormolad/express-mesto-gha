const UserModel = require("../models/user");
const { noValid, noFind, errorServer } = require("../errors");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => res.status(errorServer.code).send(errorServer.message));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(noFind.code).send({ message: noFind.message });
      }
      return res.status(200).send({ message: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        console.log(noValid.code);
        res.status(noValid.code).send({ message: noValid.message });
      } else if (err.value === "6") {
        console.log(noFind.code);
        res.status(noFind.code).send({ message: noFind.message });
      } else {
        res.status(errorServer.code).send({ message: err });
      }
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
    .then(({ _id }) => {
      return res.status(201).send(_id);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
        });
      } else if (err.code === 11000) {
        return res.status(409).send({
          message: "Такой пользователь существует",
        });
      }
      return res.status(errorServer.code).send(errorServer.message);
    });
};

const updateProfile = (req, res) => {
  return UserModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        return res.status(200).send({ message: user });
      } else {
        return res.status(noFind.code).send({ message: noFind.message });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
        });
      } else {
        return res.status(errorServer.code).send(errorServer.message);
      }
    });
};
const updateAvatar = (req, res) => {
  return UserModel.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(noFind.code).send({ message: noFind.message });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
        });
      } else {
        return res.status(errorServer.code).send(errorServer.message);
      }
    });
};

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
      console.log(password, user);
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(err);
        result
          ? res.status(200).send({
              message: jwt.sign({ data: email }, "secret", {
                expiresIn: "7d",
              }),
            })
          : res.status(noValid.code).send({
              message: "Пароль не верный",
            });
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
