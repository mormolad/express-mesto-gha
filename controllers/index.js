const { noValid, noFind, errorServer } = require("../errors");
const dotenv = require("dotenv").config();

const getPage = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => res.status(errorServer.code).send(errorServer.message));
};

module.exports = {
  getPage,
};
