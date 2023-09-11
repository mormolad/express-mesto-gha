/*const dotenv = require("dotenv").config();*/
const { noFindRout } = require("../errors");
const { CustomeError } = require("../utils/handlerErrors");

const getPage = (req, res, next) =>
  next(new CustomeError(noFindRout.code, noFindRout.message));

module.exports = {
  getPage,
};
