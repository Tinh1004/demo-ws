const Feedback = require("../models/feedbackModel");

const feedbackCtrl = {
  createFeedback: async (req, res) => {
    try {
      const { userId, description } = req.body;
      const newFeedback = new Feedback({
        userId,
        description,
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
  getFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (e) {
      res.status(500).json({ msg: "Đã có lỗi xảy ra." });
    }
  },
  getFeedbackById: async (req, res) => {
    try {
      const {id} = req.params;
      console.log(id);
      const feedback = await Feedback.findById(id);
      return res.status(200).json(feedback);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteFeedbackById: async (req, res) => {
    try {
      const { id } = req.params;
      const feedback = await Feedback.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ feedback, messenger: "Remove Feedback successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteFeedbacks: async (req, res) => {
    try {
      const feedbackRemove = await Feedback.remove();
      return res
        .status(200)
        .json({ feedbackRemove, messenger: "Remove Feedback successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = feedbackCtrl;
