const UserModel = require("../models/user");
const { noValid, noFind, errorServer } = require("../errors");
const user = require("../models/user");

const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => res.status(500).send({ message: err }));
};

const getCerrentUsers = (req, res) => {
  return getUser(req.user._id, res);
};

const getUserById = (req, res) => {
  return getUser(req.params, res);
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

const getUser = (userId, res) => {
  console.log(userId);
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "не найдено" });
      }
      return res.status(200).send({ message: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        res.status(noValid.code).send({ message: noValid.message });
      } else if (err.value === "6") {
        res.status(noFind.code).send({ message: noFind.message });
      } else {
        res.status(errorServer.code).send({ message: err });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCerrentUsers,
};
