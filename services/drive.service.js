const _id = "643051e1e4e0a63785a4f537";
const Drives = require("../models/driveModel");

const driveService = {
  getStatusLight: async () => {
    try {
      const drive = await Drives.findOne({ _id });
      return drive.Led.Status;
    } catch (err) {
      return null;
    }
  },
  updateStatusLight: async (status) => {
    try {
      const objectLightLed = {
        Led: {
          Status: status,
        },
      };
      const drive = await Drives.updateOne({ _id }, { $set: objectLightLed });
      return status;
    } catch (err) {
      return null;
    }
  },
};

module.exports = driveService;
