const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    AntiFire: {
      PPM: Number,
      Status: String,
    },
    AntiTheft: {
      Status: String,
      Times: Number,
    },
    Humidity: {
      Data: Number,
    },
    Led: {
      Status: Number,
    },
    RainAlarm: {
      Status: String,
    },
    Temperature: {
      Data: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("drive", driveSchema);
