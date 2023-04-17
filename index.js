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
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const io = require("./module_sokect.js");
const bodyParser = require("body-parser");
MONGODB_URL =
  "mongodb+srv://tinh46647:tinh46647tinh46647tinh46647@cluster0.zaonkol.mongodb.net/database_chatbot?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected!"))
  .catch((e) => {
    console.log("Connect failed!!");
  });

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const server = http.createServer(app);

io.attach(server);

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("Hello World!");
// });

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/api", require("./routes/userRouter.js"));
app.use("/api/chatbot", require("./routes/chatbotRoute.js"));

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
