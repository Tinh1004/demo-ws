const _id = "644401c5e40e6c272070c6bf";
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
