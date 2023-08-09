const CardModel = require("../models/card");

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
      res.status(500).send("Server Error");
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
      return res.status(500).send("Server Error");
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;

  return CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card not found" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send("Server Error");
    });
};

const putLike = (req, res) => {
  console.log(req.params.cardId);
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Card not found" });
      }
      return res.status(200).send({ message: card });
    })
    .catch((err) => {
      res.status(500).send("Server Error");
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
};
