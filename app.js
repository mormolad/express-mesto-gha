const express = require("express");
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

// function sendError(err, req, res, next) {
//    console.log("блок поиска ошибок, код ошибки = ", err, "/n конец ошибки");
//   if (err.statusCode) {
//     return res.status(err.statusCode).send({ message: err.message });
//   } else if (err.name === "CastError") {
//     return res.status(err.code).send({
//       message: "заглушка, что то вроде не валидно, но надо проверить",
//     });
//   } else if (err.code) {
//     return res
//       .status(409)
//       .send({ message: "пользователь с таким емайлом существует" });
//   } else if (err.value === "6") {
//     res.status(403).send({ message: "заглушка, что то с валуе 6" });
//   } else if (err.name === "ValidationError") {
//     console.log(err);
//     res.status(403).send({ message: "заглушка, что то не завалидировалось" });
//   } else {
//     res.status(500).send({ message: err });
//   }
// }
