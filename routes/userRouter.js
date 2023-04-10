const io = require("../module_sokect.js");
const router = require("express").Router();

router.get("/", (req, res) => {
  io.emit("sendChat", "Long occho");
  return res.send("hello world 1");
});

module.exports = router;
