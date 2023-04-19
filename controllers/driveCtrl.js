const Drives = require("../models/driveModel");
const TokenNotify = require("../models/tokenNotifyModal");
const _id = "643051e1e4e0a63785a4f537";

const io = require("../module_sokect");
const driveService = require("../services/drive.service");
const serviceFCM = require("../serviceFCM");
const token =
  "dUnTEoBPReyQgX_D4R7PLp:APA91bF19Pa7P6Daj2jrahaCEzpWGKu-aPWgLZmAvZFcEgqPWiQIHunE_MYUx2pzU7-o0hqRZ1W0zeK76JJJMM-83mneWy6mgn8wgEP4_XP5gRBKYnxiHIHB3qK-0G9OxDFBqzc-wMzW";
const driveCtrl = {
  getDrive: async (_, res) => {
    try {
      const drive = await Drives.findOne({ _id });
      res.status(200).json(drive);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDrive: async (req, res) => {
    try {
      const tokens = await TokenNotify.find();
      console.log("tokens: ", tokens);
      console.log(req.body);

      const { Humidity, Temperature, AntiFire, AntiTheft, RainAlarm, Led } =
        req.body;

      //  ws light
      wsTurnOffOnLightLed(Led.Status);

      const arrayError = {
        temp: false,
        antiFire: false,
        antiTheft: false,
        rainAlarm: false,
      };

      // check Temperature >= 50 warning send FCM
      if (Temperature.Data >= 50) {
        arrayError.temp = true;
      }

      // check device warning send FCM
      if (AntiFire.Status != "no") {
        arrayError.antiFire = true;
      }

      // check device warning send FCM
      if (AntiTheft.Status != "no") {
        arrayError.antiTheft = true;
      }

      //check device rain warning send FCM
      if (RainAlarm.Status != "no") {
        arrayError.rainAlarm = true;
      }

      //send message
      tokens.forEach((element) => {
        if (arrayError.temp) {
          sendMessageWarningTemp(element.token);
        }
        if (arrayError.antiFire) {
          sendMessageWarningAntiFire(element.token);
        }
        if (arrayError.antiTheft) {
          sendMessageWarningAntiTheft(element.token);
        }
        if (arrayError.rainAlarm) {
          sendMessageWarningRainAlarm(element.token);
        }
      });

      // ws temp and humi
      const data = { temp: Humidity.Data, humi: Temperature.Data };
      wsTurnOffOnLightLed(data);

      //update dive
      await Drives.updateOne({ _id }, { $set: req.body });
      res.status(200).json(req.body);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateLightStatus: async (req, res) => {
    try {
      const { Led } = req.body;
      console.log("new status", req.body);
      const drive = await Drives.updateOne({ _id }, { $set: req.body });
      wsTurnOffOnLightLed(Led.Status);
      return res.status(200).json(Led.Status);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDataTempHumi: async (req, res) => {
    try {
      const tokens = await TokenNotify.find();
      console.log("tokens: ", tokens);
      const { Humidity, Temperature } = req.body;
      console.log("new status", Temperature.Data);
      if (Temperature.Data >= 50) {
        tokens.forEach((element) => {
          sendMessageWarningTemp(element.token);
        });
      }
      const drive = await Drives.updateOne({ _id }, { $set: req.body });
      const data = { temp: Humidity.Data, humi: Temperature.Data };
      wsTurnOffOnLightLed(data);
      return res.status(200).json(req.body);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//Turn off/on light
function wsTurnOffOnLightLed(data) {
  io.emit("testLight", data);
}

//ws send realtime Temp and Humi
function wsTurnOffOnLightLed(data) {
  io.emit("testTemHumi", data);
}

// send FCM
function sendMessageWarningTemp(token) {
  sendMessage(token, "Cảnh Báo Nhiệt độ", "Nhiệt Độ quá cao!");
}

function sendMessageWarningAntiFire(token) {
  sendMessage(token, "Cảnh Báo AntiFire", "Waring AntiFire !!!");
}

function sendMessageWarningAntiTheft(token) {
  sendMessage(token, "Cảnh Báo AntiTheft", "Waring AntiTheft !!!");
}

function sendMessageWarningRainAlarm(token) {
  sendMessage(token, "Cảnh Báo RainAlarm", "Waring RainAlarm !!!");
}

function sendMessage(token, message, body) {
  serviceFCM.sendMessage(token, message, body);
  io.emit("serviceFCM", "serviceFCM");
}

module.exports = driveCtrl;
