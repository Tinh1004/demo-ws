require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");
const io = require("./module_sokect.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket
const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// io.on("connection", (socket) => {
//   SocketServer(socket);
// });

const serviceFCM = require("./serviceFCM");

// Create peer server
ExpressPeerServer(http, { path: "/" });

// Routes
app.use("/api", require("./routes/tokenNotifyRouter"));
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/notifyRouter"));
app.use("/api", require("./routes/driveRouter"));
app.use("/api/chatbot", require("./routes/chatbotRoute.js"));

app.use("/apiNPM", (req, res) => {
  const token =
    "dUnTEoBPReyQgX_D4R7PLp:APA91bF19Pa7P6Daj2jrahaCEzpWGKu-aPWgLZmAvZFcEgqPWiQIHunE_MYUx2pzU7-o0hqRZ1W0zeK76JJJMM-83mneWy6mgn8wgEP4_XP5gRBKYnxiHIHB3qK-0G9OxDFBqzc-wMzW";
  console.log(token);
  serviceFCM.sendMessage(
    token,
    "Cảnh Báo",
    "Phát hiện xâm nhập lạ vào nhà bạn"
  );
  res.send("Hello World!!");
});

app.use("/api/testIoLightOn", (req, res) => {
  io.emit("testLight", 1);
  io.emit("sendChat", jsonObject);
});

app.use("/api/testIoLightOn", (req, res) => {
  io.emit("testLight", 0);
});

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

io.attach(http);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Server is running on port", port);
});
