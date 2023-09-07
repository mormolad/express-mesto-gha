const errDate = require("../errors");

class CustomeError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const sendErr = (err, res) => {
  // console.log("блок поиска ошибок, код ошибки = ", err, "/n конец ошибки");

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  } else if (err.name === "CastError") {
    return res.status(err.code).send({
      message: "заглушка, что то вроде не валидно, но надо проверить",
    });
  } else if (err.code) {
    console.log({ message: "пользователь с таким емайлом существует" });
    return res
      .status(409)
      .send({ message: "пользователь с таким емайлом существует" });
  } else if (err.value === "6") {
    res.status(403).send({ message: "заглушка, что то с валуе 6" });
  } else if (err.name === "ValidationError") {
    res.status(403).send({ message: "заглушка, что то не завалидировалось" });
  } else {
    res.status(500).send({ message: err });
  }
};

module.exports = {
  CustomeError,
  sendErr,
};
