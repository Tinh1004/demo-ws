const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const chatbotService = require("./services/chatbot.service");
const msgErrorNotFound = [
  "Xin lỗi, tôi không hiểu bạn nói gì!",
  "Bạn có thể nhắc lại điều đó cho tôi được không!",
  "Bạn có thể nói chi tiết cho tôi được không ạ!",
  "Xin lỗi tôi là 1 con bot chưa có hoàn thiện nên không thể hiểu hết những câu hỏi của bạn.",
];
const errorMsg = "Xảy ra lỗi trong server!";
var errorNotFoundMessage =
  "Tôi không hiểu bạn nói gì.\ntôi có 1 vài ý kiến:\n1. Menu\n2. chức năng khác...";

var users = [];

io.on("connection", (socket) => {
  var errorNotFoundCount = 0;

  console.log(`User Connected: ${socket.id}`);

  socket.on("joinUser", (user) => {
    console.log("user", user);
    users.push({
      id: user._id,
      socketId: socket.id,
    });
  });

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

  socket.on("sendChat", async (data) => {
    console.log("data", data);
    try {
      const message = data;
      var msgAnswer = await chatbotService.getAnswer(message.message);
      console.log("sendChat", data);
      console.log("msg", msgAnswer);
      const findUser = users.find((e, i) => (e.id = data.userId));
      console.log("findUser", findUser);

      if (!msgAnswer) {
        errorNotFoundCount++;

        if (errorNotFoundCount == 3) {
          msgAnswer = errorNotFoundMessage;
          errorNotFoundCount = 0;
        } else {
          const random = Math.floor(Math.random() * msgErrorNotFound.length);
          console.log(
            "random",
            random,
            msgErrorNotFound.length,
            msgErrorNotFound.length == random
          );

          msgAnswer = msgErrorNotFound[random];
        }
      } else {
        errorNotFoundCount = 0;
      }
      const jsonObject = {
        user: "Bot",
        userId: "1",
        message: msgAnswer,
      };

      io.to(`${findUser.socketId}`).emit("sendChat", jsonObject);
    } catch (error) {
      console.log("error");
      const jsonObject = {
        user: "Bot",
        userId: "1",
        message: "Có một số lỗi đã xảy ra.",
      };
      io.to(`${findUser.socketId}`).emit("sendChat", jsonObject);
    }
  });
  socket.on("disconnect", () => {
    console.log("Khách hàng đã ngắt kết nối:", socket.id);
    for (var i = 0; i < users.length; i++) {
      if (users[i].socketId == socket.id) {
        users.splice(i, 1);
        break;
      }
    }
    console.log(users);
  });
});

module.exports = io;
