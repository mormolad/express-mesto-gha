const routerUser = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/:userId", getUserById);
routerUser.post("/signup", createUser);
routerUser.post("/signin", login);
routerUser.patch("/users/me", updateProfile);
routerUser.patch("/users/me/avatar", updateAvatar);
module.exports = routerUser;
