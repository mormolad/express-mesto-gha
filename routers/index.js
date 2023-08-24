const router = require("express").Router();
const { getPage } = require("../controllers/index");

router.patch("/*", getPage); // страница не наёдена
module.exports = router;
