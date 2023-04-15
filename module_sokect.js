const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const chatbotService = require("./services/chatbot.service");
const msgErrorNotFound = [
  "Xin lỗi, tôi không hiểu bạn nói gì!",
  "Bạn có thể nhắc lại điều đó cho tôi được không!",
  "Bạn có thể nói chi tiết cho tôi được không ạ!",
  "",
];

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

  socket.on("focus", (data) => {
    console.log("focus");
    io.emit("focus", data);
  });

  socket.on("sendChat", (data) => {
    const message = JSON.parse(data);
    var msgAnswer = chatbotService.getAnswer(message.message);
    console.log("sendChat", data);
    console.log("msg", msgAnswer);

    const jsonObject = {
      user: message.user ?? "",
      message: message.message,
    };

    io.emit("sendChat", jsonObject);
  });
});

module.exports = io;
