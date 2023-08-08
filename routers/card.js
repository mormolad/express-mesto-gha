const routerCard = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
} = require("../controllers/cards");

routerCard.get("/cards", getCards); // отдать коллекцию карт
routerCard.delete("/cards/:cardId", deleteCard); // удалить карточку
routerCard.post("/cards", createCard); // добавить карточку
routerCard.put("/cards/:cardId/likes", putLike); //поставить лайк карточке
routerCard.delete("/cards/:cardId/likes", deleteLike); // убрать лайк с карточки
module.exports = routerCard;
