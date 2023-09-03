const routerUser = require("express").Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/me", getCurrentUser);
routerUser.get("/users/:userId", getUserById);
routerUser.patch("/users/me", updateProfile);
routerUser.patch("/users/me/avatar", updateAvatar);
module.exports = routerUser;
