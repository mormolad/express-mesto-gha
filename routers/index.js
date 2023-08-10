const router = require("express").Router();
const { getPage } = require("../controllers/index");

router.get("/*", getPage); // отдать коллекцию карт
module.exports = router;
