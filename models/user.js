const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String, default: "Жак-Ив Кусто", minlength: 2, maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(url) {
        return validator.isURL(url); // если не url, вернётся false
      },
      message: "введите адрес аватара", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email); // если не email, вернётся false
      },
      message: "введите email", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(pass) {
        return validator.isStrongPassword(pass); // если пороль простой, вернётся false
      },
      message: "пороль не соответствует требованием безопасности", // когда validator вернёт false, будет использовано это сообщение
    },
  },
});
module.exports = mongoose.model("user", userSchema);
