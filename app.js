const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const routerUser = require("./routers/users");
const routerCard = require("./routers/card");
const routerAuth = require("./routers/auth");
const router = require("./routers/index");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const auth = require("./middlewares/auth");
const { errors } = require("celebrate");
const { sendError } = require("./utils/handlerErrors");
const { PORT = 3000, MONGODB_URL = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

// подключаемся к серверу mongo
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  });

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.disable("x-powered-by");
app.use(routerAuth);
app.use(auth);
app.use(routerUser);
app.use(routerCard);
app.use(router);
app.use(errors());
app.use(sendError);
app.listen(PORT, () => {
  console.log(`server start, listen port: ${PORT}`);
});
