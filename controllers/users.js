const UserModel = require("../models/user");
const { CustomeError } = require("../utils/handlerErrors");
const { noFindUser } = require("../errors");

const getUsers = (req, res, next) =>
  UserModel.find()
    .then((users) => {
      res.status(200).send({ message: users });
    })
    .catch(next);

const updateProfile = (req, res, next) =>
  UserModel.findByIdAndUpdate(
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
      }
      throw new CustomeError(noFindUser.code, noFindUser.message);
    })
    .catch(next);
const updateAvatar = (req, res, next) =>
  UserModel.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        throw new CustomeError(noFindUser.code, noFindUser.message);
      }
      return res.status(200).send({ message: user });
    })
    .catch(next);

const getUser = (userId, res, next) =>
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new CustomeError(noFindUser.code, noFindUser.message);
      }
      return res.status(200).send({ message: user });
    })
    .catch(next);

const getCurrentUser = (req, res, next) => {
  getUser(req.user._id, res, next);
};

const getUserById = (req, res, next) => {
  getUser(req.params.userId, res, next);
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
