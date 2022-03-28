const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 100,
    minLength: 3,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    maxlength: 100,
    minLength: 3,
    required: true,
  },
});

schema.index({ username: "text" });

module.exports = mongoose.model("person", schema);
