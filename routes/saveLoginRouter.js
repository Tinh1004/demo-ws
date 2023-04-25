const router = require("express").Router();
const saveLoginCtrl = require("../controllers/saveLoginCtrl");

router.get("/get-login-all", saveLoginCtrl.getAll);

router.get("/get-login/:id", saveLoginCtrl.getById);

router.post("/create", saveLoginCtrl.create);

router.delete("/delete/:id", saveLoginCtrl.deleteById);

router.delete("/deletes", saveLoginCtrl.deleteAll);

module.exports = router;
