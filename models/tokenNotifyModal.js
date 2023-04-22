const mongoose = require("mongoose");

const tokenNotifySchema = new mongoose.Schema(
  {
    token: String,
    isNotifyAntiTheft: {
      type: Boolean,
      default: true,
    },
    isNotifyWarningTemp: {
      type: Boolean,
      default: true,
    },
    isNotifyAntiFire: {
      type: Boolean,
      default: true,
    },
    isNotifyRainAlarm: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tokenNotify", tokenNotifySchema);
