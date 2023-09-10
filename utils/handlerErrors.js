const errDate = require("../errors");

class CustomeError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function sendError(err, req, res, next) {
  console.log("блок поиска ошибок, код ошибки = ", err, "/n конец ошибки");
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  } else if (err.name === "CastError") {
    return res.status(err.code).send({
      message: "переданные данные не валидны",
    });
  } else if (err.code === 11000) {
    return res
      .status(409)
      .send({ message: "пользователь с таким емайлом существует" });
  } else if (err.value === "6") {
    res.status(403).send({ message: "нет права доступа" });
  } else if (err.name === "ValidationError") {
    console.log(err);
    res.status(400).send({ message: "переданные данные не валидны" });
  } else {
    res.status(500).send({ message: err });
  }
}

module.exports = {
  CustomeError,
  sendError,
};
