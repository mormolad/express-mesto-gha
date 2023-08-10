const router = require("express").Router();
const { getPage } = require("../controllers/index");

routerCard.get("/*", getPage); // отдать коллекцию карт
module.exports = routerCard;
