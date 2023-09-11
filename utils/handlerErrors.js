class CustomeError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function sendError(err, req, res) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(err.code).send({
      message: "переданные данные не валидны",
    });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .send({ message: "пользователь с таким емайлом существует" });
  }
  if (err.value === "6") {
    res.status(403).send({ message: "нет права доступа" });
  } else if (err.name === "ValidationError") {
    res.status(400).send({ message: "переданные данные не валидны" });
  } else {
    res.status(500).send({ message: err });
  }
}

module.exports = {
  CustomeError,
  sendError,
};
