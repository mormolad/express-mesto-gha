const router = require("express").Router();
const { getPage } = require("../controllers/index");

router.all("/*", getPage); // страница не наёдена
module.exports = router;
