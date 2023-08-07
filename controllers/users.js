const UserModel = require("../models/user");

const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => res.status(500).send("Server Error"));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send("Server Error"));
};

const createUser = (req, res) => {
  console.log(req.body, " = body");
  const { name, about, avatar } = req.body;
  return UserModel.create({ name, about, avatar })
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
        });
      }
      if (err.name === "CastError") {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
        });
      }
      return res.status(500).send("Server Error");
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
