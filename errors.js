module.exports = {
  noValid: {
    code: 400,
    message: "Переданы некорректные данные",
  },

  emptyField: {
    code: 400,
    message: "Email или парль не могут быть пустыми",
  },

  noAuth: {
    code: 401,
    message: "Необходима авторизация",
  },

  errLogin: {
    code: 401,
    message: "Пароль или email не верные",
  },

  noFindUser: {
    code: 404,
    message: "Пользователь не найден",
  },

  noFindCard: {
    code: 404,
    message: "Карточка мета не найдена",
  },

  noFindRout: {
    code: 404,
    message: "Страница не найдена",
  },

  noValidEmail: {
    code: 409,
    message: "Пользователь с таким email уже зарегистрирован",
  },

  errServer: {
    code: 500,
    message: "На сервере произошла ошибка",
  },
};
