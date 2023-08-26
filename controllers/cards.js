const CardModel = require("../models/card");
const { createErr, sendErr } = require("../utils/handlerErrors");
const { noFindCard } = require("../errors");

const getCards = (req, res) => {
  return CardModel.find()
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => send(err, res));
};

const deleteCard = (req, res) => {
  return CardModel.findOneAndRemove({
    $and: [{ _id: req.params.cardId }, { owner: req.user._id }],
  })
    .then((card) => {
      if (!card) {
        createErr(noFindCard.code, noFindCard.message);
      }
      return res.status(200).send({ message: card });
    })
    .catch((err) => sendErr(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  return CardModel.create({ name, link, owner: req.user._id })
    .then((card) => {
      return res.status(201).send(card);
    })
    .catch((err) => sendErr(err, res));
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
        createErr(noFindCard.code, noFindCard.message);
      }
    })
    .catch((err) => sendErr(err, res));
};

const putLike = (req, res) => {
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return createErr(noFindCard.code, noFindCard.message);
      }
      return res.status(200).send({ message: card.likes });
    })
    .catch((err) => sendErr(err, res));
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
};
