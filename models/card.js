const mongoose = require("mongoose");

// напишите код здесь
const cardSchema = new mongoose.Schema({
  name: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      // опишем свойство validate
      validator(value) {
        // validator - функция проверки данных. v - значение свойства age
        const regex = /^http[s]?:\/\/[a-zA-Z\d.-]+[:]?[\d]{0,4}[\/]?[a-zA-Z\d\/-]+/;
        const result = regex.test(value);
        return result; // если возраст меньше 18, вернётся false
      },
      message: "Введите коректный адрес фото", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("card", cardSchema);
