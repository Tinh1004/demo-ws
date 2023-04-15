const Question = require("../models/Question.model");

const chatbotService = {
  getAnswer: async (question) => {
    await Question.find({
      question: { $regex: question, $options: "i" },
    })
      .then((value) => {
        console.log("value", value);
        if (value.length > 0) {
          return value[0].question;
        } else {
          return "";
        }
      })
      .catch((e) => {
        return "";
      });
  },
};

module.exports = chatbotService;
