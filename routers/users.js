const routerUser = require("express").Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUsers,
} = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/me", getCurrentUsers);
routerUser.get("/users/:userId", getUserById);
routerUser.patch("/users/me", updateProfile);
routerUser.patch("/users/me/avatar", updateAvatar);
module.exports = routerUser;
