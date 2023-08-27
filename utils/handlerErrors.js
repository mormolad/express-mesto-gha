const errStatus = require("../errors");

const createErr = (statusCode, message) => {
  throw new Error(JSON.stringify({ code: statusCode, message }));
};

const sendErr = (err, res) => {
  console.log(err.code);
  if (typeof err.message === "string") {
    return res
      .status(JSON.parse(err.message).code)
      .send({ message: JSON.parse(err.message).message });
  } else if (err.name === "CastError") {
    return res.status(err.code).send({
      message: "заглушка, что то вроде не валидно, но надо проверить",
    });
  } else if (err.code) {
    return res.status(err.code).send({ message: err.message.message });
  } else if (err.value === "6") {
    res.status(err.code).send({ message: "заглушка, что то с валуе 6" });
  } else if (err.name === "ValidationError") {
    res
      .status(noValid.code)
      .send({ message: "заглушка, что то не завалидировалось" });
  } else {
    res.status(errorServer.code).send({ message: err });
  }
};

module.exports = {
  createErr,
  sendErr,
};
