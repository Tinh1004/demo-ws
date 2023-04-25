const Notify = require("../models/notifyModel");

const driveService = {
  createNotify: async (data) => {
    try {
      const newNotify = new Notify(data);
      const notify = await newNotify.save();
      return notify;
    } catch (err) {
      return null;
    }
  },
};

module.exports = driveService;
