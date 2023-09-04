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
