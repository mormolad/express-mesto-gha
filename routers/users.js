const routerUser = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");

routerUser.get("/users", getUsers);
routerUser.get("/users/:userId", getUserById);
routerUser.post("/users", createUser);
module.exports = routerUser;
