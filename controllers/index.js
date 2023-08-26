const { noFindRout } = require("../errors");
const dotenv = require("dotenv").config();
const { sendErr } = require("../utils/handlerErrors");
const getPage = (req, res) => {
  sendErr(noFindRout.code, noFindRout.message);
};

module.exports = {
  getPage,
};
