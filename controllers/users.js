const UserModel = require("../models/user");
const { noValid, noFind, errorServer } = require("../errors");

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
  const { name, about, avatar } = req.body;
  return UserModel.create({ name, about, avatar })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
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
    { new: true }
  )
    .then((user) => {
      console.log(user);
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
