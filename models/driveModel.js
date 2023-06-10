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
      tang1: Number, defaultValue: 0, 
      tang2: Number, defaultValue: 0, 
      tang3: Number, defaultValue: 0, 
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
