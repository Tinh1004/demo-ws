const mongoose = require("mongoose");

const tokenNotifySchema = new mongoose.Schema(
  {
    token: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tokenNotify", tokenNotifySchema);
