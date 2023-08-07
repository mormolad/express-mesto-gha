const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routerUser = require("./routers/users");
const routerCard = require("./routers/card");
const bodyParser = require("body-parser");
// подключаемся к серверу mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  });
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  req.user = {
    _id: "64d090499ab4855193d2f119", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(routerUser);
app.use(routerCard);

app.listen(PORT, () => {
  console.log("server start, listen port: 3000");
});
