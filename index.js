// const express = require("express");
// const { Server } = require("ws");

// const PORT = process.env.PORT || 3000; //port for https

// const server = express()
//   .use("/", (req, res) => {
//     return res.send("Hello World!!!");
//   })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on("connection", function (ws, req) {
//   var userID = req.url.substr(1); //get userid from URL/userid
//   console.log("User connected:", userID);
//   ws.on("message", (message) => {
//     // If there is any message
//     var datastring = message.toString();
//     console.log("Print:", datastring);
//     if (datastring.charAt(0) == "{") {
//       datastring = datastring.replace(/\'/g, '"');
//       var data = JSON.parse(datastring);
//       console.log("data:", data);
//       console.log("data.cmd:", data.cmd);
//       ws.send(data.cmd);
//     }
//   });
// });

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket}`);

  socket.on("event", (data) => {
    console.log("event", data);
    // socket.join(data);
  });

  socket.on("fromServer", (data) => {
    console.log("fromServer");
    // socket.to(data.room).emit("receive_message", data);
  });

  socket.on("sendChat", (data) => {
    console.log("sendChat", data);
    io.emit("sendChat", data);
  });
});

app.get("/", (req, res) => {
  io.emit("sendChat", "Long occho");
  return res.send("Hello World!");
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
