const CardModel = require("../models/card");
const { CustomeError } = require("../utils/handlerErrors");
const { noFindCard } = require("../errors");

const getCards = (req, res, next) =>
  CardModel.find()
    .then((cards) => res.status(200).send({ message: cards }))
    .catch(next);

const deleteCard = (req, res, next) =>
  CardModel.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new CustomeError(noFindCard.code, noFindCard.message);
      } else if (card.owner === req.user._id) {
        CardModel.deleteOne({ _id: req.params.cardId }).then(() =>
          res.status(200).send({ message: card })
        );
      } else {
        throw new CustomeError(403, "нельзя удалить чужую катру");
      }
    })
    .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return CardModel.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new CustomeError(noFindCard.code, noFindCard.message);
      }
      return res.status(201).send({ message: card });
    })
    .catch(next);
};

const deleteLike = (req, res, next) =>
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send({ message: card });
      }
      throw new CustomeError(noFindCard.code, noFindCard.message);
    })
    .catch(next);

const putLike = (req, res, next) =>
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        throw new CustomeError(noFindCard.code, noFindCard.message);
      }
      return res.status(200).send({ message: card });
    })
    .catch(next);

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
};
