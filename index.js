const express = require("express");
const { Server } = require("ws");

const PORT = process.env.PORT || 3000; //port for https

const server = express()
  .use((req, res) => res.send("Hi there"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

var webSockets = {};

wss.on("connection", function (ws, req) {
  var userID = req.url.substr(1); //get userid from URL/userid
  console.log("User connected:", userID);
  ws.on("message", (message) => {
    // If there is any message
    var datastring = message.toString();
    console.log("Print:", datastring);
    if (datastring.charAt(0) == "{") {
      datastring = datastring.replace(/\'/g, '"');
      var data = JSON.parse(datastring);
      console.log("data:", data);
      ws.send("Send");
    }
  });
});
