const { noFindRout } = require("../errors");
const dotenv = require("dotenv").config();
const getPage = (req, res) => {
  res.status(noFindRout.code).send({
    message: noFindRout.message,
  });
};

module.exports = {
  getPage,
};
