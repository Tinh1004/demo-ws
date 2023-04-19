const mongoose = require("mongoose");

const tokenNotifySchema = new mongoose.Schema(
  {
    token: String,
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tokenNotify", tokenNotifySchema);
