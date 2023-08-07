const mongoose = require("mongoose");

// напишите код здесь
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: { type: String, required: true },
  owner: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("card", cardSchema);
