const Notifies = require("../models/notifyModel");

const notifyCtrl = {
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find().sort({ "createdAt": -1 });
      return res.status(200).json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.remove();
      return res.status(200).json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notifyCtrl;
