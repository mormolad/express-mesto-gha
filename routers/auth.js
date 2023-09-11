const routerAuth = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser, login } = require("../controllers/auth");

routerAuth.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().required().min(2),
      about: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
      ),
    }),
  }),
  createUser,
);

routerAuth.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .min(2)
        .max(30),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);

module.exports = routerAuth;
