const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const processInput = require("./lib/chatbox");
const driveService = require("./services/drive.service");
const notifyService = require("./services/notify.servive");

var users = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("joinUser", (user) => {
    console.log("user", user._id);
    let socketIdLogin = '';
    const newUser = users.filter((e, i) => {
      if(e.id != user._id){
        socketIdLogin = e.socketId;
      }
      return e.id != user._id;
    });
    newUser.push({
      id: user._id,
      socketId: socket.id,
    });
    users = newUser;
    if(user.mobile){
      console.log('is mobile');
      if(socketIdLogin){
        socket.to(`${socketIdLogin}`).emit("ws-login", "another login");
      }
    }else{
      console.log('is not mobile');
    }
  });

  socket.on("testTemHumi", (data) => {
    const d = { temp: 50, humi: 89.1 };
    socket.emit("testTemHumi", d);
  });

  // Notification
  socket.on("createNotify", async (data) => {
    const client = users.find((user) => data.userId === user.id);
    const notify = await notifyService.createNotify(data);
    client && socket.to(`${client.socketId}`).emit("createNotifyToClient", data);
  });

  socket.on("testLight", async (data) => {
    await driveService.updateStatusLight(data);
    socket.emit("testLight", data);
  });

  socket.on("sendChat", async (data) => {
    try {
      const message = data;
      const findUser = users.find((e, i) => (e.id = data.userId));
      var msgAnswer = await processInput(message.message, { client: findUser, socket });

      const jsonObject = {
        user: "Bot",
        userId: "1",
        message: msgAnswer,
        bot: true,
        createdAt: new Date()
      };
      io.to(`${findUser.socketId}`).emit("sendChat", jsonObject);
    } catch (error) {
      console.log("error", error);
      const jsonObject = {
        user: "Bot",
        userId: data.userId,
        message: errorMsg,
      };
      io.to(`${findUser.socketId}`).emit("sendChat", jsonObject);
    }
  });

  socket.on("removeNotify", (msg) => {
    const client = users.find((user) => msg.userId === user.id);
    client && socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
  });

  socket.on("disconnect", () => {
    console.log("Khách hàng đã ngắt kết nối:", socket.id);
    for (var i = 0; i < users.length; i++) {
      if (users[i].socketId == socket.id) {
        users.splice(i, 1);
      }
    }
    console.log(users);
  });
});

module.exports = io;
