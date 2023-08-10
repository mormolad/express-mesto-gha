const mongoose = require("mongoose");

// напишите код здесь
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      // опишем свойство validate
      validator(value) {
        // validator - функция проверки данных. v - значение свойства age
        const regex =
          /^http[s]?:\/\/[a-zA-Z\d.-]+[:]?[\d]{0,4}[\/]?[a-zA-Z\d\/-]+/;
        const result = regex.test(value);
        return result; // если возраст меньше 18, вернётся false
      },
      message: "Вам должно быть больше 18 лет!", // когда validator вернёт false, будет использовано это сообщение
    },
  },
});
module.exports = mongoose.model("user", userSchema);
