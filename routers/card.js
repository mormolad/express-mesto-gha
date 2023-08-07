const routerCard = require("express").Router();
const { getCards, deleteCard, createCard } = require("../controllers/cards");

routerCard.get("/cards", getCards);
routerCard.delete("/cards/:cardId", deleteCard);
routerCard.post("/cards", createCard);

module.exports = routerCard;
