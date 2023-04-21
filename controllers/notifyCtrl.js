const Notifies = require("../models/notifyModel");

const notifyCtrl = {
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find().sort({ createdAt: -1 });
      return res.status(200).json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getNotifiesNowDay: async (req, res) => {
    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        7,
        0,
        0
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        7,
        0,
        0
      );
      console.log("startOfDay: ", startOfDay);
      console.log("endOfDay: ", endOfDay);
      const notifies = await Notifies.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      }).sort({ createdAt: -1 });
      return res.status(200).json(notifies);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  countNotifiesAntiTheftToday: async (req, res) => {
    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        7,
        0,
        0
      );
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        7,
        0,
        0
      );
      console.log("startOfDay: ", startOfDay);
      console.log("endOfDay: ", endOfDay);
      const notifies = await Notifies.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
        status: "1",
      }).count();

      return res.status(200).json({ count: notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  countNotifiesAntiTheftMonth: async (req, res) => {
    try {
      const now = new Date();
      const notifies = await Notifies.find({
        $expr: { $eq: [{ $month: "$createdAt" }, now.getMonth() + 1] },
      }).count();
      return res.status(200).json({ count: notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getNotifiesForDate: async (req, res) => {
    try {
      console.log("date: ", req.params);
      const { date } = req.params; //{ date: '21-04-2023' }
      const arrayDate = date.split("-");
      console.log("arrayDate: ", arrayDate);

      const day = parseInt(arrayDate[0]);
      const month = parseInt(arrayDate[1]);
      const year = parseInt(arrayDate[2]);
      const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: true,
      };
      const startOfDay = new Date(year, month - 1, day, 7, 0, 0);
      const endOfDay = new Date(year, month - 1, day + 1, 7, 0, 0);

      console.log(
        "startOfDay: ",
        startOfDay.toLocaleString("en-US", options),
        "- ",
        startOfDay
      );
      console.log(
        "endOfDay: ",
        endOfDay.toLocaleString("en-US", options),
        "-",
        endOfDay
      );
      const notifies = await Notifies.find({
        createdAt: {
          $gte: startOfDay.toLocaleString("en-US", options),
          $lt: endOfDay.toLocaleString("en-US", options),
        },
      }).sort({ createdAt: -1 });

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
