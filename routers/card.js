const routerCard = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

routerCard.get("/cards", getCards); // отдать коллекцию карт
// удалить карточку
routerCard.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard
);
// добавить карточку
routerCard.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(
          /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
        ),
    }),
  }),
  createCard
);
// поставить лайк карточке
routerCard.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  putLike
);

routerCard.delete(
  // убрать лайк с карточки
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLike
);
module.exports = routerCard;
