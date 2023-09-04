const routerAuth = require("express").Router();
const { createUser, login } = require("../controllers/auth");
const { celebrate, Joi } = require("celebrate");

routerAuth.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .min(2)
        .max(30),
      password: Joi.string().required().min(2),
      about: Joi.string().min(2).max(30),
      name: Joi.string().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(
          /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/
        ),
    }),
  }),
  createUser
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
  login
);

module.exports = routerAuth;
