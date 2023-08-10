const { noFind } = require("../errors");
const dotenv = require("dotenv").config();

const getPage = (req, res) => {
  return res.status(noFind.code).send({ message: noFind.message });
};

module.exports = {
  getPage,
};
