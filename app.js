const express = require("express");
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.get("/", () => console.log("server start GET geting"));

app.listen(PORT, () => {
  console.log("server start");
  console.log("server start");
});
