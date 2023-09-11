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
routerCard.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
); // удалить карточку
routerCard.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(
          /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
        ),
    }),
  }),
  createCard,
); // добавить карточку
routerCard.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  putLike,
); // поставить лайк карточке
routerCard.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLike,
); // убрать лайк с карточки
module.exports = routerCard;
