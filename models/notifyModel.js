const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    status: { type: String, enum: ["1", "2", "3", "4"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notify", notifySchema);
