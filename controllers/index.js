const { noFindRout } = require("../errors");
const dotenv = require("dotenv").config();
const { CustomeError } = require("../utils/handlerErrors");
const getPage = (req, res, next) => {
  return next(new CustomeError(noFindRout.code, noFindRout.message));
};

module.exports = {
  getPage,
};
