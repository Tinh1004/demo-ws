const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    token: String,
    title: String,
    body: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notify", notifySchema);
