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
routerCard.delete("/cards/:cardId", deleteCard); // удалить карточку
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
); // добавить карточку
routerCard.put("/cards/:cardId/likes", putLike); //поставить лайк карточке
routerCard.delete("/cards/:cardId/likes", deleteLike); // убрать лайк с карточки
module.exports = routerCard;
