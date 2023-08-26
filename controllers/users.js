const UserModel = require("../models/user");
const { createErr, sendErr } = require("../utils/handlerErrors");
const { noFindUser } = require("../errors");
const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => {
      return sendErr(err, res);
    });
};

const getCurrentUsers = (req, res) => {
  return getUser(req.user._id, res);
};

const getUserById = (req, res) => {
  return getUser(req.params.userId, res);
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
        createErr(noFindUser.code, noFindUser.message);
      }
    })
    .catch((err) => {
      console.log(err);
      sendErr(err, res);
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
        createErr(noFindUser.code, noFindUser.message);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      sendErr(err, res);
    });
};

const getUser = (userId, res) => {
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        createErr(noFindUser.code, noFindUser.message);
      }
      return res.status(200).send({ message: user });
    })
    .catch((err) => {
      sendErr(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUsers,
};
