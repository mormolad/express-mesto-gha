const routerUser = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/me", getCurrentUser);
routerUser.get(
  "/users/:userId",
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);
routerUser.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      about: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
routerUser.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
      ),
    }),
  }),
  updateAvatar,
);
module.exports = routerUser;
