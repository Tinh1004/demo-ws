const Drives = require("../models/driveModel");
const TokenNotify = require("../models/tokenNotifyModal");
const _id = "644401c5e40e6c272070c6bf";
const notifyService = require("../services/notify.servive");
const io = require("../module_sokect");
const serviceFCM = require("../serviceFCM");
const driveCtrl = {
  getDrive: async (_, res) => {
    try {
      const drive = await Drives.findOne({ _id });
      res.status(200).json(drive);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createDrive: async (req, res) => {
    try {
      const drive =  Drives(req.body);
      console.log(drive);
      const driveSave = drive.save();
      res.status(200).json(driveSave);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDrive: async (req, res) => {
    try {
      const tokens = await TokenNotify.find();
      console.log(req.body);
      const { Humidity, Temperature, AntiFire, AntiTheft, RainAlarm, Led } =
        req.body;
        console.log("Temperature.Data: ", Temperature.Data);
        console.log("Temperature  ", Temperature.Data >= 50);

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
        const object = {
          title: "Cảnh Báo Nhiệt độ",
          body: "Nhiệt Độ quá cao!",
          status: "4",
        };
        notifyService.createNotify(object);
      }
      // check device warning send FCM
      if (AntiFire.Status != "no" || AntiFire.PPM > 100) {
        arrayError.antiFire = true;
        const object = {
          title: "Cảnh Báo AntiFire",
          body: "Waring AntiFire !!!",
          status: "2",
        };
        notifyService.createNotify(object);
      }
      // check device warning send FCM
      if (AntiTheft.Status != "no") {
        arrayError.antiTheft = true;
        const object = {
          title: "Cảnh Báo AntiTheft",
          body: "Waring AntiTheft !!!",
          status: "1",
        };
        notifyService.createNotify(object);
      }

      //check device rain warning send FCM
      if (RainAlarm.Status != "no") {
        arrayError.rainAlarm = true;
        const object = {
          title: "Cảnh Báo RainAlarm",
          body: "Waring RainAlarm !!!",
          status: "3",
        };
        notifyService.createNotify(object);
      }

      //send message
      tokens.forEach((element) => {
        
        if (arrayError.temp) {
          if (element.isNotifyWarningTemp) {
            sendMessageWarningTemp(element.token);
          }
        }
        if (arrayError.antiFire) {
          if (element.isNotifyAntiFire) {
            sendMessageWarningAntiFire(element.token);
          }
        }
        if (arrayError.antiTheft) {
          if (element.isNotifyAntiTheft) {
            sendMessageWarningAntiTheft(element.token);
          }
        }
        if (arrayError.rainAlarm) {
          if (element.isNotifyRainAlarm) {
            sendMessageWarningRainAlarm(element.token);
          }
        }
      });

      // ws temp and humi
      const data = { temp: Temperature.Data, humi: Humidity.Data };
      wsDataHumiTemp(data);

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
      wsDataHumiTemp(data);
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
function wsDataHumiTemp(data) {
  io.emit("testTemHumi", data);
}

// send FCM

function sendMessageWarningAntiTheft(token) {
  sendMessage(token, "Cảnh Báo AntiTheft", "Waring AntiTheft !!!");
  io.emit("antiTheft", "AntiTheft");
}

function sendMessageWarningAntiFire(token) {
  sendMessage(token, "Cảnh Báo AntiFire", "Waring AntiFire !!!");
}

function sendMessageWarningRainAlarm(token) {
  sendMessage(token, "Cảnh Báo RainAlarm", "Waring RainAlarm !!!");
}

function sendMessageWarningTemp(token) {
  sendMessage(token, "Cảnh Báo Nhiệt độ", "Nhiệt Độ quá cao!");
}

function sendMessage(token, message, body) {
  serviceFCM.sendMessage(token, message, body);
  io.emit("serviceFCM", "serviceFCM");
}

module.exports = driveCtrl;
