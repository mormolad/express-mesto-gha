const UserModel = require("../models/user");
const { CustomeError } = require("../utils/handlerErrors");
const { noFindUser } = require("../errors");
const getUsers = (req, res, next) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send({ message: users });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  return getUser(req.user._id, res);
};

const getUserById = (req, res, next) => {
  return getUser(req.params.userId, res);
};

const updateProfile = (req, res, next) => {
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
        throw new CustomeError(noFindUser.code, noFindUser.message);
      }
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  return UserModel.findByIdAndUpdate(
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
};

const getUser = (userId, res, next) => {
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new CustomeError(404, "пользователь не найден");
      }
      return res.status(200).send({ message: user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
