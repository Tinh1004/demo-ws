const router = require("express").Router();
const auth = require("../middleware/auth");
const notifyCtrl = require("../controllers/notifyCtrl");

router.get("/notify", notifyCtrl.getNotifies);

router.get("/notify-today", notifyCtrl.getNotifiesToday);
router.get("/count-notify-theft", notifyCtrl.countNotifiesAllAntiTheft);
router.get("/count-notify-theft-today", notifyCtrl.countNotifiesAntiTheftToday);
router.get("/count-notify-theft-forDay/:date", notifyCtrl.countNotifiesAntiTheftForDate);
router.get("/count-notify-theft-month", notifyCtrl.countNotifiesAntiTheftMonth);
router.get("/count-notify-theft-forMonth/:year/:month", notifyCtrl.countNotifiesAntiTheftForMonth);

router.get("/notify-forDay/:date", notifyCtrl.getNotifiesForDate);
router.get("/notify-forMonth/:year/:month", notifyCtrl.getNotifiesForMonth);

router.delete("/delete-notify", notifyCtrl.deleteNotifies);

module.exports = router;
