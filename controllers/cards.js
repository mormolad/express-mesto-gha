const CardModel = require("../models/card");
const { noValid, noFind, errorServer } = require("../errors");

const getCards = (req, res) => {
  return CardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(errorServer.code)
        .send({ message: errorServer.message });
    });
};

const deleteCard = (req, res) => {
  return CardModel.findOneAndRemove({
    $and: [{ _id: req.params.cardId }, { owner: req.user._id }],
  })
    .then((card) => {
      if (!card) {
        return res.status(noFind.code).send({ message: noFind.message });
      }
      return res.status(200).send({ message: card });
    })
    .catch((err) => {
      err.valueType != "ObjectId"
        ? res.status(noValid.code).send({ message: noValid.message })
        : res.status(errorServer.code).send({ message: errorServer.message });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  return CardModel.create({ name, link, owner: req.user._id })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res.status(noValid.code).send({
          message: noValid.message,
        });
      }
      return res.status(errorServer.code).send(errorServer.message);
    });
};

const deleteLike = (req, res) => {
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ message: card.likes });
      } else {
        return res.status(noFind.code).send({ message: noFind.message });
      }
    })
    .catch((err) => {
      err.valueType != "ObjectId"
        ? res.status(noValid.code).send({ message: noValid.message })
        : res.status(errorServer.code).send({ message: errorServer.message });
    });
};

const putLike = (req, res) => {
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(noFind.code).send({ message: noFind.message });
      }
      return res.status(200).send({ message: card.likes });
    })
    .catch((err) => {
      console.log(err);
      err.valueType != "ObjectId"
        ? res.status(noValid.code).send({ message: noValid.message })
        : res.status(errorServer.code).send({ message: errorServer.message });
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
};
