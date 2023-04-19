const router = require("express").Router();
const auth = require("../middleware/auth");
const notifyCtrl = require("../controllers/notifyCtrl");

router.get("/notify", notifyCtrl.getNotifies);

router.get("/notify/:userId", notifyCtrl.getNotifies);

router.delete("/delete-notify", notifyCtrl.deleteNotifies);

module.exports = router;
