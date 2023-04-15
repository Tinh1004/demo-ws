const io = require("../module_sokect.js");
const router = require("express").Router();
const chatbotController = require("../controllers/chatbot.controller.js");

router.get("/questions", chatbotController.getQuestions);
router.post("/addQuestion", chatbotController.addQuestion);
router.put("/updateAnswer/:id", chatbotController.updateQuestion);
router.delete("/deleteQuestion/:id", chatbotController.deteleQuestionById);
router.delete("/deleteAll", chatbotController.deteleAllQuestion);

module.exports = router;
