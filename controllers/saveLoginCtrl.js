const SaveLogin = require("../models/saveLoginModel");

const saveLoginCtrl = {
  create: async (req, res) => {
    try {
      const { userId, token } = req.body;
      const newFeedback = new SaveLogin({
        userId,
        token,
      });
      console.log("new Feedback:", newFeedback);
      await newFeedback.save();
      res.status(200).json({
        mes: "Create successfully",
        status: true,
        data: newFeedback,
      });
    } catch (e) {
      res.status(500).json({ msg: "Đã có lỗi xảy ra." });
    }
  },
  getAll: async (req, res) => {
    try {
      const feedbacks = await SaveLogin.find();
      res.status(200).json(feedbacks);
    } catch (e) {
      res.status(500).json({ msg: "Đã có lỗi xảy ra." });
    }
  },
  getById: async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id);
      const feedback = await SaveLogin.findById(id);
      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const feedback = await SaveLogin.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ feedback, messenger: "Remove Feedback successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAll: async (req, res) => {
    try {
      const feedbackRemove = await SaveLogin.remove();
      return res
        .status(200)
        .json({ feedbackRemove, messenger: "Remove Feedback successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = saveLoginCtrl;
