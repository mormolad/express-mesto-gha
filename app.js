const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/users");
// подключаемся к серверу mongo
mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.get("/", () => console.log("server start GET geting"));

app.listen(PORT, () => {
  console.log("server start, listen port: 3000");
});
