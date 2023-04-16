const Question = require("../models/Question.model");

const chatbotService = {
  getAnswer: async (question) => {
    try {
      const questions = await Question.find({
        question: { $regex: question, $options: "i" },
      });
      console.log("value", questions);
      if (questions.length > 0) {
        return questions[0].answer;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
};

module.exports = chatbotService;
