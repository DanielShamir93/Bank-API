const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  cash: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  credit: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
});

module.exports = model("User", userSchema);