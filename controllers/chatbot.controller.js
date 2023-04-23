const Question = require("../models/Question.model");

const chatbotController = {
  getQuestions: async (req, res) => {
    const questions = await Question.find();
    res.status(200).json(questions);
  },
  addQuestion: async (req, res) => {
    const { question, answer } = req.body;
    console.log(question, " - ", answer);
    if (!question || !answer) {
      console.log("Không được để trống");
      return res
        .status(400)
        .json({ mes: "Create failed", status: false, data: {} });
    }
    await Question.find({
      question: { $regex: question, $options: "i" },
    }).then((value) => {
      console.log("value", value);
      if (value.length > 0) {
        res.status(400).json({ mes: "Create failed", status: false, data: {} });
      } else {
        const newQuestion = new Question({
          question,
          answer,
        });
        console.log("new question:", newQuestion);
        newQuestion.save();
        res.status(200).json({
          mes: "Create successfully",
          status: true,
          data: newQuestion,
        });
      }
    });
  },
  updateQuestion: async (req, res) => {
    const notify = await Question.findByIdAndUpdate(req.params.id, { $set: objectLightLed });
    return res
      .status(200)
      .json({ notify, messenger: "Remove Question successed" });
  },
  deteleAllQuestion: async (req, res) => {
    try {
      const notify = await Question.remove();
      return res
        .status(200)
        .json({ notify, messenger: "Remove Question successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deteleQuestionById: async (req, res) => {

    try {
      const { id } = req.params;
      const notify = await Question.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ notify, messenger: "Remove Question successed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = chatbotController;
