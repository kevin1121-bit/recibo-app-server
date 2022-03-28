const mongoose = require("mongoose");

function restaDays(days) {
  let date = new Date();
  const dateNew = date.setDate(date.getDate() - days);
  if (dateNew) {
    return dateNew;
  }
}

const schema = mongoose.Schema({
  idPublic: { type: String },
  consecutive: { type: Number, required: true },
  title: { type: String, maxlength: 100, minLength: 3, required: true },
  peso: { type: Number, trim: true },
  createDate: { type: Date, default: Date.now() },
  price: { type: Number, required: true, trim: true },
  unitPrice: { type: Number, trim: true },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
  address: { type: String },
  isModifiedReceipt: { type: Boolean, default: false },
  personModified: { type: mongoose.Schema.Types.ObjectId, ref: "person" },
  dateModified: { type: Date },
});

module.exports = mongoose.model("receipt", schema);
