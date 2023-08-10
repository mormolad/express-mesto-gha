const router = require("express").Router();
const { getPage } = require("../controllers/index");

router.patch("/*", getPage); // отдать коллекцию карт
module.exports = router;
