const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");
const auth = require("../middleware/auth.js");

router.get("/getUsers", authCtrl.getUsers);

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/refresh_token", authCtrl.generateAccessToken);

router.post("/forgot-password", authCtrl.forgotPassword);

router.post("/reset-password", auth, authCtrl.resetPassword);

module.exports = router;
