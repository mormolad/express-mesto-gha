const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routerUser = require("./routers/users");
const routerCard = require("./routers/card");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
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
app.use((req, res, next) => {
  req.user = {
    _id: "64d3114194dcd8b1b443a367", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(routerUser);
app.use(routerCard);

app.listen(PORT, () => {
  console.log(`server start, listen port: ${PORT}`);
});
