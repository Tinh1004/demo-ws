const router = require("express").Router();
const feedbackCtrl = require("../controllers/feedbackCtrl");

router.get("/getFeedbacks", feedbackCtrl.getFeedbacks);

router.get("/getFeedback/:id", feedbackCtrl.getFeedbackById);

router.post("/create", feedbackCtrl.createFeedback);

router.delete("/delete/:id", feedbackCtrl.deleteFeedbackById);

router.delete("/deletes", feedbackCtrl.deleteFeedbacks);

module.exports = router;
