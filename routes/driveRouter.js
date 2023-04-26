const router = require("express").Router();
const driveCtrl = require("../controllers/driveCtrl");

router.get("/drive", driveCtrl.getDrive);
router.get("/drives", driveCtrl.getDrives);
router.post("/drive", driveCtrl.updateDrive);
// router.post("/create-drive", driveCtrl.createDrive);
// router.post("/drive/updateLightStatus", driveCtrl.updateLightStatus);
// router.post("/drive/updateDataTempHumi", driveCtrl.updateDataTempHumi);

module.exports = router;
