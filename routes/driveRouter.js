const router = require("express").Router();
const driveCtrl = require("../controllers/driveCtrl");

router.get("/drive", driveCtrl.getDrive);

router.post("/drive", driveCtrl.updateDrive);

router.post("/drive/updateLightStatus", driveCtrl.updateLightStatus);

router.post("/drive/updateDataTempHumi", driveCtrl.updateDataTempHumi);

module.exports = router;