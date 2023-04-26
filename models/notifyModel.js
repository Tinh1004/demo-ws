const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    image: String,
    status: { type: String, enum: ["0", "1", "2", "3", "4"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notify", notifySchema);
