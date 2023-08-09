const CardModel = require("../models/card");
const { noValid, noFind, errorServer } = require("../errors");

const getCards = (req, res) => {
  return CardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => res.status(500).send("Server Error"));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  return CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card not found" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      res.status(errorServer.code).send(errorServer.message);
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
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
        });
      }
      if (err.name === "CastError") {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(", ")}`,
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
        console.log(card, "code=200");
        return res.status(200).send({ message: card.likes });
      } else {
        console.log(card, "code=404");
        return res.status(noFind.code).send({ message: noFind.message });
      }
    })
    .catch((err) => {
      console.log(err.valueType);
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
        return rres.status(noFind.code).send({ message: noFinds.message });
      }
      return res.status(200).send({ message: card.likes });
    })
    .catch((err) => {
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
