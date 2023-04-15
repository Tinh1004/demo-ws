const io = require("../module_sokect.js");
const router = require("express").Router();

router.get("/", (req, res) => {
  const jsonObject = {
    user: "My Friend",
    message: "Long occho",
  };
  io.emit("sendChat", jsonObject);
  return res.send("hello world 1");
});

module.exports = router;
