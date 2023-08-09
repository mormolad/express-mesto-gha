module.exports = {
  noValid: {
    code: 400,
    message: "Переданы некорректные данные в методы создания",
  },
  noFind: {
    code: 404,
    message:
      "Карточка или пользователь не найден или был запрошен несуществующий роут",
  },

  errorServer: {
    code: 500,
    message: "На сервере произошла ошибка».",
  },
};